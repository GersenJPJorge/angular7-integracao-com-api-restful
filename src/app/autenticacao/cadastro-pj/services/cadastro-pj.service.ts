import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment'; // para pegar o base path da url

import { CadastroPj } from '../';

@Injectable()
export class CadastrarPjService {                     // registrar como provider em cadastro-pj.modules

  private readonly PATH: string = 'cadastrar-pj';     // cadastrar-pj é o path da api 

  constructor(private http: HttpClient) { }           // importando o modo httpclient para fazer a requisição

  cadastrar(cadastroPj: CadastroPj): Observable<any> {
  	  return this.http.post(env.baseApiUrl + this.PATH, cadastroPj);   // o .post retorna um observable
  }

}
