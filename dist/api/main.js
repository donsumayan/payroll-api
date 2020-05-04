"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const PORT = process.env.PORT || 3001;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: true,
        credentials: true,
    });
    await app.listen(PORT);
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
    common_1.Logger.log(`API Started on port: ${PORT}`, 'PAYROLL API');
}
bootstrap();
//# sourceMappingURL=main.js.map