import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api.js';

const StartPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [difficultys, setDifficultys] = useState([]);
  const [difficulty, setDifficulty] = useState('');

  useEffect(() => {
    api.getDifficultys().then((data) => {
      setDifficultys(data);
      setDifficulty(data[0]);
      setIsLoading(false);
    });
  }, []);

  const handleDifficultyChange = () => {
    // setear el classname del boton como usestate y ir cambiandolo con indices
    // con los nombre de las clases en un array al igual que difficulty
    const index = difficultys.indexOf(difficulty);
    setDifficulty(difficultys[index + 1] || difficultys[0]);
  };

  const handleStartGame = () => {
    // redirigir a la pagina de preguntas con el nivel de dificultad seleccionado
    navigate(`/questions/${difficulty}`);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <h1>Questions and Answers</h1>
        <p>Test your knowledge</p>
        <img src="https://via.placeholder.com/150" alt="quiz" />
        <p>Choose difficulty</p>
        <button onClick={handleDifficultyChange}>{difficulty}</button>
        <p>Start game</p>
        <button onClick={handleStartGame}>start</button>
      </div>
    </>
  );
};

export default StartPage;
