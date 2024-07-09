import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import combineArraysToObjectIdOption from '../../utils/constants.js';
import Spinner from '../Spinner';
import api from '../../utils/api.js';
import './Results.css';

// eslint-disable-next-line react/prop-types
const Results = ({ answers, questionsIds }) => {
  const navigate = useNavigate();
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
  const [numberOfIncorrectAnswers, setNumberOfIncorrectAnswers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const QAObject = combineArraysToObjectIdOption(questionsIds, answers);

  // TODO: Refactor this useEffect to use Promise.all
  useEffect(() => {
    const promises = QAObject.map((QA) =>
      api.verifyAnswerOfQuestion(QA.id, QA.option)
    );

    Promise.all(promises).then((data) => {
      console.log(data);
      data.forEach((item) => {
        setNumberOfCorrectAnswers((prev) => prev + item.answer);
        setNumberOfIncorrectAnswers((prev) => prev + !item.answer);
      });
      setIsLoading(false);
    });
  }, []);

  const handlePlayAgain = () => {
    navigate('/');
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="results-container">
        <div className="results-questions-stadistics">
          <h1>Results</h1>
          <p>
            Correct answers: {numberOfCorrectAnswers} <br />
            Incorrect answers: {numberOfIncorrectAnswers}
          </p>
        </div>
        <button className="results-button" onClick={handlePlayAgain}>
          PLAY AGAIN
        </button>
      </div>
    </>
  );
};

export default Results;
