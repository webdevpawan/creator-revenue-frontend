import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil, finalize } from 'rxjs';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { MockDataService } from 'src/app/services/mock-data.service';
import { ToastService } from 'src/app/services/toast.service';
import { Conversion, Link } from 'src/app/models';
import { DatatransferService } from 'src/app/services/datatransfer.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-conversions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SkeletonComponent, EmptyStateComponent],
  templateUrl: './conversions.component.html',
  styleUrls: ['./conversions.component.scss']
})
export class ConversionsComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private mockData = inject(MockDataService);
  private http = inject(HttpClient);
  private datatransfer = inject(DatatransferService);
  private toastService = inject(ToastService);
  private destroy$ = new Subject<void>();

  conversionsData: any[] = [];
  links: Link[] = [];
  loading = true;
  submitting = false;

  selectedFile!: File;
  uploadingCsv = false;

  conversionForm: FormGroup = this.fb.group({
    linkId: ['', Validators.required],
    amount: [null, [Validators.required, Validators.min(0.01)]]
  });

  get totalRevenue(): number {
    return this.conversionsData.reduce(
      (sum, c) => sum + Number(c.amount),
      0
    );
  }

  ngOnInit(): void {
    // this.mockData.getConversions().pipe(
    //   takeUntil(this.destroy$),
    //   finalize(() => this.loading = false)
    // ).subscribe(c => this.conversions = c);
    this.getConversionApiCall();

    this.getLinksApiCall()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isInvalid(field: string): boolean {
    const ctrl = this.conversionForm.get(field);
    return !!(ctrl?.invalid && ctrl.touched);
  }

  onSubmit(): void {
    if (this.conversionForm.invalid) { this.conversionForm.markAllAsTouched(); return; }
    this.submitting = true;

    const { linkId, amount } = this.conversionForm.value;
    const link = this.links.find(l => l.id == linkId);
    const newConversion = {
      linkId,
      campaignName: link?.campaignName ?? 'Unknown',
      amount: parseFloat(amount),
      createdAt: new Date().toISOString()
    };

    this.http.post(`${environment.apiUrl}/api/conversions`, newConversion)
      .subscribe({
        next: (res: any) => {
          this.getConversionApiCall();
          this.conversionForm.reset();
          this.submitting = false;
          this.toastService.show(`Logged ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)} conversion!`, 'success');
        },
        error: (err) => {
          let message = 'Something went wrong';
          this.submitting = false;
          this.toastService.show(message, 'error');
        }
      });



  }

  getLinksApiCall() {
    this.http.get(`${environment.apiUrl}/api/links`)
      .subscribe({
        next: (res: any) => {
          console.log(res, "link data")
          this.links = res
        },
        error: (err) => {
          let message = 'Something went wrong';
          this.toastService.show(message, 'error');
        }
      });
  }

  getConversionApiCall() {

    this.loading = true

    this.http.get(`${environment.apiUrl}/api/conversions`)
      .subscribe({
        next: (res: any) => {
          console.log(res, "conversions data")
          this.conversionsData = res.data
          this.loading = false
        },
        error: (err) => {
          let message = 'Something went wrong';
          this.toastService.show(message, 'error');
        }
      });
  }



  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  uploadCsv() {
    if (!this.selectedFile) return;
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.uploadingCsv = true;

    this.http.post(`${environment.apiUrl}/api/conversions/import`, formData).subscribe({

      next: (res: any) => {
        this.uploadingCsv = false;
        let message = 'CSV Imported Successfully'
        this.toastService.show(message, 'success');
        this.getConversionApiCall();
      },
      error: (err) => {
        this.uploadingCsv = false;
        console.log(err);
        this.toastService.show("Import Error", 'error');
      }
    });
  }
}
