// Import Engine Modules
import { Schema, model } from 'mongoose';

// Import Groups Resources For Stable Work
import StudentGroup from '@/resources/studentGroup/studentGroup.inteface';

// Идея заключается в отметке даты и пуша Пользователей, которые были в эту дату

// Модель посещений
const StudentGroupSchema = new Schema({
    dateName: { type: String },
    group: { type: Schema.Types.ObjectId, ref: 'Group' },
    student: { type: Schema.Types.ObjectId, ref: 'Client' },
    visited: { type: Boolean, default: false }
});

export default model<StudentGroup>('StudentGroup', StudentGroupSchema);
