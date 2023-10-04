import { Document } from 'mongoose';

export default interface Certification extends Document {
    // Required Data
    name: string;
    dateFrom: Date;
    dateTo: Date;

    students: object[];

    // Additional Data
    comment: string;
}
