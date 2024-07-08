import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import QuestionsPage from './pages/QuestionsPage';
import StartPage from './pages/StartPage';
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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
