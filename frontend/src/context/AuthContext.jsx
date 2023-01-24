import { useCheckToken } from '@/hooks/useCheckToken';
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


  const { jwtValid} = useCheckToken();


  // check for jwt token
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      console.log(jwtValid)
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, [jwtValid]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
