import { Document } from 'mongoose';

export default interface Paymnet extends Document {
    fullname: string;
    type: string;
    email: string;
    phoneNumber: string;
    coach: string;
    transactionId: string;
    amount: string;
    description: string;
    status: string;

    userId: string | object;
    userStatus: string;
    paymentPlace: string;
}
