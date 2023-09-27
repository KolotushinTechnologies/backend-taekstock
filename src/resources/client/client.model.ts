// Import Engine Modules
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

// Import Clients Resources For Stable Work
import Client from '@/resources/client/client.interface';

// Creating a custom schema for the future model in the database
const ClientSchema = new Schema(
    {
        // Required Data
        fullname: { type: String, trim: true, rquired: true },
        branch: { type: Schema.Types.ObjectId, ref: 'Branch', trim: true }, // Филиал
        group: { type: Schema.Types.ObjectId, ref: 'Group', trim: true }, // Группа
        dateBirth: { type: String, trim: true, rquired: true },
        clientStatus: { type: String, trim: true, rquired: true },

        // Optional Data
        firstName: { type: String, trim: true },
        firstPhoneNumber: { type: String, trim: true },
        secondName: { type: String, trim: true },
        secondPhoneNumber: { type: String, trim: true },
        gender: { type: String, trim: true },
        weight: { type: String, trim: true },
        gip: { type: String, trim: true },
        rank: { type: String, trim: true },
        certificateFrom: { type: Date },
        insuranceUpTo: { type: Date },
        athletePassport: { type: String, trim: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User' }, // Здесь будет ссылка на Пользователя, при условии, что спортсмен ходит постоянно

        // Additional Data
        comment: { type: String, trim: true }
    },
    { timestamps: true }
);

export default model<Client>('Client', ClientSchema);
