import { ActionType } from '../constant/action-type';
import { ACCESS } from '../constant/api-features';
import { BaseEntity } from './base.entity';
import { RoleEntity } from './role.entity';
export declare class RoleRestrictionsEntity extends BaseEntity {
    role: RoleEntity;
    feature: ACCESS;
    action: ActionType;
}
