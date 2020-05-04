import { HttpService } from '@nestjs/common';
import { ResponseDTO } from '../dto/response.dto';
export declare class AppController {
    private httpService;
    constructor(httpService: HttpService);
    ping(): ResponseDTO<string>;
    datetime(): Promise<ResponseDTO<any>>;
}
