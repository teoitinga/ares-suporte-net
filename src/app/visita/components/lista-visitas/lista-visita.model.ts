
    export interface Content {
        codvisita: string;
        datavisita: string;
        localvisita: string;
        servicoprestado: string;
        statusvisita: string;
        tecnicoresp: string;
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

    export interface VisitaVOModel {
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
