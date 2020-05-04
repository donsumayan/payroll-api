export class PaginatedResponseDTO<T> {
  pageNo?: number;
  pageSize?: number;
  pageItems?: T[];
  totalItems?: number;

  constructor(obj: PaginatedResponseDTO<T>) {
    const { pageNo, pageSize, pageItems, totalItems } = obj;
    this.pageNo = pageNo;
    this.pageSize = pageSize;
    this.pageItems = pageItems;
    this.totalItems = totalItems;
  }
}
