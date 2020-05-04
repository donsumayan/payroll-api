import { isDate, isObject } from 'lodash';
import { isArray } from 'util';

export abstract class FieldMapper {
  static populateUserToFields<T, D>(obj: {}, values: {}) {
    let newObj = { ...obj, ...values };
    for (const key in newObj) {
      if (isDate(obj[key])) {
        // do nothing
      } else if (isArray(obj[key])) {
        newObj = {
          ...newObj,
          [key]: obj[key].map(arrValue => {
            const newVal = this.populateUserToFields(arrValue, values);

            if (!newVal['createBy']) {
              newVal['createBy'] = newVal['updateBy'];
            }

            return newVal;
          }),
        };
      } else if (isObject(obj[key])) {
        newObj = {
          ...newObj,
          [key]: this.populateUserToFields(obj[key], values),
        };

        if (!newObj[key]['createBy']) {
          newObj[key]['createBy'] = newObj[key]['updateBy'];
        }
      }
    }
    return newObj;
  }
}
