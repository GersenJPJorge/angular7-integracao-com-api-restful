import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material'; // para mensagens de erros
import { Router } from '@angular/router';        // para totemento
import { CadastroPj } from '../../models';

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
    private router: Router) { }

  ngOnInit() {
  	this.gerarForm();
  }

  gerarForm() {
  	this.form = this.fb.group({    // passando um objeto mapeando todos os campos do formulario
  		nome: ['', [Validators.required, Validators.minLength(3)]],
  		email: ['', [Validators.required, Validators.email]],
  		senha: ['', [Validators.required, Validators.minLength(6)]],
  		cpf: ['', [Validators.required]],
  		razaoSocial: ['', [Validators.required, Validators.minLength(5)]],
  		cnpj: ['', [Validators.required]]
  	});
  }

  cadastrarPj() {
  	if (this.form.invalid) {
  		return;
    }
    const cadastroPj: CadastroPj = this.form.value;
//  	alert(JSON.stringify(this.form.value));               // convert objeto json em string
  	alert(JSON.stringify(cadastroPj));               // convert objeto json em string
  }

}








