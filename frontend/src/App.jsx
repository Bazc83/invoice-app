import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createContext, useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import { AuthContext } from './context/AuthContext';
import {
  InvoiceContextProvider,
} from './context/InvoiceContext';
import { InvoicesContextProvider } from './context/InvoicesContext';
import { Invoice } from './pages/Invoice';
import { Invoices } from './pages/Invoices';
import { Login } from './pages/Login';
import { NotFoundPage } from './pages/NotFoundPage';
import { PageLayout } from './pages/PageLayout';
import { Signup } from './pages/Signup.jsx';

export const DarkModeContext = createContext();

const queryClient = new QueryClient();

function App() {
  const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'light');

  const toggleDarkMode = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };


  const {user} = useContext(AuthContext)

  return (
    <div className='App' data-theme={theme}>
      <DarkModeContext.Provider value={{ theme, toggleDarkMode }}>
        <QueryClientProvider client={queryClient}>
          <InvoicesContextProvider>
            <InvoiceContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route element={<PageLayout />}>
                    <Route
                      index
                      element={user ? <Invoices /> : <Navigate to='/login' />}
                    />

                    <Route
                      path='/invoices/:invoiceId'
                      element={user ? <Invoice /> : <Navigate to='/login' />}
                    />

                    <Route
                      path='/invoices'
                      element={user ? <Invoices /> : <Navigate to='/login' />}
                    />

                    <Route
                      path='/login'
                      element={!user ? <Login /> : <Navigate to='/' />}
                    />
                    <Route
                      path='/signup'
                      element={!user ? <Signup /> : <Navigate to='/' />}
                    />

                    <Route path='*' element={<NotFoundPage />} />
                  </Route>
                </Routes>
              </BrowserRouter>
              <ReactQueryDevtools initialIsOpen={false} />
            </InvoiceContextProvider>
          </InvoicesContextProvider>
        </QueryClientProvider>
      </DarkModeContext.Provider>
    </div>
  );
}

export default App;
