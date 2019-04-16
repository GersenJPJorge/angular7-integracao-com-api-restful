import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
	FuncionarioComponent,
	LancamentoComponent, 
	ListagemComponent 
} from './components';

export const FuncionarioRoutes: Routes = [
	{
		path: 'funcionario',
		component: FuncionarioComponent,     // componente wrapper
		children: [
		  {
			path: '',                       // por padrao vai para a pagina de lancamentos
			component: LancamentoComponent 
		  },
		  {
			path: 'listagem', 
			component: ListagemComponent 
		  }
		]
	}
];

@NgModule({
  imports: [
    RouterModule.forChild(FuncionarioRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class FuncionarioRoutingModule {
}



