import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource, MatSnackBar, PageEvent, MatPaginator, Sort, MatSort} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { LancamentoService, Lancamento } from '../../../shared';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  dataSource: MatTableDataSource<Lancamento>; // MatTableDataSource do tipo lancamento
  colunas: string[] = ['data', 'tipo', 'localizacao']; // é um array de strings

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
  	private lancamentoService: LancamentoService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.lancamentoService.listarTodosLancamentos()
      .subscribe(
        data => {
          const lancamentos = data['data'] as Lancamento[];
          // dentro do objeto data['data'] temos a lista de lançamentos 
          // as Lancamento[] é um operador do typescript que faz casting do formato json para uma lista 
          this.dataSource = new MatTableDataSource<Lancamento>(lancamentos);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        err => {
          const msg: string = "Erro obtendo lançamentos.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

}





