import { Link } from 'react-router-dom';
import imgNotFound from '../../assets/not-found-face.png';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="notFound">
      <h1>404 Not Found</h1>
      <img src={imgNotFound} alt="imageNotFound" />
      <Link to="/">
        <h3>Go back to home</h3>
      </Link>
    </div>
  );
};

export default NotFoundPage;
