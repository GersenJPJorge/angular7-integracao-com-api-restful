import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from './app.component';
import { LoginModule, LoginRoutingModule, CadastroPjModule, CadastroPjRoutingModule } from './autenticacao';
import { AppRoutingModule } from './app-routing.module';
import { CadastroPfModule, CadastroPfRoutingModule } from './autenticacao';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FuncionarioModule, FuncionarioRoutingModule } from './funcionario';
import { AdminModule } from './admin';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    LoginModule,
    LoginRoutingModule,
    CadastroPjModule,
    CadastroPjRoutingModule,
    CadastroPfModule,
    CadastroPfRoutingModule,
    FuncionarioModule,
    FuncionarioRoutingModule,
    AdminModule,

    
    AppRoutingModule,               // O módulo raiz dever sempre estar em último
  ],
  providers: [
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
