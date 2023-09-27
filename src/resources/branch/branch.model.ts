// Import Engine Modules
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

// Import Clients Resources For Stable Work
import Branch from '@/resources/branch/branch.interface';

// Creating a custom schema for the future model in the database
const BranchSchema = new Schema(
    {
        // Required Data
        name: { type: String, trim: true, rquired: true },
        typeRent: { type: String, trim: true },
        priceRent: { type: String, trim: true },

        // Additional Data
        comment: { type: String, trim: true }
    },
    { timestamps: true }
);

export default model<Branch>('Branch', BranchSchema);
