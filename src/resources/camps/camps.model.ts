// Import Engine Modules
import { Schema, model } from 'mongoose';

// Import Camps Resources For Stable Work
import Camp from '@/resources/camps/camps.interface';

// Creating a custom schema for the future model in the database
const CampSchema = new Schema(
    {
        // Required Data
        name: { type: String, trim: true, required: true },

        students: [{ type: Schema.Types.ObjectId, ref: 'CampStudent' }],

        // Additional Data
        comment: { type: String, trim: true }
    },
    { timestamps: true }
);

export default model<Camp>('Camp', CampSchema);
