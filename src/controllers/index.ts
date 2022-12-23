import { Request, Response } from 'express';
import {
  getAllUrlsFromDb,
  findUrlsWithRedirect,
  findUrlsWithUrl,
  createNewShorturlwithUrl,
} from '../db';

export function getAllUrls(req: Request, res: Response) {
    res.send(getAllUrlsFromDb());
}

export function shortenUrl(req: Request, res: Response) {}

export async function deleteUrl(req: Request, res: Request) {}

export async function redirectToFull() {}
