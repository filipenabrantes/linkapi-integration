import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { makeRequest } from 'src/manager/make-request';
import { IDeals } from 'src/pipedrive/interfaces/deals.interface';
import converter from 'xml-js';

@Injectable()
export class BlingService {
  constructor(private readonly configService: ConfigService) { }

  async insertOrder(deal: IDeals) {
    const order = JSON.stringify({
      pedido: {
        cliente: {
          nome: deal.name,
        },
        itens: {
          item: {
            codigo: deal.id,
            descricao: deal.title,
            vlr_unit: parseFloat(deal.value.toString()),
            un: "un",
            qtde: "10",
          },
        },
      }
    });

    const params = {
      apikey: this.configService.get('BLING_TOKEN'),
      xml: converter.json2xml(order)
    }
    const res = await makeRequest(`${this.configService.get('BLING_URL')}/pedido/json`, 'POST', params);
    console.log(res);


  }
}
