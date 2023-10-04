// Import Engine Modules
import { Schema, model } from 'mongoose';

// Import Certifications Resources For Stable Work
import Certification from '@/resources/certification/certification.interface';

// Creating a custom schema for the future model in the database
const CertificationSchema = new Schema(
    {
        // Required Data
        name: { type: String, trim: true, required: true },
        dateFrom: { type: Date, required: true },
        dateTo: { type: Date, required: true },

        students: [{ type: Schema.Types.ObjectId, ref: 'CertificationStudent' }],

        // Additional Data
        comment: { type: String, trim: true }
    },
    { timestamps: true }
);

export default model<Certification>('Certification', CertificationSchema);
