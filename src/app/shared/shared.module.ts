import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascaraDirective } from './directives/mascara.directive';
import { PtBrMatPaginatorIntl } from './';
import { TipoPipe } from './pipes/tipo.pipe';
import { DataPipe } from './pipes/data.pipe';

@NgModule({
  declarations: [
    MascaraDirective,
    TipoPipe,
    DataPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MascaraDirective,    // precisa por causa do módulo que vai importar o shared module (ou qualquer outro que precise)
    TipoPipe,
    DataPipe,
  ],
  providers: [
    PtBrMatPaginatorIntl,
  ],
})
export class SharedModule { }
