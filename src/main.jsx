import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import ProfileTodo from './pages/ProfileTodo';
import './global.css';
import {createBrowserRouter, RouterProvider} from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProfileTodo />,
  },
  {
    path: '/profile-todo',
    element: <ProfileTodo />,
  },
  {
    path: '*',
    element: <h1>Page not found</h1>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);