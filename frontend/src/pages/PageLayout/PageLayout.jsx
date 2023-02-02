import { createContext, useReducer } from 'react';
import { Outlet } from 'react-router-dom';

import { Navbar } from '@/components/Navbar';

export const PageLayoutContext = createContext();

export function PageLayout() {
  const initialState = {
    filterModal: false,
  };

  const pageLayoutReducer = (state, action) => {
    switch (action.type) {
      case 'showFilterModal':
        return { ...state, filterModal: true };
      case 'hideFilterModal':
        return { ...state, filterModal: false };
      case 'toggleFilterModal':
        return { ...state, filterModal: !state.filterModal };
      case 'resetPage':
        return initialState;
      default:
        throw new Error('pageLayoutReducer Error');
    }
  };

  const [state, dispatch] = useReducer(pageLayoutReducer, initialState);

  const { filterModal } = state;

  const handleCloseModal = () => {
    if (!filterModal) return;
    dispatch({ type: 'resetPage' });
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <PageLayoutContext.Provider value={{ filterModal, dispatch }}>
      <div
        className="primary-bg relative flex h-max min-h-screen flex-col lg:grid lg:grid-cols-[80px_1fr] "
        onClick={handleCloseModal}
        aria-hidden="true"
      >
        <Navbar />

        {/* Show overlay when showModal is true */}
        <div
          className={`lg:col-start-2 ${
            filterModal &&
            'before:absolute before:z-10 before:h-full before:w-full before:bg-black before:opacity-70'
          } `}
        >
        

          <Outlet />
        </div>
      </div>
    </PageLayoutContext.Provider>
  );
}

export default PageLayout;
