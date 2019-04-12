import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { LogarComponent } from '../logar.component';
import { Login } from '../../models';
import { LoginService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    form: FormGroup                                              // FormGroup - agrupamento dos campos

  constructor( private fb: FormBuilder,                          // FormBuilder - mapeamento do formulario
               private snackbar: MatSnackBar,                    // MatSnackBar - Exibir mensagens na tela    
               private router: Router,                       // Router - direcionamento de telas
               private loginService: LoginService,
               ) { }

  ngOnInit() {
    this.gerarForm();
  }

gerarForm(){
  this.form = this.fb.group({                                  // this.fb.group - utilitário do formgroup
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });
}

logar() {
  if (this.form.invalid) {
    return;
  }

  const login: Login = this.form.value;
  this.loginService.logar(login)
    .subscribe(                                                     // aguardando a requisição do servidor
      data => {                                                     // data - o bloco data é em caso de sucesso
        console.log(JSON.stringify(data));
        localStorage['token'] = data['data']['token'];              // localStorage - autenticar uma vez e guardar esse token para o que precisar
        const usuarioData = JSON.parse(
          atob(data['data']['token'].split('.')[1]));               // atob -  é um decoder base 64
        console.log(JSON.stringify(usuarioData));
        if (usuarioData['role'] == 'ROLE_ADMIN') {                  // role - o perfil do usuário
          alert('Deve redirecionar para a página de admin');
          //this.router.navigate(['/admin']);
        } else {
          alert('Deve redirecionar para a página de funcionário');
          //this.router.navigate(['/funcionario']);
        }
      },
      err => {                                                       // err - bloco de erro
        console.log(JSON.stringify(err));
        let msg: string = "Tente novamente em instantes.";
        if (err['status'] == 401) {
          msg = "Email/senha inválido(s)."
        }
        this.snackbar.open(msg, "Erro", { duration: 5000 });
      }
    );
}
}







