import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import Results from '../../components/Results';
import api from '../../utils/api.js';
import './QuestionsPage.css';

const QuestionsPage = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [seeResults, setSeeResults] = useState(false);
  const [questions, setQuestions] = useState([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionId, setCurrentOptions] = useState(0);

  const [isAnswered, setIsAnswered] = useState(false);
  const [correctOptionId, setCorrectOptionId] = useState(null);
  const [choosedOption, setChoosedOption] = useState('');

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  useEffect(() => {
    api.getQuestionsWithDifficulty(params.difficulty).then((data) => {
      setQuestions(data);
      setIsLoading(false);
    });
  }, [params]);

  const handleNextQuestion = () => {
    if (questions.length - 1 === currentQuestionIndex) {
      setSeeResults(true);
    } else {
      setCurrentOptions((prevOptionId) => prevOptionId + 4);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleChooseOption = async (item) => {
    setIsAnswered(true);
    await api
      .verifyAnswerOfQuestion(questions[currentQuestionIndex].id, item.string)
      .then((data) => {
        if (data.answer) {
          setCorrectOptionId(item.id);
          setCorrectAnswers((prev) => prev + 1);
        } else {
          setIncorrectAnswers((prev) => prev + 1);
        }
        setChoosedOption(item.string);
      });
    setTimeout(() => {
      setChoosedOption('');
      setCorrectOptionId(null);
      handleNextQuestion(item.string);
      setIsAnswered(false);
    }, 250);
  };

  if (isLoading) {
    return <Spinner />;
  }

  //  agrego indentificadores unicos a las opciones para evitar renderizados de mas.
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
          numberOfCorrectAnswers={correctAnswers}
          numberOfIncorrectAnswers={incorrectAnswers}
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
                onClick={() => handleChooseOption(item)}
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
