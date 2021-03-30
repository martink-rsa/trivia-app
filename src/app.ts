import * as http from 'http';
import * as express from 'express';
require('./db/mongoose');

// Routes
const index = require('./routes/index');

const app = express();
app.use(express.json());

http.createServer(app);

app.use(function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

app.use(index);

export default app;
