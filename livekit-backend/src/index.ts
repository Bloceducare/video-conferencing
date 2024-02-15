import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import errorhandler from 'errorhandler';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { env } from './config';
import routes from './routes';

const production = env.NODE_ENV === 'production';

const app = express();

app.use(helmet());
app.use(cookieParser());

app.use(morgan('dev'));
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.set('trust proxy', 1);

app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 50,
    message: 'Too many requests from this IP, please try again after an hour.',
  })
);

if (!production) {
  app.use(errorhandler());
}

app.use(express.static('assets'));
app.use('/v1', routes);

app.get('/', (req: Request, res: Response) => {
  res.send(!production ? 'test is up' : 'live is up');
});

app.all('/*', (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).send({
    success: false,
    message: 'Route not found',
  });
});

app.use((err: any, req: Request, res: Response) => {
  res.status(400).send({
    success: false,
    message: err.message,
  });
});

export default app;
