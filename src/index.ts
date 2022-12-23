import express from 'express';
import {
  deleteUrl,
  getAllUrls,
  redirectToFull,
  shortenUrl,
} from './controllers/';

const app = express();
const PORT = process.env.PORT ?? 3000;
const APIURL = process.env.API_URL ?? '';

app.get(`${APIURL}/get-urls`, getAllUrls);
app.post(`${APIURL}/short-url`, shortenUrl);
app.delete(`${APIURL}/delete/:redirectUrl`, deleteUrl);
app.get(`*`, redirectToFull);

app.listen(PORT, () => {
  console.log(`Server on PORT:${PORT}`);
});
