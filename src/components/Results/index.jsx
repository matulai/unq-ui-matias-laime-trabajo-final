import { useNavigate } from 'react-router-dom';
import './Results.css';

// eslint-disable-next-line react/prop-types
const Results = ({ numberOfCorrectAnswers, numberOfIncorrectAnswers }) => {
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    navigate('/');
  };

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
