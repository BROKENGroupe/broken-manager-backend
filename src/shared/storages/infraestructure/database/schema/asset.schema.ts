import { IAsset } from '@common/interfaces';
import { ImageSchema } from '@database/mongodb';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Asset extends Document {

    @Prop()
    id?: string;

    @Prop()
    assetId: string;

    @Prop()
    refId?: string;

    @Prop()
    ext: string;

    @Prop()
    name: string;

    @Prop()
    size: number;

    @Prop({ type: ImageSchema })
    asset: IAsset;

    @Prop({ default: new Date().toISOString() })
    createdAt: string;

    @Prop({ default: new Date().toISOString() })
    updatedAt: string;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);

AssetSchema.set('toJSON', {
    versionKey: false,
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
    },
});

AssetSchema.set('toObject', {
    versionKey: false,
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
    },
});