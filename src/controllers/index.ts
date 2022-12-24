import { randomBytes } from 'crypto';
import { Request, Response } from 'express';
import { url } from 'inspector';
import {
  getAllUrlsFromDb,
  findUrlsWithRedirect,
  findUrlsWithUrl,
  createNewShorturlwithUrl,
} from '../db';
import { checkIfUrlIsValid } from '../utils';

export async function getAllUrls(req: Request, res: Response) {
  const allUrls = await getAllUrlsFromDb();
  res.send(allUrls);
}

export async function shortenUrl(req: Request, res: Response) {
  const url = req.body.url;
  if (!checkIfUrlIsValid(req.body.url)) {
    return res.send('Invalid Url').status(300);
  }
  const urlInDb = await findUrlsWithUrl(url); 
  if (urlInDb.length) {
    return res.json({
      shorten: urlInDb,
    });
  }
  console.log("Getting if the url is in db")
  // const shorten = randomBytes(5).toString('hex');
  const urlFromDb = await createNewShorturlwithUrl(url);
  console.log(urlFromDb);
  
  res.json({
    urlFromDb
  });
}

export async function deleteUrl(req: Request, res: Request) {}

export async function redirectToFull() {}
