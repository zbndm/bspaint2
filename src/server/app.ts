import path from 'path';
import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import HttpException from './exceptions/HttpException';

// const morgan = require('morgan');
const app = express();

// logging middleware
// app.use(morgan('dev'));

// body parsing middleware
app.use(express.json());

// auth and api routes
// app.use('/auth', require('./auth'));
// app.use('/api', require('./api'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
);

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new HttpException(404, 'Not found');
    next(err);
  } else {
    next();
  }
});

// // sends index.html
// app.use('*', (req, res) => {
//   const htmlpath = path.join(__dirname, '..', '..', 'public', 'index.html');
//   res.sendFile(htmlpath);
// });

// error handling endware
app.use(
  (err: HttpException, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  }
);

export default app;
