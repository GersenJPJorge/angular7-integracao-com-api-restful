import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarPfComponent, CadastroPfComponent } from './components';
import { FlexLayoutModule } from '@angular/flex-layout';             // usado para centralizar os textos
import { RouterModule } from '@angular/router';                      // usado pelo router-outlet
import { ReactiveFormsModule } from '@angular/forms';                // responsável pela criação do formulário
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule, MatButtonModule, MatListModule, MatTooltipModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CadastrarPfComponent,
    CadastroPfComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    SharedModule,

  ],
})
export class CadastroPfModule { }
