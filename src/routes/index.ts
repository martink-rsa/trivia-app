import * as express from 'express';
import Topics from '../utils/topicsController';
const router = express.Router();

router.get(
  '/status',
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const topics = Topics.getOnlyTopics();
    res.status(200).send({ message: 'Server is live', topics: topics });
  }
);

module.exports = router;
