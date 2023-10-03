import { Document } from 'mongoose';

export default interface StudentGroup extends Document {
    // Required Data
    dateName: string | Date;
    group: string | object;
    student: string | object;
    visited: boolean;
}
