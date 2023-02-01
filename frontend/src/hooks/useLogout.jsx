import { useContext } from 'react';

import { AuthContext } from '@/context/AuthContext';

export const useLogout = () => {
  const { dispatch } = useContext(AuthContext);
  const logout = () => {
    // remove from storage
    localStorage.removeItem('user');
    // logout action

    dispatch({ type: 'LOGOUT' });
  };
  return { logout };
};
export default useLogout;
