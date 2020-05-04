export declare function saltHashPassword(userpassword: string): {
    salt: string;
    password: string;
};
export declare function getPaswordHash(pass: string, salt: string): string;
