export declare class ResponseDTO<T> {
    message: string;
    content: T;
    status: number;
    constructor(message: string, content: T, status: number);
}
