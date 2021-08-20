    export interface Content {
        cpf: string;
        nome: string;
        telefone?: any;
        nascimento?: any;
        categoria: string;
        endereco?: any;
        cidade?: any;
        cep?: any;
    }

    export interface Sort {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    }

    export interface Pageable {
        sort: Sort;
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        unpaged: boolean;
    }

    export interface Sort2 {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    }

    export interface ProdutorListModel {
        content: Content[];
        pageable: Pageable;
        totalElements: number;
        totalPages: number;
        last: boolean;
        number: number;
        size: number;
        sort: Sort2;
        numberOfElements: number;
        first: boolean;
        empty: boolean;
    }
