import { Document } from 'mongoose';

export default interface CompetitionsStudent extends Document {
    // Required Data
    competitions: string | object;
    client: string | object;
    disciplines: string;

    // Additional Data
    comment: string;
}
