import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { 
  MatSelect, 
  MatTableDataSource,
  MatSnackBar,
  MatDialog, 
  MatDialogRef, 
  MAT_DIALOG_DATA,
  PageEvent,
  Sort
} from '@angular/material';

import { 
  LancamentoService, 
  Lancamento,
  Funcionario,
  Tipo,
  HttpUtilService
} from '../../../shared';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  dataSource: MatTableDataSource<Lancamento>;
  colunas: string[] = ['data', 'tipo', 'localizacao', 'acao'];
  funcionarioId: string;
  totalLancamentos: number;

  private pagina: number;    // private - só serão visiveis e utilizados nesse componente
  private ordem: string;
  private direcao: string;

  constructor(
  	private lancamentoService: LancamentoService,
    private httpUtil: HttpUtilService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.pagina = 0;
    this.ordemPadrao(); // é um método
    this.exibirLancamentos(); // é um método
  }

  ordemPadrao() {
    this.ordem = 'data';
    this.direcao = 'DESC';
  }

  exibirLancamentos() {
    this.funcionarioId = '2'; // fixo só para teste
    
    this.lancamentoService.listarLancamentosPorFuncionario(
        this.funcionarioId, this.pagina, this.ordem, this.direcao)
     //            2      ,       0    ,  'data'   ,   'desc' 
      .subscribe(
        data => {
          this.totalLancamentos = data['data'].totalElements;
          const lancamentos = data['data'].content as Lancamento[]; // convertendo para lancamento
          this.dataSource = new MatTableDataSource<Lancamento>(lancamentos);
        },
        err => {
          const msg: string = "Erro obtendo lançamentos.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  remover(lancamentoId: string) {
    alert(lancamentoId);
  }

  paginar(pageEvent: PageEvent) {
    this.pagina = pageEvent.pageIndex;
    this.exibirLancamentos();
  }

  ordenar(sort: Sort) {
    if (sort.direction == '') {  // pode ser ''(sem ordenação), ascendente ou descendente
      this.ordemPadrao();
                /*ordemPadrao() {
                this.ordem = 'data';
                this.direcao = 'DESC';*/
    } else {
      this.ordem = sort.active;     // data ou tipo
      this.direcao = sort.direction.toUpperCase(); // precisa do upper porque a api trabalha com letras maisculas
    }
    this.exibirLancamentos();
  }

}











