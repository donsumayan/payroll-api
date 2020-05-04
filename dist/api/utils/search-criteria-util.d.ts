import { FindManyOptions } from 'typeorm';
export declare abstract class SearchCriteriaUtil {
    static createCriteria(query: any): FindManyOptions<any>;
}
