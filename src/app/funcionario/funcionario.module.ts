import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemComponent } from './components/listagem/listagem.component';
import { LancamentoComponent } from './components';

@NgModule({
  declarations: [
    ListagemComponent, 
    LancamentoComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class FuncionarioModule { }
