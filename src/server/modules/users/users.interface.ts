import { Document } from 'mongoose';

export interface IUserDocument extends Document {
    username: string,
    password: string,
    email: string,
    createdAt: number,
    updatedAt: number
}