import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Chamada } from 'src/app/visita/models/visita-post.model';

@Component({
  selector: 'app-desbloqueio-dap',
  templateUrl: './desbloqueio-dap.component.html',
  styleUrls: ['./desbloqueio-dap.component.css']
})
export class DesbloqueioDapComponent implements OnInit {

  chamadas: Chamada[] = [];  
  
  SITUACAO_TEXT: string = 'O produtor procurou o apoio a este escritório pois necessita da emissão deste documento para beneficiar de programas de governo para a agricultura familiar.';
  ORIENTACAO_TEXT: string = 'DOCUMENTAÇÃO NECESSÁRIA PARA EMISSÃO OU RENOVAÇÃO DE DAP – DECLARAÇÃO DE APTIDÃO AO PRONAF - CPF e RG de todos os titulares; - Extrato CNIR – Cadastro nacional de imóveis rurais; - Cópia da carteira de trabalho de ambos os titulares, quando for o caso; - Extrato do Cadastro Nacional de Informações Sociais (CNIS) do(s) titular(es)- Retirar em https://www.inss.gov.br/servicos-do-inss/meu-inss/; - Holerite ou comprovante/demonstrativo de rendimentos do(s) titular(es); - Imposto de renda pessoa física; - Imposto de renda pessoa jurídica; ; - Extrato da Relação Anual de Informações Sociais (RAIS) - Retirar em: http://www.rais.gov.br/sitio/consulta_trabalhador_identificacao.jsf; - Contrato de parceria ou meação (assinada pelos dois ou mais agricultores envolvidos); - DASN Declaração anual do simples nacional (MEI Microempreendedor individual ); - DER - Declaração de Resultados do Exercício obtido junto à Junta Comercial (exceto MEI); - GTA Guia de Trânsito Animal; - Cópia de notas de venda da produção (bloo do produtor) ou declaração do comprador informando o produto adquirido, valor pago e a data da transação do(s) titular(es); - Ficha Sanitária do Rebanho; - Escritura, Certidão ou Cópia da Matrícula.; - Certificado de Cadastro de Imóvel Rural (CCIR); - Declaração do Imposto Territorial Rural (ITR);Documento para preenchimento das declarações abaixo:; - Declaração do empregador constando vínculo e rendimento/salário; - Declaração do(s) beneficiário(s) de que não comercializou produção no âmbito dos programas de compras públicas (PAA, PNAE, Biodiesel); - Declaração de beneficiário de Programas Sociais; - Declaração de recebimento de Benefícios Sociais (exceto Programas Sociais);';
  RECOMENDACAO_TEXT: string = '';
  TEMPLATE_TITLE: string = 'Desbloqueio de DAP';
  TEMPLATE_SUB: string = 'Registrar Atendimento em desbloqueio de Declaração de aptidão ao PRONAF';

  usuario: string = '';

  constructor(
    private authenticationService: AuthenticationService
  ) { 
    this.usuario = this.authenticationService.getUserName();
  }

  ngOnInit(): void {
    
    let servico01: Chamada = {
      cpfReponsavel: this.usuario,
      ocorrencia: '***',
      serviceProvidedCode: 'DAPDBL',
      servicoPrestado: 'Levantamento de informações para incíio de processo de desbloqueio de DAP.',
      valor: 0
    }
    this.chamadas.push(servico01);

    let servico02: Chamada = {
      cpfReponsavel: this.usuario,
      ocorrencia: '***',
      serviceProvidedCode: 'DAPLEV',
      servicoPrestado: 'Levantamento de dados e informações sociais para verificar enquadramento e possível debloqueio da DAP.',
      valor: 0
    }
    this.chamadas.push(servico02);

  }

}

