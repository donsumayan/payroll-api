export declare class PaginatedResponseDTO<T> {
    pageNo?: number;
    pageSize?: number;
    pageItems?: T[];
    totalItems?: number;
    constructor(obj: PaginatedResponseDTO<T>);
}
