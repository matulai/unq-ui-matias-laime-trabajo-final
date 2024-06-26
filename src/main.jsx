import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import StartPage from './pages/StartPage';
import QuestionsPage from './pages/QuestionsPage';
import ResultsPage from './pages/ResultsPage';
import ReactDOM from 'react-dom/client';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />,
  },
  {
    path: '/questions/:difficulty',
    element: <QuestionsPage />,
  },
  {
    path: '/results/:questionsIds/:answers',
    element: <ResultsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
