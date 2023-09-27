// Import Engine Modules
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

// Import Users Resources For Stable Work
import User from '@/resources/user/user.interface';



// Dashboard => Users => Clients => More Functionality
// Ok
// app.greefon.com
// dashboard.greefon.com
// 


// Creating a custom schema for the future model in the database
const UserSchema = new Schema(
    {
        // Required Data
        username: { type: String, trim: true, required: true, unique: true },
        fullname: { type: String, trim: true, required: true },
        phoneNumber: { type: String, trim: true, required: true },
        status: { type: String, trim: true, required: true },
        password: { type: String, trim: true, required: true },
        roles: [{ type: String, trim: true, ref: 'Role', required: true }],

        // Optional Data
        email: { type: String, trim: true },
        dateBirth: { type: String, trim: true },
        gip: { type: String, trim: true },
        belt: { type: String, trim: true },
        city: { type: String, trim: true },
        images: { type: [String], trim: true },
        clientId: { type: Schema.Types.ObjectId, ref: 'Client' },

        // Additional Data
        comment: { type: String, trim: true },

        // Security Data
        secretCode: { type: String, trim: true, },
    },
    { timestamps: true }
);

// Hashing a user's password in a database model
UserSchema.pre<User>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;

    next();
});

// Validation to compare the user entered password in the query with the password in the database model
UserSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<User>('User', UserSchema);
