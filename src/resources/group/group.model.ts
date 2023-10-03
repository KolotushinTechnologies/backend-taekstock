// Import Engine Modules
import { Schema, model } from 'mongoose';

// Import Groups Resources For Stable Work
import Group from '@/resources/group/group.interface';

// Creating a custom schema for the future model in the database
const GroupSchema = new Schema(
    {
        // Required Data
        branch: { type: Schema.Types.ObjectId, ref: 'Branch' },
        name: { type: String, trim: true },
        coach: { type: Schema.Types.ObjectId, ref: 'User' },
        timetable: { type: [String], trim: true },
        potential: { type: String, trim: true },

        students: [{ type: Schema.Types.ObjectId, ref: 'Client'}],
        visitedStudents: [{ type: Schema.Types.ObjectId, ref: 'StudentGroup' }],

        // Additional Data
        comment: { type: String, trim: true }
    },
    { timestamps: true }
);

export default model<Group>('Group', GroupSchema);
