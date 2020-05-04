"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PaginatedResponseDTO {
    constructor(obj) {
        const { pageNo, pageSize, pageItems, totalItems } = obj;
        this.pageNo = pageNo;
        this.pageSize = pageSize;
        this.pageItems = pageItems;
        this.totalItems = totalItems;
    }
}
exports.PaginatedResponseDTO = PaginatedResponseDTO;
//# sourceMappingURL=paginated-response.dto.js.map