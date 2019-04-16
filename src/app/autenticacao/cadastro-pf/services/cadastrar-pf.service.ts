import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment'; // para ter acesso a url da api

import { CadastroPf } from '../';

@Injectable()
export class CadastrarPfService {

  private readonly PATH: string = 'cadastrar-pf';

  constructor(private http: HttpClient) { }

  cadastrar(cadastroPf: CadastroPf): Observable<any> { // retorna um observable por ser uma requisição assincrona
  	  return this.http.post(env.baseApiUrl + this.PATH, cadastroPf);
  }

}
