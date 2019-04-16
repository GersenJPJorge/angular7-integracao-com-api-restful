import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment'; // para ter acesso a base-url da api

import { Lancamento } from '../models';
import { HttpUtilService } from './http-util.service';

@Injectable()
export class LancamentoService {

  private readonly PATH: string = 'lancamentos';
  private readonly PATH_ULTIMO_LANC = '/funcionario/{funcionarioId}/ultimo';
  private readonly PATH_LANCAMENTOS = '/funcionario/{funcionarioId}';
  private readonly PATH_TODOS_LANC = '/funcionario/{funcionarioId}/todos';
  // constantes no typescript são escritas assim

  constructor(
  	private http: HttpClient,
  	private httpUtil: HttpUtilService) { }

  buscarUltimoTipoLancado(): Observable<any> {           // retorna observable porque é uma chamada assincrona
    return this.http.get(
        env.baseApiUrl + this.PATH + 
        // baseApiUrl: 'http://localhost:8080/api/'  + PATH: string = 'lancamentos';
          this.PATH_ULTIMO_LANC.replace(
            // PATH_ULTIMO_LANC = '/funcionario/{funcionarioId}/ultimo';
            '{funcionarioId}', this.httpUtil.obterIdUsuario()),
            // encontre a marcação funcionarioId e substitua por id do funcionário
        this.httpUtil.headers() // autorization e o token da requisição
    );
  }

  cadastrar(lancamento: Lancamento): Observable<any> {
  	return this.http.post(
  	  	env.baseApiUrl + this.PATH, // posição 0 do token
  	  	lancamento,                 // posição 1 do token 
  	  	this.httpUtil.headers()     // posição 2 do token
  	);
  }

}


