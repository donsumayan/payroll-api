"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.Action = (...a) => common_1.SetMetadata('action', a);
exports.Feature = (...f) => common_1.SetMetadata('feature', f);
//# sourceMappingURL=action.decorators.js.map