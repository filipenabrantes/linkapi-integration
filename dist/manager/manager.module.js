"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bling_service_1 = require("../bling/bling.service");
const pipedrive_service_1 = require("../pipedrive/pipedrive.service");
const manager_controller_1 = require("./manager.controller");
const manager_service_1 = require("./manager.service");
const order_schema_1 = require("./schema/order.schema");
let ManagerModule = class ManagerModule {
};
ManagerModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: order_schema_1.Order.name, schema: order_schema_1.OrderSchema }])],
        controllers: [manager_controller_1.ManagerController],
        providers: [pipedrive_service_1.PipedriveService, bling_service_1.BlingService, manager_service_1.ManagerService]
    })
], ManagerModule);
exports.ManagerModule = ManagerModule;
//# sourceMappingURL=manager.module.js.map