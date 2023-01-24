import { useAuth } from '@/hooks/reactQueryHooks/useAuth';
import { createContext, useEffect, useReducer } from 'react';

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

export const AuthContextProvider = ({ children }) => {
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
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
