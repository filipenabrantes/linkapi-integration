"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const schedule_1 = require("@nestjs/schedule");
const nestjs_redis_1 = require("nestjs-redis");
const manager_module_1 = require("./manager/manager.module");
const shared_module_1 = require("./shared/shared.module");
const configService = new config_1.ConfigService();
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env'],
            }),
            schedule_1.ScheduleModule.forRoot(),
            nestjs_redis_1.RedisModule.register({
                url: `redis://${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}?
        db=${configService.get('REDIS_DB')}&password=${configService.get('REDIS_PASSWORD')}`
            }),
            mongoose_1.MongooseModule.forRoot(configService.get('MONGO_SERVER')),
            manager_module_1.ManagerModule,
            shared_module_1.SharedModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map