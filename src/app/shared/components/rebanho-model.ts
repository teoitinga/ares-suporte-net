export interface RebanhoModel {
    categoria: Categoria,
    quantidade: number
}
export interface Categoria {
    descricao: string,
    representacao: string,
    ua: number
}
export const CATEGORIAS: Categoria[] = [
    {descricao: 'Vacas em Lactação', representacao: 'Vacas em período de lactação', ua: 1.0},
    {descricao: 'Vacas secas', representacao: 'Vacas secas', ua: 1.00},
    {descricao: 'Novilhos(as) - 25-36 m', representacao: 'Animais de 24 a 36 meses', ua: 1.00},
    {descricao: 'Novilhos(as) - 12-24 m', representacao: 'Animais de 12 a 24 meses', ua: 0.75},
    {descricao: 'Bezerros - 0-12 m', representacao: 'Animais de 0 a 12 meses', ua: 0.50},
    {descricao: 'Touros', representacao: 'Touros', ua: 1.50}
];
