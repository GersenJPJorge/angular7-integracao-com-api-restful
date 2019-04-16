import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  sair() {
  	delete localStorage['token'];
  	this.router.navigate(['/']);                     // redireciona para a barra de login - pagina inicial
  }

  autenticado(): boolean {
    return localStorage['token'];
  }

}
