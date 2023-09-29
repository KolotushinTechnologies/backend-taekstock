// Import Engine Modules
import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

// Import Clients Resources For Stable Work
import Branch from '@/resources/branch/branch.interface';

// Creating a custom schema for the future model in the database
const BranchSchema = new Schema(
    {
        // Required Data
        name: { type: String, trim: true, rquired: true },
        typeRent: { type: String, trim: true },
        priceRent: { type: String, trim: true },

        groups: [{ type: Schema.Types.ObjectId, ref: "Group" }],

        // Additional Data
        comment: { type: String, trim: true }
    },
    { timestamps: true }
);

BranchSchema.plugin(uniqueValidator, { message: '{PATH} is already exists!' });

export default model<Branch>('Branch', BranchSchema);
