import { Image } from '@common/interfaces';
import { ImageSchema } from '@database/mongodb';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {

    @Prop()
    id?: string;

    @Prop({ required: true, unique: true, trim: true })
    username: string;

    @Prop({ required: true, unique: true, trim: true, lowercase: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: ImageSchema })
    image: Image;

    @Prop({ type: [String], enum: ['user', 'admin', 'superadmin'], default: 'user' })
    roles: string[];

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ default: new Date().toISOString() })
    createdAt: string;

    @Prop({ default: new Date().toISOString() })
    updatedAt: string;

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

