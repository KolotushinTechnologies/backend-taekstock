import { Document } from 'mongoose';

export default interface Branch extends Document {
    // Required Data
    name: string;
    typeRent: string;
    priceRent: string | number;

    groups: string[] | object[] | string | object;

    // Additional Data
    comment: string;
}
