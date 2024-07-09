import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import Results from '../../components/Results';
import api from '../../utils/api.js';
import './QuestionsPage.css';

const QuestionsPage = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentOptionId, setCurrentOptions] = useState(0);
  const [seeResults, setSeeResults] = useState(false);

  const [isAnswered, setIsAnswered] = useState(false);
  const [correctOptionId, setCorrectOptionId] = useState(100);
  const [choosedOption, setChoosedOption] = useState('');

  useEffect(() => {
    api.getQuestionsWithDifficulty(params.difficulty).then((data) => {
      setQuestions(data);
      setIsLoading(false);
    });
  }, [params]);

  const handleNextQuestion = (answer) => {
    setAnswers((prevAnswers) => [...prevAnswers, answer]);
    if (questions.length - 1 === currentQuestionIndex) {
      setSeeResults(true);
    } else {
      setCurrentOptions((prevOptionId) => prevOptionId + 4);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const temp = async (item) => {
    setIsAnswered(true);
    await api
      .verifyAnswerOfQuestion(questions[currentQuestionIndex].id, item.string)
      .then((data) => {
        if (data.answer) {
          setCorrectOptionId(item.id);
        }
        setChoosedOption(item.string);
      });
    setTimeout(() => {
      setChoosedOption('');
      setCorrectOptionId(100);
      handleNextQuestion(item.string);
      setIsAnswered(false);
    }, 1000);
  };

  if (isLoading) {
    return <Spinner />;
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
    <div className="questionspage-page-box">
      {seeResults ? (
        <Results
          questionsIds={questions.map((it) => it.id)}
          answers={answers}
        />
      ) : (
        <div className="questionspage-container">
          <div className="questionspage-question">
            <h2>{questions[currentQuestionIndex].question}</h2>
          </div>
          <div className="questionspage-question-options">
            {options.map((item) => (
              <button
                className={`questionspage-option-button 
                  ${item.id == correctOptionId ? 'correct' : ''}
                  ${choosedOption == item.string && item.id != correctOptionId ? 'incorrect' : ''}`}
                key={item.id}
                onClick={() => temp(item)}
                disabled={isAnswered}
              >
                {item.option.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionsPage;
