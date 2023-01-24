// import '@styles/cssReset.css';
// import '@styles/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
