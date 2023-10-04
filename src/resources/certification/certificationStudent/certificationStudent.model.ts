// Import Engine Modules
import { Schema, model } from 'mongoose';

// Import Certifications Students Resources For Stable Work
import CertificationStudent from '@/resources/certification/certificationStudent/certificationStudent.interface';

// Creating a custom schema for the future model in the database
const CertificationStudentSchema = new Schema(
    {
        // Required Data
        certification: { type: Schema.Types.ObjectId, ref: "Certification" },
        client: { type: Schema.Types.ObjectId, ref: 'Client' },
        gipFrom: { type: String },
        gipTo: { type: String },

        // Additional Data
        comment: { type: String, trim: true }
    },
    { timestamps: true }
);

export default model<CertificationStudent>('CertificationStudent', CertificationStudentSchema);
