import { Navbar } from '@/components/Navbar';
import { DesignSystem } from '@/pages/DesignSystem';
import { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
          <Navbar />
          <Routes>
            <Route path='/design' element={<DesignSystem />} />
          </Routes>
        </BrowserRouter>
      </DarkModeContext.Provider>
    </div>
  );
}

export default App;
