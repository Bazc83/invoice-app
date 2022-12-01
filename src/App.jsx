import { DesignSystem } from '@/pages/DesignSystem';
import { createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import { Invoice } from './pages/Invoices/Invoice';
import { Invoices } from './pages/Invoices/Invoices';
import { NotFoundPage } from './pages/NotFoundPage';
import { PageLayout } from './pages/PageLayout';

export const DarkModeContext = createContext();

function App() {
  const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'light');

  const toggleDarkMode = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <div className='App' data-theme={theme}>
      <DarkModeContext.Provider value={{ theme, toggleDarkMode }}>
        <BrowserRouter>
          <Routes>
            <Route element={<PageLayout/>}>
              <Route index element={<Invoices />} />
              <Route path='/invoices' element={<Invoices />} />
              <Route path='/invoices/:invoiceId' element={<Invoice />} />

              <Route path='design' element={<DesignSystem />} />

              <Route path='*' element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DarkModeContext.Provider>
    </div>
  );
}

export default App;
