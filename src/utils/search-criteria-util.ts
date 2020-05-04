import { FindManyOptions, Like } from 'typeorm';

export abstract class SearchCriteriaUtil {
  static createCriteria(query: any) {
    let searchCriteria: FindManyOptions = {};
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
        .reduce(
          (o, [column, value]) => ({
            ...o,
            [column]: Like(`%${value}%`),
          }),
          {}
        );
      where = { ...where, ...filters };
    }

    if (relations) {
      searchCriteria['relations'] = relations.split(',');
    }

    searchCriteria = { ...searchCriteria, skip, take, where, order };
    return searchCriteria;
  }
}
