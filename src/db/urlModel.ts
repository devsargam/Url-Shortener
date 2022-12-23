import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
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

export default mongoose.model("url", urlSchema);