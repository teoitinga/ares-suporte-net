export interface Servico {
    dataServico: string;
    servicoPrestado: string;
    escritorio: string;
    codEscritorio: string;
    municipio: string;
    codChamada: string;
    nomeBeneficiario: string;
    nomeResponsavel: string;
}

export interface ChamadasCustomModel {
    relatorio: string;
    dataInicial: string;
    dataFinal: string;
    servico: Servico[];

}
export interface ChartModel {
    relatorio: string;
    dataInicial: string;
    dataFinal: string;
    servico: TotalServices[];

}
export interface TotalServices {
    servicoDesc: string;
    quantidade: number;

}

