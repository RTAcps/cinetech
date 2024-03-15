import { NgOptimizedImage } from '@angular/common';
import { Component, HostListener, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
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
