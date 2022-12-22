import mongoose from 'mongoose';
import { randomBytes } from 'crypto';

const urlSchema = new mongoose.Schema({
  redirectTo: {
    type: String,
    required: true,
    unique: true,
    default: randomBytes(5).toString('hex'),
  },
  url: {
    type: String,
    required: true,
    lowarcase: true,
    unique: true,
  },
});

export default mongoose.model("url", urlSchema);
