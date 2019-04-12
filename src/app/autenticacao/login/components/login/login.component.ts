import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
// import { LogarComponent } from '../logar.component';
import { Login } from '../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    form: FormGroup                                              // FormGroup - agrupamento dos campos

  constructor( private fb: FormBuilder,                          // FormBuilder - mapeamento do formulario
               private snackbar: MatSnackBar,                    // MatSnackBar - Exibir mensagens na tela    
               private router: Router ) { }                      // Router - direcionamento de telas

  ngOnInit() {
    this.gerarForm();
  }

gerarForm(){
  this.form = this.fb.group({                                  // this.fb.group - utilitário do formgroup
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });
}

logar(){
  if (this.form.invalid){
      this.snackbar.open(
          "Dados invalidos", "Erro", { duration: 5000 });
      return;  
  }
    const login: Login = this.form.value;
     alert('Email: ' + login.email + ', senha: ' + login.senha);
}  
}
