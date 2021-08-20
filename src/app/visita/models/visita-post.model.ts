    export interface Chamada {
        codigo?: string;
        codigoDaVisita?: string;
        cpfReponsavel?: string;
        status?: string;
        ocorrencia: string;
        serviceProvidedCode: string;
        servicoPrestado: string;
        valor: number;
    }

    export interface Produtore {
        cpf: string;
        nome: string;
    }

    export interface VisitaPostModel {
        chamadas: Chamada[];
        codigoVisita: string;
        createFolder: boolean;
        dataDaVisita: string;
        localDoAtendimento: string;
        municipio: string;
        orientacao: string;
        produtores: Produtore[];
        recomendacao: string;
        situacaoAtual: string;
        idReport: string;
    }
