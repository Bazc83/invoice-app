/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import useLocalStorage from 'use-local-storage';

import { AuthContext } from './context/AuthContext';
import { InvoicesContextProvider } from './context/InvoicesContext';
import { EditInvoice } from './pages/EditInvoice';
import { Home } from './pages/Home';
import { Invoice } from './pages/Invoice';
import { Invoices } from './pages/Invoices';
import { Login } from './pages/Login';
import { NewInvoice } from './pages/NewInvoice';
import { NotFoundPage } from './pages/NotFoundPage';
import { PageLayout } from './pages/PageLayout';
import { Signup } from './pages/Signup.jsx';
import { UserProfile } from './pages/UserProfile';

export const DarkModeContext = createContext();

function App() {
  // eslint-disable-next-line no-constant-condition
  const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'light');

  const toggleDarkMode = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  useEffect(() => {
    if (theme === undefined) {
      setTheme('dark');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { user } = useContext(AuthContext);

  return (
    <div
      className={`App ${theme} h-screen overflow-auto ${
        theme === 'dark' && 'dark-theme  [color-scheme:dark]'
      }`}
      data-theme={theme}
    >
      <DarkModeContext.Provider value={{ theme, toggleDarkMode }}>
        <InvoicesContextProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<PageLayout />}>
                <Route
                  index
                  element={user ? <Home /> : <Navigate to="/login" />}
                />

                <Route
                  path="/invoices/:invoiceId"
                  element={user ? <Invoice /> : <Navigate to="/login" />}
                />

                <Route
                  path="/invoices"
                  element={user ? <Invoices /> : <Navigate to="/login" />}
                />
                <Route
                  path="/newinvoice"
                  element={user ? <NewInvoice /> : <Navigate to="/login" />}
                />
                <Route
                  path="/editinvoice/:invoiceId"
                  element={user ? <EditInvoice /> : <Navigate to="/login" />}
                />

                <Route
                  path="/profile"
                  element={user ? <UserProfile /> : <Navigate to="/login" />}
                />

                <Route
                  path="/login"
                  element={!user ? <Login /> : <Navigate to="/" />}
                />
                <Route
                  path="/signup"
                  element={!user ? <Signup /> : <Navigate to="/" />}
                />

                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
          <div className="noPrint">
            <ReactQueryDevtools initialIsOpen={false} />
          </div>
        </InvoicesContextProvider>
      </DarkModeContext.Provider>
    </div>
  );
}

export default App;
