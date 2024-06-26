import axios from 'axios';

const API_URL = 'https://preguntados-api.vercel.app/api';

const getDifficultys = () =>
  axios.get(`${API_URL}/difficulty`).then((response) => response.data);

const getQuestionsWithDifficulty = (difficulty) =>
  axios
    .get(`${API_URL}/questions?difficulty=${difficulty}`)
    .then((response) => response.data);

const verifyAnswerOfQuestion = (id, answer) =>
  axios
    .post(`${API_URL}/answer`, { questionId: id, option: answer })
    .then((response) => response.data);

export default {
  getDifficultys,
  getQuestionsWithDifficulty,
  verifyAnswerOfQuestion,
};
