    export interface Content {
        codigo: string;
        dataDeConclusao: string;
        dataPgto: string;
        descricaoDoServico: string;
        nomeDoProdutor: string;
        propriedadeRural: string;
        status: string;
        valor: number;
    }

    export interface Sort {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    }

    export interface Pageable {
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        sort: Sort;
        unpaged: boolean;
    }

    export interface Sort2 {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    }

    export interface CallData {
        content: Content[];
        empty: boolean;
        first: boolean;
        last: boolean;
        number: number;
        numberOfElements: number;
        pageable: Pageable;
        size: number;
        sort: Sort2;
        totalElements: number;
        totalPages: number;
    }

