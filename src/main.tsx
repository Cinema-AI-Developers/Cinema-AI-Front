import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import App from './App';
import Alice from './components/Alice';
import FilmPage from './pages/FilmPage';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import TopList from './pages/TopList';
import './styles/index.scss';

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='films/:id' element={<FilmPage />} />
      <Route path='alice' element={<Alice />} />
      <Route path='top/:type/:page' element={<TopList />} />
      <Route path='search/:keyword/:page' element={<SearchPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
