import { Document } from 'mongoose';

export default interface User extends Document {
    // Required Data
    username: string;
    fullname: string;
    phoneNumber: string;
    status: string;
    password: string;
    roles: string[];

    // Optional Data
    email: string;
    dateBirth: string;
    gip: string;
    belt: string;
    city: string;
    images: string[] | string;

    // Additional Data
    comment: string;

    // Security Data
    secretCode: string;

    isValidPassword(password: string): Promise<Error | boolean>;
}
