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
  Sort,
} from '@angular/material';

import { 
  LancamentoService, 
  Lancamento,
  Funcionario,
  Tipo,
  HttpUtilService,
  FuncionarioService
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

  funcionarios: Funcionario[];
  @ViewChild(MatSelect) matSelect: MatSelect;   // associação do html com o componente
  form: FormGroup;    // form - definido no html

  private pagina: number;    // private - só serão visiveis e utilizados nesse componente
  private ordem: string;
  private direcao: string;

  constructor(
  	private lancamentoService: LancamentoService,
    private httpUtil: HttpUtilService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private dialog: MatDialog,
    ) { }

  ngOnInit() {
    this.pagina = 0;
    this.ordemPadrao(); // é um método
    this.exibirLancamentos(); // é um método
    this.gerarForm();
  }

  gerarForm() {                            // usa o formbuilder para criar um grupo
    this.form = this.fb.group({
      funcs: ['', []]                      // é o formControlName que representa o select no html
                                           // vazio e em branco porque não possui nenhuma validação
    });
  }

  ordemPadrao() {
    this.ordem = 'data';
    this.direcao = 'DESC';
  }


  get funcId(): string {  // armazeando o funcionário selecionado na sessionstorage
                          // caso eu avance e volte - para não perder o contéudo do último lido
    return sessionStorage['funcionarioId'] || false;
  }


  obterFuncionarios() {
    this.funcionarioService.listarFuncionariosPorEmpresa()
      .subscribe(
        data => {
          const usuarioId: string = this.httpUtil.obterIdUsuario();
          // this.httpUtil.obterIdUsuario() - obtem o id do funcioinário
          this.funcionarios = (data.data as Funcionario[])
          // this.funcionarios - é a lista de funcionário do MatOption
            .filter(func => func.id != usuarioId);
            // como esse point retona todos, tenho que excluir quem seja administrador 
          
          if (this.funcId) {   // se já tenho conteúdo no sessionstorage
            this.form.get('funcs').setValue(parseInt(this.funcId, 10));
            this.exibirLancamentos();
          }
        },
        err => {
          const msg: string = "Erro obtendo funcionários.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  exibirLancamentos() {
  if (this.matSelect.selected) {                             // algum valor selecionado no combo box
      this.funcionarioId = this.matSelect.selected['value'];
      } else if (this.funcId) {                              // tem valor no sessionstorage
        this.funcionarioId = this.funcId;
      } else {
        return;
      }
      sessionStorage['funcionarioId'] = this.funcionarioId; // atualiza o sessionstorage
  
    this.lancamentoService.listarLancamentosPorFuncionario(
        this.funcionarioId, this.pagina, this.ordem, this.direcao)
     //      funcionarioId,       0    ,  'data'   ,   'desc' 
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











