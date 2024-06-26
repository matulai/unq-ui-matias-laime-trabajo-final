import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import combineArraysToObjectIdOption from '../../utils/constants.js';
import api from '../../utils/api.js';

const ResultPage = () => {
  const params = useParams();
  const answers = params.answers.split(',');
  const questionsIds = params.questionsIds.split(',');
  const navigate = useNavigate();
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
  const [numberOfIncorrectAnswers, setNumberOfIncorrectAnswers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const QAObject = combineArraysToObjectIdOption(questionsIds, answers);

  // TODO: Refactor this useEffect to use Promise.all
  // TODO: NO PASAR LOS IDs DE LAS PREGUNTAS Y RESPUESTAS POR LA URL
  useEffect(() => {
    // QAObject.forEach((QA) => {
    //   api.verifyAnswerOfQuestion(QA.id, QA.option).then((data) => {
    //     console.log(data);
    //     setNumberOfCorrectAnswers((prev) => prev + data.answer);
    //     setNumberOfIncorrectAnswers((prev) => prev + !data.answer);
    //     setIsLoading(false);
    //   });
    // });
    const promises = QAObject.map((QA) =>
      api.verifyAnswerOfQuestion(QA.id, QA.option)
    );

    Promise.all(promises).then((data) => {
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
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <div>
          <h1>Results</h1>
          <p>Correct answers: {numberOfCorrectAnswers}</p>
          <p>Incorrect answers: {numberOfIncorrectAnswers}</p>
        </div>
        <button onClick={handlePlayAgain}>Play again</button>
      </div>
    </>
  );
};

export default ResultPage;
