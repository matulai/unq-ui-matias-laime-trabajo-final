import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import QuestionsPage from './pages/QuestionsPage';
import PageNotFound from './pages/NotFoundPage';
import StartPage from './pages/StartPage';
import ReactDOM from 'react-dom/client';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />,
    errorElement: <PageNotFound />,
  },
  {
    path: '/questions/:difficulty',
    element: <QuestionsPage />,
    errorElement: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
