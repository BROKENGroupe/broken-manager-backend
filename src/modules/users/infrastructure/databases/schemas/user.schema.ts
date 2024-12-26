import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Interfaz para el documento de Usuario
export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop()
    id?: string;

    @Prop({ required: true, unique: true, trim: true })
    username: string;

    @Prop({ required: true, unique: true, trim: true, lowercase: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ enum: ['user', 'admin', 'superadmin'], default: 'user' })
    role: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({
        type: {
            firstName: { type: String },
            lastName: { type: String },
            avatar: { type: String },
            phone: { type: String },
            address: { type: String },
        },
    })
    profile: {
        firstName: string;
        lastName: string;
        avatar: string;
        phone: string;
        address: string;
    };
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
    versionKey: false,
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
    },
});

UserSchema.set('toObject', {
    versionKey: false,
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
    },
});

