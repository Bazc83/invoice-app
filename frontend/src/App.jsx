import { DesignSystem } from '@/pages/DesignSystem';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import { Invoice } from './pages/Invoice';
import { Invoices } from './pages/Invoices';
import { NotFoundPage } from './pages/NotFoundPage';
import { PageLayout } from './pages/PageLayout';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export const DarkModeContext = createContext();

const queryClient = new QueryClient();
function App() {
  const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'light');

  const toggleDarkMode = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <div className='App' data-theme={theme}>
      <DarkModeContext.Provider value={{ theme, toggleDarkMode }}>
        <QueryClientProvider client={queryClient}>
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
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </DarkModeContext.Provider>
    </div>
  );
}

export default App;
