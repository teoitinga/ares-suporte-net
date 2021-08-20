    export interface Atd {
        callReferency: string;
        dataDaVisita: string;
        created: Date;
        eslocReferency: string;
        eslocMunicipio: string;
        callCode: string;
        idReport: string;
        status: string;
        responsavelNome: string;
    }

    export interface Sort {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    }

    export interface Pageable {
        sort: Sort;
        offset: number;
        pageSize: number;
        pageNumber: number;
        paged: boolean;
        unpaged: boolean;
    }

    export interface Sort2 {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    }

    export interface AtendimentoModel {
        content: Atd[];
        pageable: Pageable;
        totalElements: number;
        last: boolean;
        totalPages: number;
        number: number;
        size: number;
        sort: Sort2;
        numberOfElements: number;
        first: boolean;
        empty: boolean;
    }

