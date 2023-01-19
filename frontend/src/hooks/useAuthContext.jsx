const { AuthContext } = require('@/context/AuthContext');
const { useContext } = require('react');

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error(
      'useAuthContext must be used inside an AuthContextProvider component'
    );
  }

  return context;
};
