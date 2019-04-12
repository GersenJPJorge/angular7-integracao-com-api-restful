import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent, LogarComponent } from './components';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatInputModule, MatButtonModule, MatListModule, MatTooltipModule, MatIconModule, MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [
    LoginComponent,
    LogarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    FlexLayoutModule,
  ],
})
export class LoginModule { }
