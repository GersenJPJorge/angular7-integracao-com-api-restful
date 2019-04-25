import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // para criar formularios
import { ActivatedRoute, Router } from '@angular/router'; // roteamento de uma pagina para outra
import { MatSnackBar } from '@angular/material';   // exibir a mensagem de sucesso ou erro

import * as moment from 'moment';  // tratamento com datas

import { 
  Lancamento, 
  Tipo, 
  LancamentoService             // contem o metodo cadastrar
} from '../../../shared';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  form: FormGroup;         // nosso formulario no html
  horas: string[];           // horas, minutos e tipos são arrays por conta do dropdow
  minutos: string[];
  tipos: string[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private lancamentoService: LancamentoService) { }

  ngOnInit() {
  	this.gerarForm();   // ira mapear html  x componente
  	this.horas = this.gerarListaNumeros(0, 23);   // 0 a 23 representa as horas
  	this.minutos = this.gerarListaNumeros(0, 59); // 0  a 59 representa os minutos
  	this.tipos = [                                    // serao inicializadas aqui mesmo
  		Tipo.INICIO_TRABALHO, 
  		Tipo.INICIO_ALMOCO,
  		Tipo.TERMINO_ALMOCO,
  		Tipo.TERMINO_TRABALHO
  	];
  }

  gerarForm() {
    this.form = this.fb.group({
      data: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      horas: ['', [Validators.required]],
      minutos: ['', [Validators.required]]
    });
  }

  gerarListaNumeros(inicio: number, termino: number): string[] {
  	const numeros: string[] = Array();
  	for (let i = inicio; i <= termino; i++) {
  		let numero: string = i.toString();
  		if (i < 10) {
  			numero = "0" + numero;    // para ficar um padrão: 01, 02, 03...
  		}
  		numeros.push(numero);
  	}
  	return numeros;
  }

  cadastrar() {                               // associado ao botão de cadastro
    if (this.form.invalid) return;

    const dados = this.form.value;
    this.lancamentoService.cadastrar(this.obterLancamento(dados))
    // lancamentoService.cadastrar foi criado no cadastro de funcionarios
      .subscribe(
        data => {
          const msg: string = "Lançamento cadastrado com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/admin']);
        },
        err => {
          let msg: string = "Tente novamente em instantes.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  obterLancamento(dados: any): Lancamento {
    const data = moment(dados.data);    // vai ter dd;mm;aaaa
    data.set({ 
      hour: dados.horas, 
      minute: dados.minutos, 
      second: 0 
    });
    
    return new Lancamento(
        data.format('YYYY-MM-DD HH:mm:ss'),  // a api está esperando a data nesse formato
        dados.tipo, 
        '',               // inserção manual não tem porque registar localização
        this.funcionarioId
      );
  }

  get funcionarioId(): string {
    return sessionStorage['funcionarioId'];
  }

}







