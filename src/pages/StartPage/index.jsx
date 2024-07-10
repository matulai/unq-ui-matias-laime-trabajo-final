import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import extremeImg from '../../assets/difficulty-extreme-face.png';
import mediumImg from '../../assets/difficulty-medium-face.png';
import easyImg from '../../assets/difficulty-easy-face.png';
import hardImg from '../../assets/difficulty-hard-face.png';
import Spinner from '../../components/Spinner';
import Button from '../../components/Button';
import api from '../../utils/api.js';
import './StartPage.css';

const StartPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [difficultys, setDifficultys] = useState([]);
  const [difficulty, setDifficulty] = useState('');

  const difficultiesImgs = [easyImg, mediumImg, hardImg, extremeImg];
  const [imgDificulty, setImgDificulty] = useState({ easyImg });

  useEffect(() => {
    api.getDifficultys().then((data) => {
      setDifficultys(data);
      setDifficulty(data[0]);
      setImgDificulty(difficultiesImgs[0]);
      setIsLoading(false);
    });
  }, []);

  const handleDifficultyChange = () => {
    const index = difficultys.indexOf(difficulty);
    setDifficulty(difficultys[index + 1] || difficultys[0]);
    setImgDificulty(difficultiesImgs[index + 1] || difficultiesImgs[0]);
  };

  const handleStartGame = () => {
    navigate(`/questions/${difficulty}`);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="startpage-box">
      <div className="startpage-container">
        <div className="startpage-header">
          <h1>Questions and Answers</h1>
          <p>Test your knowledge</p>
        </div>
        <img src={imgDificulty} alt="quiz" />
        <Button
          type={`difficulty_${difficulty}`}
          action={handleDifficultyChange}
        >
          {difficulty.toUpperCase()}
        </Button>
        <Button type="gray_short" action={handleStartGame}>
          START
        </Button>
      </div>
    </div>
  );
};

export default StartPage;
