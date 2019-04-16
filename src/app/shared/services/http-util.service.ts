import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';      // para efetuar a requisição http

@Injectable()
export class HttpUtilService {

  constructor() { }

  headers() {                                           // as configurações de header que precisamos para a api
  	let httpHeaders: HttpHeaders = new HttpHeaders();
	
  	if (localStorage['token']) {
  	  httpHeaders = httpHeaders.set(                         //  httpheader é imutável, por isso precisa do .set para gerar um novo httpheader com a informações 
  	  	'Authorization', 'Bearer ' + localStorage['token']
  	  );
  	}
    
    return { headers: httpHeaders };                  // padrão angular
  }

  obterIdUsuario(): string {                          // vindo do token
  	if (!localStorage['token']) {
  	  return '';
  	}
  	const dadosUsuario = this.obterDadosUsuario(); // dadosUsuario é um objeto que contem os dados do usuário
  	return dadosUsuario ? dadosUsuario.id : '';    // se dadosUsuario for um objeto então meu retorno o id, senão, retorna brancos
  }

  obterIdEmpresa(): string {                          // vindo do token
    if (!localStorage['token']) {
      return '';
    }
    const dadosUsuario = this.obterDadosUsuario();
    return dadosUsuario ? dadosUsuario.empresaId : '';
  }

  obterDadosUsuario() {
    if (!localStorage['token']) {
      return '';
    }
    return JSON.parse(atob(localStorage['token'].split('.')[1]));   
     // vai retornar um array com 3 objetos
     // atob(função javascript) - recebe base 64 e retorna texto
     // o token vem em 3 partes(0 ,1, 2) ,e a segunda(1) é que nos interessa
     // o json.parse transforma em objeto
  }
	
}







