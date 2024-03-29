import { createContext, useEffect, useReducer } from 'react';

import { useAuth } from '@/hooks/reactQueryHooks/useAuth';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  const { authData } = useAuth();

  // check for jwt token
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (authData?.jwtValid && user) {
      dispatch({ type: 'LOGIN', payload: user });
    }

    if (!authData?.jwtValid && user) {
      dispatch({ type: 'LOGOUT' });
    }
  }, [authData]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ ...state, dispatch, authData }}>
      {children}
    </AuthContext.Provider>
  );
}
