import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDeal } from 'src/pipedrive/interfaces/deals.interface';
import converter from 'jsontoxml';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class BlingService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) { }

  async insertOrder(deal: IDeal) {

    const order = {
      pedido: {
        cliente: {
          nome: deal.name,
        },
        itens: {
          item: {
            codigo: deal.id,
            descricao: deal.title,
            vlr_unit: deal.value / 10,
            un: "un",
            qtde: "1",
          },
        },
      }
    };

    const options: AxiosRequestConfig = {
      params: {
        apikey: this.configService.get('BLING_TOKEN'),
        xml: converter(order)
      }
    }

    const URL = `${this.configService.get('BLING_URL')}/pedido/json`;
    const { data: data } = await this.httpService.post(URL, null, options).toPromise();

    if (!data.retorno.erros) {
      return data.retorno.pedidos[0];
    }
    Logger.log(data.retorno.erros[0]);

  }
}
