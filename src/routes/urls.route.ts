import { Router } from 'express';
import {
  deleteUrl,
  getAllUrls,
  shortenUrl,
} from '../controllers/urls.controller';

export const router = Router();

router.get('/', getAllUrls);
router.post('/', shortenUrl);
router.delete('/:id', deleteUrl);
