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
exports.PipedriveService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let PipedriveService = class PipedriveService {
    constructor(configService, httpService) {
        this.configService = configService;
        this.httpService = httpService;
    }
    async getDeals() {
        const options = {
            params: {
                api_token: this.configService.get('PIPEDRIVE_TOKEN'),
                status: 'won',
            }
        };
        const { data: { data: data } } = await this.httpService.get(`${this.configService.get('PIPEDRIVE_URL')}/deals`, options).toPromise();
        if (data) {
            const deals = data.map((deal) => {
                return {
                    id: deal.id,
                    title: deal.title,
                    value: deal.value,
                    name: deal.person_id.name
                };
            });
            return deals;
        }
    }
};
PipedriveService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        common_1.HttpService])
], PipedriveService);
exports.PipedriveService = PipedriveService;
//# sourceMappingURL=pipedrive.service.js.map