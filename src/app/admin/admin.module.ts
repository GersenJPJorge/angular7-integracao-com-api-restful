import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemComponent, CadastroComponent, AtualizacaoComponent, AdminComponent } from './components';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    ListagemComponent, 
    CadastroComponent, 
    AtualizacaoComponent,
    AdminComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,                             // por causa do router-outlet
    FlexLayoutModule,

  ],
})
export class AdminModule { }
