import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Results from '../../components/Results';
import api from '../../utils/api.js';

const QuestionsPage = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [currentOptionId, setCurrentOptions] = useState(0);
  const [seeResults, setSeeResults] = useState(false);

  useEffect(() => {
    api.getQuestionsWithDifficulty(params.difficulty).then((data) => {
      setQuestions(data);
      setIsLoading(false);
    });
  }, [params]);

  const handleChooseAnswer = (optionString) => {
    setAnswer(optionString);
  };

  const handleNextQuestion = () => {
    // crear modal para handlear errores
    if (!answer) {
      return;
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setCurrentOptions((prevOptionId) => prevOptionId + 4);
    setAnswers((prevAnswers) => [...prevAnswers, answer]);
    setAnswer('');
  };

  const handleFinishQuestions = () => {
    if (!answer) {
      return;
    }
    setAnswers((prevAnswers) => [...prevAnswers, answer]);
    setSeeResults(true);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  //  agrego indentificadores unicoa a las opciones para mejor performance.
  const options = [
    {
      id: currentOptionId,
      option: questions[currentQuestionIndex].option1,
      string: 'option1',
    },
    {
      id: currentOptionId + 1,
      option: questions[currentQuestionIndex].option2,
      string: 'option2',
    },
    {
      id: currentOptionId + 2,
      option: questions[currentQuestionIndex].option3,
      string: 'option3',
    },
    {
      id: currentOptionId + 3,
      option: questions[currentQuestionIndex].option4,
      string: 'option4',
    },
  ];

  return (
    <>
      {seeResults ? (
        <Results
          questionsIds={questions.map((it) => it.id)}
          answers={answers}
        />
      ) : (
        <div>
          <div>
            <h2>{questions[currentQuestionIndex].question}</h2>
          </div>
          <div>
            {options.map((item) => (
              <button
                key={item.id}
                onClick={() => handleChooseAnswer(item.string)}
              >
                {item.option}
              </button>
            ))}
          </div>
          {questions.length - 1 === currentQuestionIndex ? (
            <button onClick={handleFinishQuestions}>finish</button>
          ) : (
            <button onClick={handleNextQuestion}>next question</button>
          )}
        </div>
      )}
    </>
  );
};

export default QuestionsPage;
