import { Navbar } from '@/components/Navbar';
import { DesignSystem } from '@/pages/DesignSystem';
import { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Invoices } from './pages/Invoices/Invoices';
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
            <Route  element={<PageLayout />}>
              <Route index element={<Invoices />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path='design' element={<DesignSystem />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DarkModeContext.Provider>
    </div>
  );
}

export default App;
