"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const util_1 = require("util");
class FieldMapper {
    static populateUserToFields(obj, values) {
        let newObj = Object.assign(Object.assign({}, obj), values);
        for (const key in newObj) {
            if (lodash_1.isDate(obj[key])) {
            }
            else if (util_1.isArray(obj[key])) {
                newObj = Object.assign(Object.assign({}, newObj), { [key]: obj[key].map(arrValue => {
                        const newVal = this.populateUserToFields(arrValue, values);
                        if (!newVal['createBy']) {
                            newVal['createBy'] = newVal['updateBy'];
                        }
                        return newVal;
                    }) });
            }
            else if (lodash_1.isObject(obj[key])) {
                newObj = Object.assign(Object.assign({}, newObj), { [key]: this.populateUserToFields(obj[key], values) });
                if (!newObj[key]['createBy']) {
                    newObj[key]['createBy'] = newObj[key]['updateBy'];
                }
            }
        }
        return newObj;
    }
}
exports.FieldMapper = FieldMapper;
//# sourceMappingURL=field-mapper.js.map