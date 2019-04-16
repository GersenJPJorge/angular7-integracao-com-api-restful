import { Pipe, PipeTransform } from '@angular/core';

import { Tipo } from '../models';

@Pipe({
  name: 'tipo'
})
export class TipoPipe implements PipeTransform {

  transform(tipo: Tipo, args?: any): string { // recebemos como argumento o tipo
    return this.obterTexto(tipo);             // retorna uma string com o valor da descrição

  }

  obterTexto(tipo: Tipo): string {   // recebe tipo como parâmetro e retorna uma string
  	let tipoDesc: string;
  	switch (tipo) {
  		case Tipo.INICIO_TRABALHO:
  			tipoDesc = 'Início do trabalho';
  			break;
  		case Tipo.INICIO_ALMOCO:
  			tipoDesc = 'Início do almoço';
  			break;
  		case Tipo.TERMINO_ALMOCO:
  			tipoDesc = 'Término do almoço';
  			break;
  		case Tipo.TERMINO_TRABALHO:
  			tipoDesc = 'Término do trabalho';
  			break;
  		default:
  			tipoDesc = tipo;
  			break;
  	}
  	return tipoDesc;
  }

}
