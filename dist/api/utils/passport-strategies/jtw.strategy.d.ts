import { UserEntity } from '../../entity/user.entity';
declare const JwtStrategy_base: any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: UserEntity): Promise<UserEntity>;
}
export {};
