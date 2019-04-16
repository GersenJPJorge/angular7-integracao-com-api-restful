
export class Lancamento {

	constructor(public data: string,
				public tipo: string,
				public localizacao: string,
				public funcionarioId: string,
                public id?: string) {}          // opcional, porque na criação ainda não temos essa informação - só depois de criado
                

}
