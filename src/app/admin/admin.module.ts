import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatTooltipModule,
  MatIconModule,
  MatSnackBarModule,
  MatTableModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule, 
  MatNativeDateModule,
  MAT_DATE_LOCALE,
  MatDialogModule,
  MatPaginatorModule,
  MatPaginatorIntl,
  MatSortModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../shared/shared.module';

import { 
  HttpUtilService, 
  LancamentoService,
  PtBrMatPaginatorIntl,       // tradução da paginação
  FuncionarioService,
} from '../shared';

import { 
	ListagemComponent,
	CadastroComponent,
	AtualizacaoComponent,
  AdminComponent
} from './components';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,                     // por causa do router-outlet
    FlexLayoutModule,
    ReactiveFormsModule, 
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    SharedModule                              // por causa dos pipes e filtros
  ],
  declarations: [
  	ListagemComponent, 
  	CadastroComponent, 
  	AtualizacaoComponent,
    AdminComponent
  ],
  providers: [
    LancamentoService,
    HttpUtilService,
    MatPaginatorIntl,
    FuncionarioService,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, // calendario para obter a data
    { provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl }
  ],
})
export class AdminModule { }





