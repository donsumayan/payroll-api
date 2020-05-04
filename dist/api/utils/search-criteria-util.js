"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class SearchCriteriaUtil {
    static createCriteria(query) {
        let searchCriteria = {};
        const { pageNo = 1, pageSize = 10, filter = '', relations = '' } = query;
        let { sort, orderBy } = query;
        const skip = pageNo ? (+pageNo - 1) * pageSize : 0;
        const take = pageSize || 25;
        orderBy = orderBy || 'createTime';
        sort = sort ? sort.toUpperCase() : 'ASC';
        const order = { [orderBy]: sort };
        let where = {
            isDeleted: 0,
        };
        if (filter) {
            const filters = filter
                .split(',')
                .map(f => f.split('|'))
                .reduce((o, [column, value]) => (Object.assign(Object.assign({}, o), { [column]: typeorm_1.Like(`%${value}%`) })), {});
            where = Object.assign(Object.assign({}, where), filters);
        }
        if (relations) {
            searchCriteria['relations'] = relations.split(',');
        }
        searchCriteria = Object.assign(Object.assign({}, searchCriteria), { skip, take, where, order });
        return searchCriteria;
    }
}
exports.SearchCriteriaUtil = SearchCriteriaUtil;
//# sourceMappingURL=search-criteria-util.js.map