import mongoose from "mongoose";

export const ImageSchema = new mongoose.Schema({
  src: { type: String },
  height: { type: Number },
  width: { type: Number },
  blurDataURL: { type: String },
  blurWidth: { type: Number },
  blurHeight: { type: Number },
});