import express from 'express';
import { router } from './routes';
import { redirectToFull } from './controllers';

const app = express();
app.use(express.json());
const PORT = process.env.PORT ?? 3000;

app.use('/api/urls', router);
app.get('*', redirectToFull);

app.listen(PORT, () => {
  console.log(`Server on PORT:${PORT}`);
});
