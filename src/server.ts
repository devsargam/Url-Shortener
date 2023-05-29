import express from 'express';
import {
  deleteUrl,
  getAllUrls,
  redirectToFull,
  shortenUrl,
} from './controllers/';

const app = express();
app.use(express.json());
const PORT = process.env.PORT ?? 3000;
const API_URL = process.env.API_URL ?? '';

app.get(`${API_URL}/urls`, getAllUrls);
app.post(`${API_URL}/urls`, shortenUrl);
app.delete(`${API_URL}/urls/:redirectUrl`, deleteUrl);
app.get(`*`, redirectToFull);

app.listen(PORT, () => {
  console.log(`Server on PORT:${PORT}`);
});
