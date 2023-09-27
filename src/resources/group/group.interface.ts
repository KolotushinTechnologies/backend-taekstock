import { Document } from 'mongoose';

export default interface Group extends Document {
    // Required Data
    branch: string | object;
    name: string;
    coach: string | number;
    timetable: string[] | string;
    potential: string;

    // Additional Data
    comment: string;
}
