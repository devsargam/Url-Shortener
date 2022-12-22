import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { randomBytes } from 'crypto';
import UrlModel from './models/url';
import { isValidURL } from './utils/checkUrl';

dotenv.config();

mongoose.connect(process.env.MONGO_URL ?? "");

const app: Express = express();
app.use(express.json());
const port = process.env.PORT ?? 3000;

app.get('/api/get-urls', async (req: Request, res: Response) => {
  const urlQuery = await UrlModel.find({}, { _id: 0, __v: 0 });
  res.send(urlQuery);
});

app.post('/api/short-url', async (req: Request, res: Response) => {
  if (!isValidURL(req.body.url)) {
    return res.send('Invalid Url').status(300);
  }
  // If same url already exists, send user the previous redirect url
  const urlInDb = await UrlModel.find({ url: req.body.url });
  if (urlInDb) {
    return res.json({
      shorten: urlInDb[0].redirectTo,
    });
  }
  // For generating random string
  const shorten = randomBytes(5).toString('hex');
  const newUrl = await UrlModel.create({
    url: req.body.url,
  });
  await newUrl.save();
  res.json({
    shorten,
  });
});

app.delete('/api/delete/:redirectUrl', async (req, res) => {
  // Get the item id from the request parameters
  const redirectTo = req.params.redirectUrl;
  const url = await UrlModel.findOneAndDelete({ redirectTo: redirectTo });
  if (!url) {
    return res.status(404).send({ message: 'No item found' });
  }
  res.status(200).send({ message: 'Shorten url successfully deleted' });
});

app.get('*', async (req: Request, res: Response) => {
  console.log(req.url);
  const urlQuery = await UrlModel.where('redirectTo').equals(req.url.slice(1));
  if (urlQuery[0]?.url) {
    res.redirect(urlQuery[0]?.url);
    return;
  }
  res.status(400).send({ message: 'No redirect found for given url' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
