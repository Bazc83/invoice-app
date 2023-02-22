import { useContext, useState } from 'react';

import { AuthContext } from '@/context/AuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useContext(AuthContext);

  const errHandler = (err) => {
    console.log('error, ', err);
  };

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).catch((err) => errHandler(err));

    const json = await response.json().catch((err) => errHandler(err));

    if (json.error) {
      setIsLoading(false);
      setError(json.error);
      // Removes error from UI
      setTimeout(() => {
        setError(null);
      }, 2000);
    }

    if (response.ok) {
      // save to local storage
      localStorage.setItem('user', JSON.stringify(json));
      // update AuthContext
      dispatch({ type: 'LOGIN', payload: json });
      setError(null);
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

export default useLogin;
