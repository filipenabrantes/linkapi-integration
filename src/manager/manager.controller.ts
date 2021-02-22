import { Controller, Get } from '@nestjs/common';
import { BlingService } from 'src/bling/bling.service';
import { IDeal } from 'src/pipedrive/interfaces/deals.interface';
import { PipedriveService } from 'src/pipedrive/pipedrive.service';
import { IOrder } from './interfaces/order.interface';
import { ManagerService } from './manager.service';

@Controller('manager')
export class ManagerController {
  constructor
    (
      private readonly pipedriveService: PipedriveService,
      private readonly blingService: BlingService,
      private readonly managerService: ManagerService
    ) { }

  @Get()
  async PipedriveToBling() {
    const deals = await this.pipedriveService.getDeals();
    deals.forEach(async (deal: IDeal) => {
      const order = await this.blingService.insertOrder(deal);
      order && this.insertDeal(order, deal);
    });
  }

  @Get('orders')
  async getAllOrders() {
    return this.managerService.findAll();
  }

  async insertDeal({ pedido }: any, deal: IDeal) {
    const newOrder: IOrder = {
      orderId: pedido.idPedido,
      number: pedido.numero,
      clientName: deal.name,
      orderTitle: deal.title,
      value: deal.value
    };
    this.managerService.create(newOrder);
  }

}
