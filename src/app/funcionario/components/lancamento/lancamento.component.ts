import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { 
  Tipo
} from '../../../shared';                          // Enuns

import * as moment from 'moment';

declare var navigator: any;                        // é um objeto do próprio navegador - para obter a geolocalização
                                                   // esse formato é padrão para objetos externos ao angular

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {

  private dataAtualEn: string;                     // é privado porque será aessado somente dentro dessa classe - Data atual ingles(por causa do banco)
  dataAtual: string;
  geoLocation: string;
  ultimoTipoLancado: string;

  constructor(
  	private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
  	this.dataAtual = moment().format('DD/MM/YYYY HH:mm:ss');
  	this.dataAtualEn = moment().format('YYYY-MM-DD HH:mm:ss');
  	this.obterGeoLocation();
    this.ultimoTipoLancado = '';
    this.obterUltimoLancamento();
  }

  obterGeoLocation(): string {
    if (navigator.geolocation) {                         // porque tem navegadores que não suportam
        navigator.geolocation.getCurrentPosition(position => 
        	this.geoLocation = `${position.coords.latitude},${position.coords.longitude}`);
    }
    return '';
  }

  iniciarTrabalho() {
    this.cadastrar(Tipo.INICIO_TRABALHO);
  }

  terminarTrabalho() {
    this.cadastrar(Tipo.TERMINO_TRABALHO);
  }

  iniciarAlmoco() {
    this.cadastrar(Tipo.INICIO_ALMOCO);
  }

  terminarAlmoco() {
    this.cadastrar(Tipo.TERMINO_ALMOCO);
  }

  obterUltimoLancamento() {
    this.ultimoTipoLancado = Tipo.INICIO_TRABALHO;
  }

  cadastrar(tipo: Tipo) {
  	alert(`Tipo: ${tipo}, dataAtualEn: ${this.dataAtualEn}, 
  		geolocation: ${this.geoLocation}`);
  }

  obterUrlMapa(): string {
  	return "https://www.google.com/maps/search/?api=1&query=" +    // é do próprio googlemaps
  		this.geoLocation;
  }

  exibirInicioTrabalho(): boolean {
  	return this.ultimoTipoLancado == '' || 
  		this.ultimoTipoLancado == Tipo.TERMINO_TRABALHO;
  }

  exibirTerminoTrabalho(): boolean {
  	return this.ultimoTipoLancado == Tipo.INICIO_TRABALHO || 
  		this.ultimoTipoLancado == Tipo.TERMINO_ALMOCO;
  }

  exibirInicioAlmoco(): boolean {
  	return this.ultimoTipoLancado == Tipo.INICIO_TRABALHO;
  }

  exibirTerminoAlmoco(): boolean {
  	return this.ultimoTipoLancado == Tipo.INICIO_ALMOCO;
  }

}







