import mongoose, { Document, Model, mongo, Schema } from 'mongoose';

interface urlInterface extends Document {
  url: string;
  redirectTo: string;
}

interface urlModel extends Model<urlInterface> {
  save(url: string): string;
}

const urlSchema: Schema<urlInterface> = new mongoose.Schema({
  redirectTo: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
    lowarcase: true,
    unique: true,
  },
});

export const UrlModel = mongoose.model<urlInterface, urlModel>(
  'url',
  urlSchema
);
