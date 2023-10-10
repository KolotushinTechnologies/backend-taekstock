import { Document } from 'mongoose';

export default interface Camp extends Document {
    // Required Data
    name: string;

    students: object[];

    // Additional Data
    comment: string;
}
