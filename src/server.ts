import express from 'express';
import morgan from 'morgan';

import { router } from './routes';
import { redirectToFull } from './controllers';

const app = express();
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT ?? 3000;

app.use('/api/urls', router);
app.get('*', redirectToFull);

app.listen(PORT, () => {
  console.log(`Server on PORT:${PORT}`);
});
