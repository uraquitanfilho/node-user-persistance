import './bootstrap';
import express from 'express';
import Youch from 'youch';
/** express-async-errors need to be imported before routes */
import 'express-async-errors';
import cors from 'cors';

import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.middewares();
    this.routes();
    this.exceptionHandler();
  }

  middewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal Server Error!' });
    });
  }
}

export default new App().server;
