import { ActionType } from '../constant/action-type';
import { ACCESS } from '../constant/api-features';
export declare const Action: (...a: ActionType[]) => import("@nestjs/common").CustomDecorator<string>;
export declare const Feature: (...f: ACCESS[]) => import("@nestjs/common").CustomDecorator<string>;
