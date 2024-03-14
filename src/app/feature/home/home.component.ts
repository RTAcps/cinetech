import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FooterComponent } from '../../core/component/footer/footer.component';
import { HeaderComponent } from '../../core/component/header/header.component';
import { FilmeService } from '../../core/service/filme.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
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
      error: (e) => {
        if (e.status === 400) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: 'error',
            title: 'Houve um erro inesperado!',
          });
        } else if (e.status === 401) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: 'error',
            title: 'Você não tem autorização para acessar!',
          });
        } else if (e.status === 404) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: 'error',
            title: 'Não foi possível encontrar o filme!',
          });
        } else if (e.status === 500) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: 'error',
            title: 'O servidor apresentou um problema!',
          });
        }
      },
    });
  }
}
