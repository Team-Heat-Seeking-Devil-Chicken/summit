import React from 'react';
import ReactDOM from 'react-dom/client';
import { Home, Discover, Profile } from './pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { Layout } from './components';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from 'react-query';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    )
  },
  {
    path: '/discover',
    element: (
      <Layout>
        <Discover />
      </Layout>
    )
  },
  {
    path: '/profile/',
    element: (
      <Layout>
        <Profile />
      </Layout>
    )
  }
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
