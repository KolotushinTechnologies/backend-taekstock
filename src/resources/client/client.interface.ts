import { Document } from 'mongoose';

export default interface Client extends Document {
    // Required Data
    fullname: string;
    branch: string | object;
    group: string | object;
    dateBirth: Date;
    clientStatus: string;

    // Optional Data
    firstName: string;
    firstPhoneNumber: string;
    secondName: string;
    secondPhoneNumber: string;
    gender: string;
    weight: string;
    gip: string;
    rank: string;
    certificateFrom: Date;
    insuranceUpTo: Date;
    athletePassport: string;
    userId: string | object;

    // Additional Data
    comment: string;
}
