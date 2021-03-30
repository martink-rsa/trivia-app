"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const topicsController_1 = require("../utils/topicsController");
const router = express.Router();
router.get('/status', async (req, res, next) => {
    const topics = topicsController_1.default.getOnlyTopics();
    res.status(200).send({ message: 'Server is live', topics: topics });
});
module.exports = router;
//# sourceMappingURL=index.js.map