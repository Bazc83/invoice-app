import { DesignSystem } from '@/pages/DesignSystem';
import { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Invoice } from './pages/Invoices/Invoice';
import { Invoices } from './pages/Invoices/Invoices';
import { NotFoundPage } from './pages/NotFoundPage';
import { PageLayout } from './pages/PageLayout';

export const DarkModeContext = createContext();

function App() {
  const [light, setLight] = useState(false);

  const toggleDarkMode = () => {
    setLight((prev) => !prev);
  };

  return (
    <div className='App'>
      <DarkModeContext.Provider value={{ light, toggleDarkMode }}>
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
      </DarkModeContext.Provider>
    </div>
  );
}

export default App;
