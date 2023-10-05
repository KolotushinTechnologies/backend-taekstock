// Import Engine Modules
import { Schema, model } from 'mongoose';

// Import Certifications Resources For Stable Work
import Competitions from '@/resources/competitions/competitions.interface';

// Creating a custom schema for the future model in the database
const CompetitionsSchema = new Schema(
    {
        // Required Data
        name: { type: String, trim: true, required: true },
        dateFrom: { type: Date, required: true },
        dateTo: { type: Date, required: true },

        students: [{ type: Schema.Types.ObjectId, ref: 'CompetitionsStudent' }],

        // Additional Data
        comment: { type: String, trim: true }
    },
    { timestamps: true }
);

export default model<Competitions>('Competitions', CompetitionsSchema);
