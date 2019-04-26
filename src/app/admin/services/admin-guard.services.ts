import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router'; // dependendo do perfil ele vai para func ou admin, daí o router

import { HttpUtilService } from '../../shared'; // otem o perfil do usuario

@Injectable()
export class AdminGuard implements CanActivate { // o  canactivate é que torna a classe um guard  

  constructor(
    private httpUtilService: HttpUtilService,
    private router: Router) {}

  canActivate(): boolean {
    if (this.httpUtilService.obterPerfil() === 'ROLE_ADMIN') {
      return true;
    }

    this.router.navigate(['/funcionario']);
    return false;
  }

}





