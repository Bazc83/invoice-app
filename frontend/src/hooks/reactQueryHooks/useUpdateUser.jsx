/* eslint-disable no-underscore-dangle */
import { toast } from 'react-toastify';

import { useMutation, useQueryClient } from '@tanstack/react-query';

// import { AuthContext } from '@/context/AuthContext';

export const useUpdateUser = () => {
  const successMessage = (message) => toast.success(message);
  const errorMessage = (message) => toast.error(message);

  const queryClient = useQueryClient();

  const updateUser = async (userToken, userData) => {
    const response = await fetch(`/api/user/${userToken}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    }).catch((err) => errorMessage(err));
    const json = await response.json();

    if (!response.ok) {
      throw new Error('Error');
    }

    return json;
  };

  // update invoice on db with invoiceData
  const updateUserMutation = useMutation({
    mutationFn: ({ user, userData }) => updateUser(user.token, userData),
    onSuccess: () => {
      queryClient.invalidateQueries('user');
      successMessage('Profile updated');
    },
    onError: () => {
      errorMessage('error');
    },
  });

  return { updateUserMutation };
};

export default useUpdateUser;
