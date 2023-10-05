// Import Engine Modules
import { Schema, model } from 'mongoose';

// Import Competitions Students Resources For Stable Work
import CompetitionsStudent from '@/resources/competitions/competitionsStudent/competitionsStudent.interface';

// Creating a custom schema for the future model in the database
const CompetitionsStudentSchema = new Schema(
    {
        // Required Data
        competitions: { type: Schema.Types.ObjectId, ref: "Competitions" },
        client: { type: Schema.Types.ObjectId, ref: 'Client' },
        disciplines: { type: String },

        // Additional Data
        comment: { type: String, trim: true }
    },
    { timestamps: true }
);

export default model<CompetitionsStudent>('CompetitionsStudent', CompetitionsStudentSchema);
