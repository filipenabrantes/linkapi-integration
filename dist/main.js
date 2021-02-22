"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Pidrive 🔗 Bling integration')
        .setDescription('APIs integration - Pipedrive and Bling')
        .setVersion('1.0')
        .addTag('order')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT || 3000);
    common_1.Logger.log(`🔥 Server running on port ${process.env.PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map