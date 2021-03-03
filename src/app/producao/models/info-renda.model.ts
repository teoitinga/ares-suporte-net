    export interface ProducaoAnual {
        codItemProducao?: string;
        dataProducao?: string;
        descricao?: string;
        quantidade?: number;
        valorUnitario?: number;
        producaoAgropecuaria?: string;
    }

    export interface Produtore {
        cpf: string;
        nome: string;
    }

    export interface InfoRendaModel {
        areaExplorada: number;
        areaImovelPrincipal: number;
        createFolder: boolean;
        dataDaVisita: string;
        localDoAtendimeno: string;
        membrosDaFamilia: number;
        orientacao: string;
        producaoAnual: ProducaoAnual[];
        produtores: Produtore[];
        quantidadePropriedades: number;
        recomendacao: string;
        situacaoAtual: string;
        valorCobrado: number;
    }

