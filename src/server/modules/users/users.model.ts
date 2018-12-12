import { Schema, Model, model } from 'mongoose';
import { IUserDocument } from './users.interface';
import * as bcrypt from 'bcrypt';
import { saltRounds } from '../../config';

const User = new Schema({
    socket: { type: String, default: '' },
    username: { type: String, required: true, index: { unique: true }},
    password: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true }},
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: Date.now }
});

User.pre<IUserDocument>('save', async function(next) {
    try {
        const hash = await bcrypt.hash(this.password, saltRounds);
        this.password = hash;
        next();
    } catch(e) {
        next(e);
    }
});

export default model<IUserDocument>('User', User);
