import { Component as Comp, Input as Inp, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChartDataPoint } from 'src/app/models';
 
@Comp({
  selector: 'app-mini-chart',
  standalone: true,
  imports: [],
  templateUrl: './mini-chart.component.html'
})
export class MiniChartComponent implements AfterViewInit {
  @Inp() data: ChartDataPoint[] = [];
  @ViewChild('chartCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
 
  ngAfterViewInit(): void {
    this.renderChart();
  }
 
  private renderChart(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx || !this.data.length) return;
 
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
 
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    const pad = { top: 12, right: 16, bottom: 36, left: 52 };
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;
 
    const maxRev = Math.max(...this.data.map(d => d.revenue));
    const maxClicks = Math.max(...this.data.map(d => d.clicks));
 
    const xStep = chartW / (this.data.length - 1);
 
    // Gridlines
    ctx.strokeStyle = '#f3f4f6';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(W - pad.right, y);
      ctx.stroke();
    }
 
    // Revenue line (filled area)
    ctx.beginPath();
    this.data.forEach((d, i) => {
      const x = pad.left + i * xStep;
      const y = pad.top + chartH - (d.revenue / maxRev) * chartH;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    // Fill
    const lastX = pad.left + (this.data.length - 1) * xStep;
    ctx.lineTo(lastX, pad.top + chartH);
    ctx.lineTo(pad.left, pad.top + chartH);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
    grad.addColorStop(0, 'rgba(99,102,241,0.15)');
    grad.addColorStop(1, 'rgba(99,102,241,0)');
    ctx.fillStyle = grad;
    ctx.fill();
 
    // Revenue line stroke
    ctx.beginPath();
    this.data.forEach((d, i) => {
      const x = pad.left + i * xStep;
      const y = pad.top + chartH - (d.revenue / maxRev) * chartH;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.stroke();
 
    // Clicks line
    ctx.beginPath();
    this.data.forEach((d, i) => {
      const x = pad.left + i * xStep;
      const y = pad.top + chartH - (d.clicks / maxClicks) * chartH;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#bfdbfe';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.stroke();
    ctx.setLineDash([]);
 
    // X-axis labels
    ctx.fillStyle = '#9ca3af';
    ctx.font = '10px DM Sans, system-ui';
    ctx.textAlign = 'center';
    this.data.forEach((d, i) => {
      if (i % 2 === 0) {
        const x = pad.left + i * xStep;
        ctx.fillText(d.date, x, H - 8);
      }
    });
 
    // Y-axis labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= 3; i++) {
      const val = (maxRev / 3) * (3 - i);
      const y = pad.top + (chartH / 3) * i + 4;
      ctx.fillText('$' + Math.round(val), pad.left - 8, y);
    }
 
    // Dots on revenue line
    this.data.forEach((d, i) => {
      const x = pad.left + i * xStep;
      const y = pad.top + chartH - (d.revenue / maxRev) * chartH;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#6366f1';
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  }
}
 
