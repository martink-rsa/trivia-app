import axios from 'axios';
import * as schedule from 'node-schedule';

const QUESTIONS_SERVER_URL = process.env.QUESTIONS_SERVER_URL;

type Topic = {
  id: number;
  title: string;
  questions: any;
};

type Topics = {
  [key: string]: Topic;
};

/**
 * Holds all the topics and questions as well as provides getters
 * for getting topics, only the topics and only the questions
 */
const TopicsController = () => {
  let topics: Topics = {};

  const getTopics = () => topics;

  const getOnlyTopics = () =>
    Object.keys(topics).map((topic) => ({
      id: topic,
      title: topics[topic].title,
    }));

  const getQuestions = (topic: string) => topics[topic]?.questions;

  /**
   * Gets the list of topics from the Questions API
   * @param {string} url The endpoint for the Questions API
   * @returns {array} An array of topic objects
   */
  const updateTopics = () => {
    axios
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

const topics = TopicsController();
topics.updateTopics();

// Runs the job once every day, which results in the topics being updated
//    every day
schedule.scheduleJob('0 0 * * *', function () {
  topics.updateTopics();
});

export default topics;
