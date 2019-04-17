import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemComponent, CadastroComponent, AtualizacaoComponent } from './components';

@NgModule({
  declarations: [
    ListagemComponent, 
    CadastroComponent, 
    AtualizacaoComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class AdminModule { }
