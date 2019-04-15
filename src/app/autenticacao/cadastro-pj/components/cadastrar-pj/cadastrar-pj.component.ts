import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material'; // para mensagens de erros
import { Router } from '@angular/router';        // para totemento
import { CadastroPj } from '../../models';
import { CpfValidator, CnpjValidator } from '../../../../shared/validators';
import { CadastrarPjService } from '../../services';

@Component({
  selector: 'app-cadastrar-pj',
  templateUrl: './cadastrar-pj.component.html',
  styleUrls: ['./cadastrar-pj.component.css']
})
export class CadastrarPjComponent implements OnInit {

  form: FormGroup;                                        // nosso referencia html x componente

  constructor(                                            // recursos que precisam ser injetados
  	private fb: FormBuilder, 
  	private snackBar: MatSnackBar,
    private router: Router,
    private cadastrarPjService: CadastrarPjService) { }

  ngOnInit() {
  	this.gerarForm();
  }

  gerarForm() {
  	this.form = this.fb.group({    // passando um objeto mapeando todos os campos do formulario
  		nome: ['', [Validators.required, Validators.minLength(3)]],
  		email: ['', [Validators.required, Validators.email]],
  		senha: ['', [Validators.required, Validators.minLength(6)]],
  		cpf: ['', [Validators.required, CpfValidator]],
  		razaoSocial: ['', [Validators.required, Validators.minLength(5)]],
  		cnpj: ['', [Validators.required, CnpjValidator]],
  	});
  }

//  cadastrarPj() {
//  	if (this.form.invalid) {
//  		return;
//    }
//    const cadastroPj: CadastroPj = this.form.value;
//  	alert(JSON.stringify(this.form.value));               // convert objeto json em string
//  	alert(JSON.stringify(cadastroPj));               // convert objeto json em string
//  }
//
//}

cadastrarPj() {
  if (this.form.invalid) {
    return;
  }
  const cadastroPj: CadastroPj = this.form.value;     // pegamos os valores do formulario e jogamos em cadastroPj
  this.cadastrarPjService.cadastrar(cadastroPj)       // chamando o service passando o objeto
    .subscribe(                                       // como retorna um observable precisamos do subscribe para ficar na escuta
      data => {
        console.log(JSON.stringify(data));
        const msg: string = "Realize o login para acessar o sistema.";
        this.snackBar.open(msg, "Sucesso", { duration: 5000 });
        this.router.navigate(['/login']);
      },
      err => {
        console.log(JSON.stringify(err));
        let msg: string = "Tente novamente em instantes.";             // erro genérico
        if (err.status == 400) {
          msg = err.error.errors.join(' ');                            // erro dinâmico, direto do servidor
        }
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    );
  return false;
}

}







