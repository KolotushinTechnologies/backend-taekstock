// Import Engine Modules
import { Schema, model } from 'mongoose';

// Import Camps Students Resources For Stable Work
import CampStudent from '@/resources/camps/campStudent/campStudent.interface';

// Creating a custom schema for the future model in the database
const CampStudentSchema = new Schema(
    {
        // Required Data
        camp: { type: Schema.Types.ObjectId, ref: "Camp" },
        client: { type: Schema.Types.ObjectId, ref: 'Client' },
        externalClient: { type: String },
        dateBirth: { type: String },
        phoneNumber: { type: String },

        // Additional Data
        comment: { type: String, trim: true }
    },
    { timestamps: true }
);

export default model<CampStudent>('CampStudent', CampStudentSchema);
