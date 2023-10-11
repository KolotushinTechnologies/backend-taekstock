// Import Engine Modules
import { Schema, model } from 'mongoose';

// Import Transactions Resources For Stable Work
import Transaction from '@/resources/transaction/transaction.interface';

// Creating a custom schema for the future model in the database
const TransactionSchema = new Schema(
    {
        fullname: { type: String, trim: true },
        type: { type: String, trim: true },
        email: { type: String, trim: true },
        phoneNumber: { type: String, trim: true },
        coach: { type: String, trim: true },
        transactionId: { type: String, maxlength: 500, trim: true, required: true, unique: true },
        amount: { type: String, trim: true, required: true },
        description: { type: String, trim: true, required: true },
        status: { type: String, trim: true },

        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        userStatus: { type: String, trim: true },
        paymentPlace: { type: String, trim: true },
    },
    { timestamps: true }
);

TransactionSchema.index({ '$**' : 'text' });

export default model<Transaction>('Transaction', TransactionSchema);