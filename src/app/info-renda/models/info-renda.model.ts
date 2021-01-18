    export interface Producao {
        codItemProducao: string;
        dataProducao: string;
        quantidade: number;
        valorUnitario: number;
    }

    export interface Produtore {
        cpf: string;
        nome: string;
    }

    export interface InfoRendaModel {
        codigoVisita: string;
        createFolder: boolean;
        dataDaVisita: string;
        localDoAtendimeno: string;
        orientacao: string;
        producao: Producao[];
        produtores: Produtore[];
        recomendacao: string;
        situacaoAtual: string;
        valorCobrado: number;
    }