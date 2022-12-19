import { DesignSystem } from '@/pages/DesignSystem';
import { createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import { Invoice } from './pages/Invoices/Invoice';
import { Invoices } from './pages/Invoices/Invoices';
import { NotFoundPage } from './pages/NotFoundPage';
import { PageLayout } from './pages/PageLayout';

export const DarkModeContext = createContext();
export const InvoicesContext = createContext();
function App() {

  const senderAddress = {
    street: '19 Union Terrace',
    city: 'London',
    postCode: 'E1 3EZ',
    country: 'United Kingdom',
  };
  
  const options = [
    { key: 1, value: 'Net 1 Day' },
    { key: 7, value: 'Net 7 Days' },
    { key: 14, value: 'Net 14 Days' },
    { key: 30, value: 'Net 30 Days' },
  ];

  const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'light');

  const toggleDarkMode = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };



  return (
    <div className='App' data-theme={theme}>
      <DarkModeContext.Provider value={{ theme, toggleDarkMode }}>
        <InvoicesContext.Provider value={{ senderAddress, options}}>
          <BrowserRouter>
            <Routes>
              <Route element={<PageLayout />}>
                <Route index element={<Invoices />} />
                <Route path='/invoices' element={<Invoices />} />
                <Route path='/invoices/:invoiceId' element={<Invoice />} />

                <Route path='design' element={<DesignSystem />} />

                <Route path='*' element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </InvoicesContext.Provider>
      </DarkModeContext.Provider>
    </div>
  );
}

export default App;
