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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlingService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const deals_interface_1 = require("../pipedrive/interfaces/deals.interface");
const jsontoxml_1 = __importDefault(require("jsontoxml"));
const nestjs_redis_1 = require("nestjs-redis");
let BlingService = class BlingService {
    constructor(configService, httpService, redisService) {
        this.configService = configService;
        this.httpService = httpService;
        this.redisService = redisService;
    }
    async insertOrder(deal) {
        const cachedOrder = await this.redisService.getClient().get(deal.id);
        if (cachedOrder) {
            common_1.Logger.log('⚠️ Order already exists.');
            return;
        }
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
        const options = {
            params: {
                apikey: this.configService.get('BLING_TOKEN'),
                xml: jsontoxml_1.default(order)
            }
        };
        const URL = `${this.configService.get('BLING_URL')}/pedido/json`;
        const { data: data } = await this.httpService.post(URL, null, options).toPromise();
        await this.redisService.getClient().set(deal.id, deal.title);
        if (!data.retorno.erros) {
            return data.retorno.pedidos[0];
        }
        common_1.Logger.log(data.retorno.erros[0]);
    }
};
BlingService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        common_1.HttpService,
        nestjs_redis_1.RedisService])
], BlingService);
exports.BlingService = BlingService;
//# sourceMappingURL=bling.service.js.map