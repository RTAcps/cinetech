import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../core/component/header/header.component';
import { FilmeService } from '../../core/service/filme.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  providers: [FilmeService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private filmeService: FilmeService) {}

  ngOnInit(): void {
    this.buscarFilme();
  }

  public buscarFilme() {
    this.filmeService.getFilme().subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
    });
  }
}
