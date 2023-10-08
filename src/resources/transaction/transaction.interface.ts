import { Document } from 'mongoose';

export default interface Paymnet extends Document {
    transactionId: string;
    amount: string;
    description: string;
    status: string;
}
