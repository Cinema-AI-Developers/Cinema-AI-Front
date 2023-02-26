import React from 'react';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
// import '/vendor/normalize.css';
import './vendor/fonts/fonts.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Film from './pages/Film';

const queryClient = new QueryClient();

const router2 = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'film/:id',
    element: <Film />,
  },
]);

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'film/:id',
        element: <Film />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
