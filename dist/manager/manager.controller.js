"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerController = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const bling_service_1 = require("../bling/bling.service");
const deals_interface_1 = require("../pipedrive/interfaces/deals.interface");
const pipedrive_service_1 = require("../pipedrive/pipedrive.service");
const manager_service_1 = require("./manager.service");
let ManagerController = class ManagerController {
    constructor(pipedriveService, blingService, managerService) {
        this.pipedriveService = pipedriveService;
        this.blingService = blingService;
        this.managerService = managerService;
    }
    async PipedriveToBling() {
        const deals = await this.pipedriveService.getDeals();
        deals.forEach(async (deal) => {
            const order = await this.blingService.insertOrder(deal);
            order && this.insertDeal(order, deal);
        });
    }
    async getAllOrders() {
        return this.managerService.findAll();
    }
    async syncAPIs() {
        try {
            await this.PipedriveToBling();
            return { msg: 'Data has been synchronized' };
        }
        catch (error) {
            return {
                error: 'an error has occurred',
                reason: error
            };
        }
    }
    async insertDeal({ pedido }, deal) {
        const newOrder = {
            orderId: pedido.idPedido,
            number: pedido.numero,
            clientName: deal.name,
            orderTitle: deal.title,
            value: deal.value
        };
        this.managerService.create(newOrder);
    }
};
__decorate([
    common_1.Get('orders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ManagerController.prototype, "getAllOrders", null);
__decorate([
    common_1.Get('sync'),
    schedule_1.Cron(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ManagerController.prototype, "syncAPIs", null);
ManagerController = __decorate([
    common_1.Controller('manager'),
    __metadata("design:paramtypes", [pipedrive_service_1.PipedriveService,
        bling_service_1.BlingService,
        manager_service_1.ManagerService])
], ManagerController);
exports.ManagerController = ManagerController;
//# sourceMappingURL=manager.controller.js.map