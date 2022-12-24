import { randomBytes } from 'crypto';
import { Request, Response } from 'express';
import {
  getAllUrlsFromDb,
  findUrlsWithRedirect,
  findUrlsWithUrl,
  createNewShorturl,
  deleteUrlWithRedirect,
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
    return res.json(urlInDb[0]);
  }
  const redirectTo = randomBytes(5).toString('hex');
  const urlFromDb = await createNewShorturl(url, redirectTo);
  res.json({
    url,
    redirectTo,
  });
}

export async function deleteUrl(req: Request, res: Response) {
  // Get the item id from the request parameters
  const redirectUrl = req.params.redirectUrl;
  const url = await deleteUrlWithRedirect(redirectUrl);
  if (!url) {
    return res.status(404).send({ message: 'No item found' });
  }
  res.status(200).send({ message: 'Shorten url successfully deleted' });
}

export async function redirectToFull(req: Request, res: Response) {
  const redirect = req.url.slice(1);
  const urlQuery = await findUrlsWithRedirect(redirect);
  if (urlQuery[0]?.url) {
    res.redirect(urlQuery[0]?.url);
    return;
  }
  res.status(400).send({ message: 'No redirect found for given url' });
}
