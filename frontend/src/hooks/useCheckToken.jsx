import { useEffect, useState } from 'react';

export const useCheckToken = () => {
  
  const [jwtValid, setJwtValid] = useState(null);

  
  const user = JSON.parse(localStorage.getItem('user'));

  const checkToken = async (userVal) => {
    const { token } = userVal;
    try {
      const response = await fetch('/api/user/checktoken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const json = await response.json();

      if (json.jwtValid) {
        setJwtValid(true);
      } else {
        setJwtValid(false);
      }
      return json;

    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    if(user){
      checkToken(user);
    } else{
      setJwtValid(false)
    }
    
  }, [user]);

  return { checkToken, jwtValid };
};
