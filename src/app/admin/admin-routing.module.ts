import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
	AtualizacaoComponent,
	CadastroComponent, 
	ListagemComponent,
	AdminComponent
} from './components';
import { AdminGuard } from './services';

export const AdminRoutes: Routes = [
	{
		path: 'admin',
		component: AdminComponent,
		canActivate: [AdminGuard],  // como é array pode-se acrescenta múltiplos guards para uma mesma rota
		children: [
		  {
			path: '', 
			component: ListagemComponent 
		  },
		  {
			path: 'cadastro', 
			component: CadastroComponent 
		  },
		  {
			path: 'atualizacao/:lancamentoId', // parametro dinamico de url com o número do id
			component: AtualizacaoComponent 
		  }
		]
	}
];

@NgModule({
  imports: [
    RouterModule.forChild(AdminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {
}
