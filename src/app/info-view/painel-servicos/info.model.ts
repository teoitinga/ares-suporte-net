    export interface Aco {
        codigo: string;
        dataDaChamada: string;
        servico: string;
        status: string;
        tecnico: string;
        valor: string;
    }

    export interface Produtore {
        cpf: string;
        endereco: string;
        fone: string;
        nome: string;
    }

    export interface InfoModel {
        acoes: Aco[];
        codigoVisita: string;
        dataDaVisita: string;
        local: string;
        municipioVisita: string;
        produtores: Produtore[];
        totalDeChamadas: number;
    }
