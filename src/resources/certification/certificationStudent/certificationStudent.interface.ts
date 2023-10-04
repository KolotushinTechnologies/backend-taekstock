import { Document } from 'mongoose';

export default interface CertificationStudent extends Document {
    // Required Data
    certification: string | object;
    client: string | object;
    gipFrom: string;
    gipTo: string;

    // Additional Data
    comment: string;
}
