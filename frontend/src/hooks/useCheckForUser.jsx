export const useCheckForUser = () => {
  const checkIfTaken = async (email) => {
    const response = await fetch(`/api/user/checkforuser/${email}`, {
      method: 'GET',
    });

    const userTaken = await response.json();

    return userTaken;
  };

  return { checkIfTaken };
};

export default useCheckForUser;
