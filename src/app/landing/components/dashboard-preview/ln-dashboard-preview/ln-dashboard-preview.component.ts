import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ln-dashboard-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ln-dashboard-preview.component.html',
    styles: [`
    .dot-grid {
      background-image: radial-gradient(circle, #6366f1 1px, transparent 1px);
      background-size: 24px 24px;
    }
  `]
})
export class LnDashboardPreviewComponent implements AfterViewInit {
  @ViewChild('chartCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
 
  sidebarItems = [
    { label: 'Dashboard',   active: true },
    { label: 'Links',       active: false },
    { label: 'Conversions', active: false },
  ];
 
  mockStats = [
    { value: '48,291',  label: 'Total Clicks',     icon: '🎯', bg: 'bg-blue-50',    change: '+12%',  positive: true },
    { value: '$12,840', label: 'Revenue',           icon: '💰', bg: 'bg-emerald-50', change: '+18%',  positive: true },
    { value: '4.7%',    label: 'Conv. Rate',        icon: '📈', bg: 'bg-indigo-50',  change: '-2.1%', positive: false },
    { value: '5',       label: 'Campaigns',         icon: '⚡', bg: 'bg-amber-50',   change: '+2',    positive: true },
  ];
 
  tableRows = [
    { name: 'Summer Reel Series',  url: 'crip.io/s1a', clicks: '18.4k', revenue: '$5,240', status: 'Active' },
    { name: 'Fitness Journey Ep3', url: 'crip.io/fj3', clicks: '12.1k', revenue: '$3,190', status: 'Active' },
    { name: 'Morning Routine Kit', url: 'crip.io/mr1', clicks: '9.8k',  revenue: '$2,890', status: 'Active' },
    { name: 'Reel3 – No Revenue',  url: 'crip.io/r3z', clicks: '2.9k',  revenue: '—',      status: 'No rev.' },
  ];
 
  ngAfterViewInit(): void {
    requestAnimationFrame(() => this.renderChart());
  }
 
  private renderChart(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = canvas.offsetWidth  * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);
 
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    const pad = { top: 8, right: 12, bottom: 20, left: 36 };
    const cW = W - pad.left - pad.right;
    const cH = H - pad.top - pad.bottom;
 
    const data = [320,480,390,620,880,1040,920,1180,1340];
    const clicks = [1200,1850,1640,2100,2800,3100,2750,3400,3900];
    const labels = ['Apr 1','Apr 5','Apr 9','Apr 13','Apr 17','Apr 21','Apr 25','Apr 29','May 1'];
    const maxR = 1400, maxC = 4000;
    const xStep = cW / (data.length - 1);
 
    // Grid lines
    ctx.strokeStyle = '#f3f4f6'; ctx.lineWidth = 0.5;
    for (let i = 0; i <= 3; i++) {
      const y = pad.top + (cH / 3) * i;
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
    }
 
    // Revenue area fill
    ctx.beginPath();
    data.forEach((d, i) => {
      const x = pad.left + i * xStep;
      const y = pad.top + cH - (d / maxR) * cH;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    const lastX = pad.left + (data.length - 1) * xStep;
    ctx.lineTo(lastX, pad.top + cH); ctx.lineTo(pad.left, pad.top + cH); ctx.closePath();
    const g = ctx.createLinearGradient(0, pad.top, 0, pad.top + cH);
    g.addColorStop(0, 'rgba(99,102,241,0.18)'); g.addColorStop(1, 'rgba(99,102,241,0)');
    ctx.fillStyle = g; ctx.fill();
 
    // Revenue line
    ctx.beginPath();
    data.forEach((d, i) => {
      const x = pad.left + i * xStep;
      const y = pad.top + cH - (d / maxR) * cH;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 1.75; ctx.lineJoin = 'round'; ctx.stroke();
 
    // Clicks dashed line
    ctx.beginPath();
    clicks.forEach((d, i) => {
      const x = pad.left + i * xStep;
      const y = pad.top + cH - (d / maxC) * cH;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#bfdbfe'; ctx.lineWidth = 1.25; ctx.setLineDash([3,2]); ctx.stroke(); ctx.setLineDash([]);
 
    // X-axis labels
    ctx.fillStyle = '#9ca3af'; ctx.font = '8px DM Sans,system-ui'; ctx.textAlign = 'center';
    labels.forEach((l, i) => {
      if (i % 2 === 0) ctx.fillText(l, pad.left + i * xStep, H - 3);
    });
 
    // Dots
    data.forEach((d, i) => {
      const x = pad.left + i * xStep;
      const y = pad.top + cH - (d / maxR) * cH;
      ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#6366f1'; ctx.fill();
      ctx.strokeStyle = 'white'; ctx.lineWidth = 1; ctx.stroke();
    });
  }
}
