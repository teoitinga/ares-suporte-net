export class ChamadasPost{
    constructor(
        public codigo: string,
        public codigoDaVisita: string,
        public cpfReponsavel: string,
        public ocorrencia: string,
        public serviceProvidedCode: string,
        public servicoPrestado: string,
        public servicoQuitadoEm: string,
        public status: string,
        public valor: number
    ){}
}