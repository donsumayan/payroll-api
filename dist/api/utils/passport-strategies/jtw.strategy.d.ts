import { Strategy } from 'passport-jwt';
import { UserEntity } from '../../entity/user.entity';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: UserEntity): Promise<UserEntity>;
}
export {};
