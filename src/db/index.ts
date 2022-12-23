import mongoose from 'mongoose';
import UrlModel from './urlModel';
import dotenv from 'dotenv';
import { randomBytes } from 'crypto';

dotenv.config();
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL ?? '');

interface Url {
  redirectTo: String;
  url: String;
}

export async function getAllUrlsFromDb(): Promise<Url[]> {
  return await UrlModel.find({}, { _id: 0, __v: 0 });
}
getAllUrlsFromDb().then(arr => console.log(arr))

export async function findUrlsWithUrl(url: String) {
  return await UrlModel.find({ url });
}

export async function findUrlsWithRedirect(redirect: String) {
  return await UrlModel.find({ redirectTo: redirect });
}

export async function createNewShorturlwithUrl(url: String) {
  const redirectTo = randomBytes(5).toString('hex');
  const newUrl = await UrlModel.create({
    url,
    redirectTo,
  });
  await newUrl.save();
}

export async function deleteUrlWithRedirect(redirectTo: String) {
  const url = await UrlModel.findOneAndDelete({ redirectTo: redirectTo });
  return !!url;
}
