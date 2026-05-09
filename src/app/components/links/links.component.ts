import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize, Subject, takeUntil } from 'rxjs';
import { CreateLinkPayload, Link } from 'src/app/models';
import { MockDataService } from 'src/app/services/mock-data.service';
import { ToastService } from 'src/app/services/toast.service';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DatatransferService } from 'src/app/services/datatransfer.service';



@Component({
  selector: 'app-links',
  standalone: true,
  imports: [CommonModule, FormsModule, SkeletonComponent, EmptyStateComponent, ReactiveFormsModule],
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
    private datatransfer = inject(DatatransferService);
  private mockData = inject(MockDataService);
  private toastService = inject(ToastService);
  private destroy$ = new Subject<void>();

  links: Link[] = [];
  loading = true;
  creating = false;
  searchQuery = '';

  createForm: FormGroup = this.fb.group({
    campaignName: ['', Validators.required],
    title: ['', Validators.required],
    productUrl: ['', [Validators.required, Validators.pattern('https?://.+')]]
  });

  get filteredLinks(): Link[] {
    if (!this.searchQuery) return this.links;
    const q = this.searchQuery.toLowerCase();
    return this.links.filter(l =>
      l.title.toLowerCase().includes(q) || l.campaignName.toLowerCase().includes(q)
    );
  }

  ngOnInit(): void {

    this.getLinksApiCall()

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isInvalid(field: string): boolean {
    const ctrl = this.createForm.get(field);
    return !!(ctrl?.invalid && ctrl.touched);
  }

  onCreateLink(): void {
    if (this.createForm.invalid) { this.createForm.markAllAsTouched(); return; }
    this.creating = true;

    const v = this.createForm.value as CreateLinkPayload;

    let payload = {
      originalUrl: v.productUrl,
      campaign: v.campaignName,
      title: v.title
    }


    this.http.post(`${environment.apiUrl}/api/links`, payload)
      .subscribe({
        next: (res: any) => {
          this.createForm.reset();
          this.creating = false;
          this.toastService.show('Link created successfully!', 'success');
          this.getLinksApiCall()
        },
        error: (err) => {
          this.creating = false;
          let message = 'Something went wrong';
          this.toastService.show(message, 'error');
        }
      });


  }

  copyToClipboard(url: string): void {
    navigator.clipboard.writeText(`${url}`).then(() => {
      this.toastService.show('Link copied to clipboard!', 'success');
    }).catch(() => {
      this.toastService.show('Failed to copy. Try manually.', 'error');
    });
  }

  getLinksApiCall() {
    this.http.get(`${environment.apiUrl}/api/links`)
      .subscribe({
        next: (res: any) => {
          this.loading = false
          this.links = res
          this.datatransfer.setLinkData(this.links)
        },
        error: (err) => {
          let message = 'Something went wrong';
          this.toastService.show(message, 'error');
        }
      });
  }
}