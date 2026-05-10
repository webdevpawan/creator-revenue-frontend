import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ln-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ln-footer.component.html',
  styleUrls: ['./ln-footer.component.scss']
})
export class LnFooterComponent {
  year = new Date().getFullYear();
 
  socials = [
    { name: 'Twitter / X', href: '#', emoji: '✕' },
    { name: 'Instagram',   href: '#', emoji: '📸' },
    { name: 'LinkedIn',    href: '#', emoji: '💼' },
  ];
 
  footerLinks = [
    {
      heading: 'Product',
      links: [
        { label: 'Features',    href: '#features' },
        { label: 'Pricing',     href: '#pricing' },
        { label: 'Changelog',   href: '#' },
        { label: 'Roadmap',     href: '#' },
      ]
    },
    {
      heading: 'Resources',
      links: [
        { label: 'Docs',         href: '#' },
        { label: 'Blog',         href: '#' },
        { label: 'Guides',       href: '#' },
        { label: 'API Reference', href: '#' },
      ]
    },
    {
      heading: 'Company',
      links: [
        { label: 'About',    href: '#' },
        { label: 'Careers',  href: '#' },
        { label: 'Press',    href: '#' },
        { label: 'Contact',  href: '#' },
      ]
    },
  ];
}
