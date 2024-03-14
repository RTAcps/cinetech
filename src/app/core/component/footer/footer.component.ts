import { NgOptimizedImage } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  public isMobileView!: boolean;

  ngOnInit(): void {
    this.isMobileView = window.innerWidth <= 768;
  }

  @HostListener('window:resize', ['$event'])
  public onResize(_event: any) {
    this.isMobileView = window.innerWidth <= 768;
  }
}
