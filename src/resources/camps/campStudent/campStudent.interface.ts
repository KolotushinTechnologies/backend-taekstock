import { Document } from 'mongoose';

export default interface CampStudent extends Document {
    // Required Data
    camp: string | object;
    client: string | object;
    externalClient: string;
    dateBirth: string;
    phoneNumber: string;

    // Additional Data
    comment: string;
}
