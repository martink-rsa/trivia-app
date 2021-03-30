"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const schedule = require("node-schedule");
const QUESTIONS_SERVER_URL = process.env.QUESTIONS_SERVER_URL;
/**
 * Holds all the topics and questions as well as provides getters
 * for the topics, only topics and questions
 */
const Topics = () => {
    let topics = [];
    const getTopics = () => topics;
    const getOnlyTopics = () => Object.keys(topics).map((topic) => ({
        id: topic,
        title: topics[topic].title,
    }));
    const getQuestions = (topic) => { var _a; return (_a = topics[topic]) === null || _a === void 0 ? void 0 : _a.questions; };
    /**
     * Gets the list of topics from the Questions API
     * @param {string} url The endpoint for the Questions API
     * @returns {array} An array of topic objects
     */
    const updateTopics = () => {
        axios_1.default
            .get(`${QUESTIONS_SERVER_URL}/topics`)
            .then((response) => {
            topics = response.data.topics;
        })
            .catch((error) => {
            console.log(error);
            throw new Error('Unable to get trivia tasks');
        });
    };
    return { getTopics, getOnlyTopics, getQuestions, updateTopics };
};
const topics = Topics();
topics.updateTopics();
schedule.scheduleJob('0 0 * * *', function () {
    topics.updateTopics();
});
exports.default = topics;
//# sourceMappingURL=topics.js.map