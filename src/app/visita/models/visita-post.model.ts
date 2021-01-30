import { ProdutoresMin } from './../../produtores/models/produtores-min.model';
import { ChamadasPost } from './../../chamadas/models/chamadas-post.model';

    export interface Chamada {
        codigo?: string;
        codigoDaVisita?: string;
        cpfReponsavel?: string;
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
        localDoAtendimeno: string;
        municipio: string;
        orientacao: string;
        produtores: Produtore[];
        recomendacao: string;
        situacaoAtual: string;
    }
