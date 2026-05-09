import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize, Subject, takeUntil } from 'rxjs';
import { DashboardData } from 'src/app/models';
import { MockDataService } from 'src/app/services/mock-data.service';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { MiniChartComponent } from '../mini-chart/mini-chart.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, SkeletonComponent, MiniChartComponent, EmptyStateComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private mockData = inject(MockDataService);
  private http = inject(HttpClient);

  private destroy$ = new Subject<void>();

  data: DashboardData | null = null;
  loading = true;
  barHeights = [];

  ngOnInit(): void {
    this.http.get<any>(`${environment.apiUrl}/api/dashboard`)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.data = res;
          console.log("dashboard res ===", res)
          // Dynamic chart heights
          // this.barHeights = res.chartData.map((item: any) => {
          //   return Math.max(Number(item.revenue) / 10, 20);
          // });
          const maxRevenue = Math.max(
            ...res.chartData.map(
              (item: any) => Number(item.revenue)
            )
          );

          this.barHeights = res.chartData.map(
            (item: any) => {

              const revenue =
                Number(item.revenue);

              return Math.max(
                (revenue / maxRevenue) * 160,
                20
              );

            }
          );
          console.log("barHeights  ===", this.barHeights)

        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
