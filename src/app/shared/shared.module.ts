import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascaraDirective } from './directives/mascara.directive';
import { PtBrMatPaginatorIntl } from './';

@NgModule({
  declarations: [
    MascaraDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MascaraDirective,    // precisa por causa do módulo que vai importar o shared module (ou qualquer outro que precise)
  ],
  providers: [
    PtBrMatPaginatorIntl,
  ],
})
export class SharedModule { }
