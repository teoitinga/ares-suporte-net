export class ServicosPrestadosModel {
    constructor(
       public codigo?: string,
       public defaultValue?: number,
       public descricao?: string,
       public referency?: string,
       public timeRemaining?: number
    ){}
}
