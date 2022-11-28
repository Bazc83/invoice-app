import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { DesignSystem } from '@/pages/DesignSystem';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/design' element={<DesignSystem />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
