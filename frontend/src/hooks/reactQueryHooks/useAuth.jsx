import { useQuery } from '@tanstack/react-query';

const checkToken = async (userVal) => {
  const { token } = userVal;
  try {
    const response = await fetch('/api/user/checktoken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    const json = await response.json();

    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const useAuth = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const { data: authData } = useQuery({
    queryKey: ['authContext'],
    queryFn: () => checkToken(user),
  });
  return { authData };
};
