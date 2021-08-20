import { EscritorioModel } from './../../../shared/models/escritorio';
import jsPDF from "jspdf";
import * as moment from "moment";
import { VisitaPostModel } from "../../models/visita-post.model";

export class geraDocumentoPdf {

    readonly comprimento: number = 290;
    readonly largura: number = 210;
    readonly margemEsquerda: number = 5;
    readonly imgSizeX: number = 30;
    readonly imgSizeY: number = 30;

    readonly margemDireita: number = 5;
    readonly margemSuperior: number = 5;
    readonly margemInferior: number = 15;

    lineCurrent = 0;

    doc = new jsPDF("portrait", 'mm', 'A4');
    //Data atual
    dataAtual = moment().format('LLLL');

    data: VisitaPostModel;

    //Estilos
    readonly fontHeadSize = 12;
    readonly fontFieldSize = 12;
    readonly fontDataSize = 10;
    readonly font_Helvetica = 'helvetica';
    readonly font_Courier = 'courier';
    readonly font_Times = 'times';
    readonly BOLD = 'bold';
    readonly NORMAL = 'normal';
    readonly ITALIC = 'italic';

    //Definições de paragrafos
    readonly PARAGRAFO_INICIO: number;
    readonly PARAGRAFO_FIM: number;
    readonly PARAGRAFO_CORPO: number;


    readonly estilo = STYLES;
    readonly color_Gray = '#CDCDCD';
    readonly color_Black = '#000000';
    //readonly logoImage = 'data:image/jpeg;base64,'+ Base64.encode('../../../../../assets/parceiros/pm_itinga.jpg');
    logoImage = '';//'data:image/jpg;base64,';

    readonly espFields = 5;
    readonly FORMAT: 'A4';
    readonly ORIENTATION: 'portrait';

    //Dados do escritório 
    esloc: EscritorioModel;
    responsavel: string;


    constructor(
        visita: VisitaPostModel,
        escritorio: EscritorioModel,
        user: string,
        imagelogo: string
    ) {
        this.logoImage += imagelogo;
        this.data = visita;

        this.esloc = escritorio;

        this.responsavel = user;

        //Confiruando estilos
        this.PARAGRAFO_INICIO = this.margemEsquerda + 15;
        this.PARAGRAFO_FIM = this.doc.internal.pageSize.getWidth() - this.margemDireita - 1;
        this.PARAGRAFO_CORPO = this.margemEsquerda + 5;

        //Dados fake para testes
        //this.data = VISITA;
    }

    geraDocumento() {

        this.doc.rect(this.margemEsquerda, this.margemSuperior, this.larguraDoc, this.comprimentoDoc);

        //Texto do cabecalho
        const cabecalho = 'Protocolo de prestação de serviços';

        const centroPoint = ((this.largura - cabecalho.length) / 2) - (cabecalho.length / 2);
        this.doc.setFont(this.font_Helvetica, this.BOLD);
        this.lineCurrent += this.fontHeadSize;

        this.doc.text(cabecalho, centroPoint, (this.fontHeadSize));
        this.lineCurrent += this.fontDataSize / 2;

        this.doc.setFont(this.font_Helvetica, this.NORMAL);
        this.doc.setFontSize(this.fontDataSize);

        const descricao = this.esloc.descricao;
        this.doc.text(`${descricao}`, centroPoint, (this.lineCurrent));
        this.lineCurrent += this.fontDataSize / 2;

        const endereco = this.esloc.endereco;
        this.doc.text(`Endereço: ${endereco}`, centroPoint, (this.lineCurrent));
        this.lineCurrent += this.fontDataSize / 2;

        const fone = this.esloc.fone;
        this.doc.text(`Telefone: ${fone}`, centroPoint, (this.lineCurrent));

        //logomarca
        try{
            this.doc.addImage(this.logoImage, "JPEG", this.margemEsquerda + 1, this.margemDireita + 1, this.imgSizeX, this.imgSizeY);
        }catch{}
        try{
            this.doc.addImage(this.logoImage, "JPG", this.margemEsquerda + 1, this.margemDireita + 1, this.imgSizeX, this.imgSizeY);
        }catch{}
        try{
            this.doc.addImage(this.logoImage, "PNG", this.margemEsquerda + 1, this.margemDireita + 1, this.imgSizeX, this.imgSizeY);
        }catch{}

        //Desenha uma linha
        //define as cores e desenho do retangulo
        this.doc.setLineWidth(0.5);
        this.doc.setDrawColor(this.color_Black);
        this.doc.line(this.margemEsquerda + 1, this.imgSizeY + this.margemSuperior, this.PARAGRAFO_FIM, this.imgSizeY + this.margemSuperior);

        //Acrescente o tamanho da fonte na linha coorrente
        this.lineCurrent = this.margemSuperior + this.imgSizeY + this.fontDataSize / 2;
        //acrescenta um espaço para os próximos registros

        //Registro da visita
        this.printCalls();

        //acrescenta um espaço para os próximos registros
        this.lineCurrent += this.espFields;

        //Registro da chamada
        //    printCalls(doc, visita.chamadas);
        //Registro dos beneficiarios
        this.printPersona();
        //acrescenta um espaço para os próximos registros
        this.lineCurrent += this.espFields;

        //Desenha uma linha
        //define as cores e desenho do retangulo
        this.doc.setLineWidth(0.5);
        this.doc.setDrawColor(this.color_Black);
        this.doc.line(this.margemEsquerda + 1, this.lineCurrent, this.doc.internal.pageSize.getWidth() - this.margemDireita - 1, this.lineCurrent);

        //imprime a situação atual
        this.printSituacaoAtual();

        //imprime as orientações
        this.printOrientacoes();

        //imprime as recomendações
        this.printRecomendacoes();

        //Registro de assinatura
        this.printRodape();

        //Visualizando e imprimindo o documento
        this.doc.output('dataurlnewwindow');
        //  this.doc.save(this.data.localDoAtendimento);
    }
    printSituacaoAtual() {
        const fieldName = 'Situação atual:';
        let texto: string;

        let linhaAjustada: number = this.lineCurrent + (this.fontDataSize);

        //Confiruga a fonte para visualização em negrito, tamanho 12
        this.doc.setFont(this.font_Helvetica, this.BOLD);
        this.doc.setFontSize(this.fontDataSize);
        this.doc.text(`\t${fieldName}`, this.margemEsquerda, linhaAjustada);

        //Salta 0,5 linha para continuação do texto
        linhaAjustada += (this.fontDataSize / 2);

        let lines;

        let tamTexto = 1;

        try {
            texto = this.data.situacaoAtual;
            lines = texto.match(/.{1,110}/g);
            tamTexto = lines.length;
        } catch {
            texto = '***';
            lines = texto;

        }
        //adiciona um pequeno espacamento entre esta linha e os detalhes da chamada
        this.doc.setFont(this.font_Helvetica, this.NORMAL);

        if (texto.length < 10) {
            this.doc.text('\t\t\t***', this.PARAGRAFO_CORPO, linhaAjustada);
        } else {
            this.doc.text(lines, this.PARAGRAFO_CORPO, linhaAjustada);
        }

        this.lineCurrent += (this.fontDataSize + linhaAjustada);

        this.lineCurrent = ((this.fontDataSize * 1.5) + linhaAjustada + tamTexto);
        this.isEndPage(this.lineCurrent);
    }
    printOrientacoes() {
        const fieldName = 'Orientações:';
        let texto: string;

        let linhaAjustada: number = this.lineCurrent + (this.fontDataSize);

        //Confiruga a fonte para visualização em negrito, tamanho 12
        this.doc.setFont(this.font_Helvetica, this.BOLD);
        this.doc.setFontSize(this.fontDataSize);
        this.doc.text(`\t${fieldName}`, this.margemEsquerda, linhaAjustada);

        //Salta 0,5 linha para continuação do texto
        linhaAjustada += (this.fontDataSize / 2);

        let lines;

        let tamTexto = 1;

        try {
            texto = this.data.orientacao;
            lines = texto.match(/.{1,110}/g);
            tamTexto = lines.length;
        } catch {
            texto = '***';
            lines = texto;

        }
        //adiciona um pequeno espacamento entre esta linha e os detalhes da chamada
        this.doc.setFont(this.font_Helvetica, this.NORMAL);

        if (texto.length < 10) {
            this.doc.text('\t\t\t***', this.PARAGRAFO_CORPO, linhaAjustada);
        } else {
            this.doc.text(lines, this.PARAGRAFO_CORPO, linhaAjustada);
        }

        this.lineCurrent += (this.fontDataSize + linhaAjustada);

        this.lineCurrent = ((this.fontDataSize * 1.5) + linhaAjustada + tamTexto);
        this.isEndPage(this.lineCurrent);
    }
    printRecomendacoes() {
        const fieldName = 'Recomendações:';
        let texto: string;

        let linhaAjustada: number = this.lineCurrent + (this.fontDataSize);

        //Confiruga a fonte para visualização em negrito, tamanho 12
        this.doc.setFont(this.font_Helvetica, this.BOLD);
        this.doc.setFontSize(this.fontDataSize);
        this.doc.text(`\t${fieldName}`, this.margemEsquerda, linhaAjustada);

        //Salta 0,5 linha para continuação do texto
        linhaAjustada += (this.fontDataSize / 2);

        let lines;

        let tamTexto = 1;

        try {
            texto = this.data.recomendacao;
            lines = texto.match(/.{1,110}/g);
            tamTexto = lines.length;
        } catch {
            texto = '***';
            lines = texto;

        }
        //adiciona um pequeno espacamento entre esta linha e os detalhes da chamada
        this.doc.setFont(this.font_Helvetica, this.NORMAL);

        if (texto.length < 10) {
            this.doc.text('\t\t\t***', this.PARAGRAFO_CORPO, linhaAjustada);
        } else {
            this.doc.text(lines, this.PARAGRAFO_CORPO, linhaAjustada);
        }

        this.lineCurrent += (this.fontDataSize + linhaAjustada);

        this.lineCurrent = ((this.fontDataSize * 1.5) + linhaAjustada + tamTexto);
        this.isEndPage(this.lineCurrent);
    }
    printRodape() {

        let linhaAjustada: number = this.lineCurrent + (this.fontDataSize);

        //define as cores e desenho do retangulo
        this.doc.setLineWidth(0.5);
        this.doc.setDrawColor(this.color_Black);
        this.doc.line(this.margemEsquerda + 1, linhaAjustada, this.PARAGRAFO_FIM, linhaAjustada);

        //adiciona um espacamento  de 0,5 linhas entre esta linha e os detalhes da chamada
        linhaAjustada += this.fontDataSize;

        //Confiruga a fonte para visualização em negrito, tamanho 12
        this.doc.setFont(this.font_Helvetica, this.BOLD);
        this.doc.text(`\tAssinatura`, this.margemEsquerda, linhaAjustada);

        //adiciona um espacamento  de 0,5 linhas entre esta linha e os detalhes da chamada
        linhaAjustada += this.fontDataSize;

        //Confiruga a fonte para visualização em negrito, tamanho 12
        const declaracao: string = 'Declaro(mos), sob as penas da Lei, que são verdadeiras e completas as informações prestadas neste documento.';
        let lines = declaracao.match(/.{1,110}/g);
        this.doc.setFont(this.font_Helvetica, this.NORMAL);
        this.doc.setFontSize(this.fontDataSize);
        this.doc.text(`\t${lines}`, this.margemEsquerda, linhaAjustada);

        //adiciona um espacamento  de 0,5 linhas entre esta linha e os detalhes da chamada
        linhaAjustada += this.fontDataSize;

        //imprime os dados
        this.data.produtores.forEach(prd => {

            const nome = prd.nome;
            const cpf = prd.cpf;

            let proximalinha = linhaAjustada;

            const beneficiario: string = `${nome} - ${cpf}`;

            //define as cores e desenho do retangulo
            this.doc.setLineWidth(0.1);
            this.doc.setDrawColor(this.color_Black);
            this.doc.line((beneficiario.length * 1.8) + this.margemEsquerda + 5, proximalinha, this.PARAGRAFO_FIM, proximalinha);

            this.doc.setFont(this.font_Helvetica, this.NORMAL);
            this.doc.text(beneficiario, this.margemEsquerda + 3, proximalinha);

            linhaAjustada += this.fontDataSize;

        });
        this.isEndPage(this.lineCurrent);
        this.lineCurrent = linhaAjustada;
        const municipio = this.data.municipio;
        const dataAtual = moment().format("DD/MM/YYYY HH:mm");
        this.isEndPage(this.lineCurrent);
        this.doc.setFont(this.font_Helvetica, this.NORMAL);
        this.doc.setFontSize(this.fontDataSize);
        const texto = `\t${municipio}, ${dataAtual}`;
        this.doc.text(texto, this.margemEsquerda, this.lineCurrent);
        this.doc.text(`Responsável pelo registro: ${this.responsavel}`, this.margemEsquerda + (texto.length * 2), this.lineCurrent);
        this.isEndPage(this.lineCurrent);
    }
    get comprimentoDoc(): number {
        return this.comprimento - this.margemSuperior - this.margemInferior;
    }
    get larguraDoc(): number {
        return this.largura - this.margemEsquerda - this.margemDireita;
    }

    printCalls() {
        let lineheigth = 5;
        //linha inicial do grupo
        const distMargemX = this.margemEsquerda + 1;
        const linestart = this.lineCurrent - lineheigth;

        //inicia o contador de linhas
        let linhaAjustada = this.lineCurrent;

        //define as cores e desenho do retangulo
        this.doc.setDrawColor(this.color_Gray);
        this.doc.setFillColor(this.color_Gray);
        this.doc.rect(distMargemX, linestart, this.larguraDoc - 2, lineheigth + 2, 'F');

        //Confiruga a fonte para visualização em negrito, tamanho 12
        this.doc.setFont(this.font_Helvetica, this.BOLD);
        this.doc.setFontSize(this.fontFieldSize);
        this.doc.text(`\tAtendimento/Serviço prestado`, distMargemX, linhaAjustada);

        linhaAjustada += (lineheigth + 2);
        const local = this.data.localDoAtendimento;

        //convete o texto de data em formato de data
        const dataAtual = moment(this.data.dataDaVisita, "YYYY-MM-DD").format("DD/MM/YYYY");;
        this.doc.setFont(this.font_Helvetica, this.NORMAL);
        this.doc.setFontSize(this.fontDataSize);
        this.doc.text(`\tLocal do atendimento: ${local} - Data: ${dataAtual}`, distMargemX, linhaAjustada);

        //adiciona um pequeno espacamento entre esta linha e os detalhes da chamada
        linhaAjustada += (lineheigth + 2);

        //texto do campo a ser impresso
        let texto: string = '';

        if (this.data.chamadas.length > 1) {
            let i = 1;//contador de iterações
            //imprime os dados
            this.data.chamadas.forEach(call => {
                const servico = call.servicoPrestado;
                let valor = call.valor.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

                if (valor == "0.00") {
                    valor = '';
                } else {
                    //valor = `\n\t\t\t*Valor pago pelo beneficiário (R$): ${valor}`;
                    valor = ` (*Valor pago pelo beneficiário (R$): ${valor})`;
                    // proximalinha += (lineheigth);
                }

                texto += `- ${servico}${valor}`;

                if (i < this.data.chamadas.length) {
                    texto = texto.concat(', ');//Adiciona uma vírgula caso tenha mais de uma iteração
                }
                else {
                    texto = texto.concat('.');//Adiciona uma vírgula caso tenha mais de uma iteração
                }

                i += 1;
            });
        } else {
            const call = this.data.chamadas[0];
            const servico = call.servicoPrestado;
            let valor = call.valor.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

            if (valor == "0.00") {
                valor = '';
            } else {
                valor = ` (*Valor pago pelo beneficiário (R$): ${valor})`;
            }

            texto += `- ${servico}${valor}`;

        }

        //adiciona um pequeno espacamento entre esta linha e os detalhes da chamada
        this.doc.setFontSize(this.fontDataSize);
        this.doc.setFont(this.font_Helvetica, this.NORMAL);
        const lines = texto.match(/.{1,110}/g);

        if (texto.length < 10) {
            this.doc.text('\t\t\t***', this.PARAGRAFO_CORPO, linhaAjustada);
        } else {
            this.doc.text(lines, this.PARAGRAFO_CORPO, linhaAjustada);
        }

        this.lineCurrent = ((this.fontDataSize) + linhaAjustada + lines.length);

        this.isEndPage(this.lineCurrent);

    }
    isEndPage(line: number) {
        if (this.lineCurrent >= 290) {
            this.doc.addPage(this.FORMAT, this.ORIENTATION);
            this.lineCurrent = 0;
        }
    }
    printPersona() {
        let lineheigth = 5;
        //linha inicial do grupo
        const linestart = this.lineCurrent - lineheigth;
        const distMargemX = this.margemEsquerda + 1;

        //inicia o contador de linhas
        let linhaCount = this.lineCurrent;

        //define as cores e desenho do retangulo
        this.doc.setDrawColor(this.color_Gray);
        this.doc.setFillColor(this.color_Gray);
        this.doc.rect(distMargemX, linestart, this.larguraDoc - 2, lineheigth + 2, 'F');

        //Confiruga a fonte para visualização em negrito, tamanho 12
        this.doc.setFont(this.font_Helvetica, this.BOLD);
        this.doc.setFontSize(this.fontFieldSize);
        this.doc.text(`\tBeneficiário(s)`, distMargemX, linhaCount);

        //adiciona um pequeno espacamento entre esta linha e os detalhes da chamada
        linhaCount += (lineheigth + 2);

        //imprime os dados
        this.data.produtores.forEach(prd => {

            const nome = prd.nome;
            const cpf = prd.cpf;

            let proximalinha = linhaCount;

            this.doc.setFont(this.font_Helvetica, this.NORMAL);
            this.doc.setFontSize(this.fontDataSize);
            this.doc.text(`\t\t- ${nome} - CPF: ${cpf}`, distMargemX, linhaCount);

            proximalinha += (lineheigth);
            linhaCount = proximalinha;
        });

        this.lineCurrent = linhaCount;
        this.isEndPage(this.lineCurrent);
    }
}

export const STYLES = {
    header: {
        fontSize: 12,
        bold: true
    },
    field: {
        fontSize: 10,
        bold: false,
        italics: true
    },
    data: {
        fontSize: 10,
        bold: false,
        italics: true
    }
}
export const VISITA = {
    chamadas: [{
        "serviceProvidedCode": "GMPIMA",
        "servicoPrestado": "Georeferenciamento IMA",
        "ocorrencia": "",
        "valor": 0,
        "cpfReponsavel": "04459471604"
    },
    {
        "serviceProvidedCode": "GMPIMA",
        "servicoPrestado": "Georeferenciamento CAR",
        "ocorrencia": "",
        "valor": 650.23,
        "cpfReponsavel": "04459471604"
    },
    {
        "serviceProvidedCode": "DAP",
        "servicoPrestado": "Emissão de declaração de aptidão ao PRONAF a agricultor familiar",
        "ocorrencia": "",
        "valor": 0,
        "cpfReponsavel": "09298188650"
    }],
    codigoVisita: null,
    localDoAtendimento: "sitio vai e volta",
    dataDaVisita: "2021-06-03",
    createFolder: true,
    //O rebanho bovino brasileiro é um dos maiores do planeta: em 2016, havia no país quase 220 milhões de cabeças, segundo os dados do IBGE (Instituto Brasileiro de Geografia e Estatística). Com uma maior visibilidade do Brasil no contexto mundial de produção, é fundamental que as normas de bem-estar para bovinos de corte sejam disseminadas na pecuária brasileira.
    situacaoAtual: `
    Bovinos adultos e bezerros devem ter acesso à água de beber limpa e fresca. Geralmente, um bovino precisa de aproximadamente quatro litros por quilo de peso. Os estábulos precisam ter uma fonte de água contínua. Parece óbvio, mas é bom ressaltar que os equipamentos onde os animais bebem devem ser mantidos limpos e deles não deve escorrer água num volume capaz de molhar as áreas de descanso. No pasto, deve-se tomar o cuidado para que os animais não tenham de caminhar muito até o recurso de água: a distância a percorrer não deve ser superior a 800 metros em terreno inclinado ou a 3.200 metros em áreas planas. As normas não recomendam a utilização de fontes naturais de água. Mas, se isso for necessário, deve-se evitar o risco de transmissão de doenças e contaminação do meio, respeitando as legislações vigentes.
    `,
    orientacao: `
    Bovinos adultos e bezerros devem ter acesso à água de beber limpa e fresca. Geralmente, um bovino precisa de aproximadamente quatro litros por quilo de peso. Os estábulos precisam ter uma fonte de água contínua. Parece óbvio, mas é bom ressaltar que os equipamentos onde os animais bebem devem ser mantidos limpos e deles não deve escorrer água num volume capaz de molhar as áreas de descanso. No pasto, deve-se tomar o cuidado para que os animais não tenham de caminhar muito até o recurso de água: a distância a percorrer não deve ser superior a 800 metros em terreno inclinado ou a 3.200 metros em áreas planas. As normas não recomendam a utilização de fontes naturais de água. Mas, se isso for necessário, deve-se evitar o risco de transmissão de doenças e contaminação do meio, respeitando as legislações vigentes.
    `,
    recomendacao: `
    Alguns aspectos do manejo com bem-estar para bovinos de corte merecem destaque. Um deles diz respeito aos barulhos causados pelas instalações. Portões, ferrolhos e outros equipamentos precisam ser silenciosos, de modo a evitar que o gado se estresse com os ruídos, uma vez que são uma espécie presa. Outro ponto importante é o cuidado com as instalações para embarque e transporte. A inclinação máxima das rampas para embarque nos veículos de transporte é de 20%. Essas áreas precisam ser bem iluminadas e mantidas limpas. No embarque, o veículo tem de ficar bem próximo do fim da rampa, para evitar que os bovinos escorreguem e caiam. A carroceria deve ser inspecionada frequentemente para assegurar que não haja pontas cortantes ou afiadas que possam ferir os animais e o piso deve ser antiderrapante.
    `,
    municipio: "Tarumirim",
    produtores: [{
        "cpf": "08401677688",
        "nome": "Thiago Henrique Ramos"
    }, {
        "cpf": "62661175687",
        "nome": "Rogerio de Paula Freitas"
    }, {
        "cpf": "06798783600",
        "nome": "Michele Arcadia de Assis Caetano"
    }]
};

function doc(doc: any, any: any, chamadas: any, arg3: any) {
    throw new Error('Function not implemented.');
}
