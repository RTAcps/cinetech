import { NgOptimizedImage } from '@angular/common';
import { Component, HostListener, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public isMobileView!: boolean;

  constructor() {
    afterNextRender(() => {
      this.isMobileView = window.innerWidth <= 768;
    });
  }

  @HostListener('window:resize', ['$event'])
  public onResize(_event: any) {
    this.isMobileView = window.innerWidth <= 768;
  }
}
