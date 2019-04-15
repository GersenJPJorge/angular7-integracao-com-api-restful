import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarPfComponent, CadastroPfComponent } from './components';
import { FlexLayoutModule } from '@angular/flex-layout';             // usado para centralizar os textos
import { RouterModule } from '@angular/router';                      // usado pelo router-outlet

@NgModule({
  declarations: [
    CadastrarPfComponent,
    CadastroPfComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule
  ],
})
export class CadastroPfModule { }
