import { useContext } from 'react';

import CancelEditFormModal from '@/components/CancelEditFormModal';
import Container from '@/components/Container';
import LoadingAnimation from '@/components/LoadingAnimation';
import { AuthContext } from '@/context/AuthContext';
import useModalStore from '@/context/useModalStore';
import useGetUserDetails from '@/hooks/reactQueryHooks/useGetUserDetails';
import useUpdateUser from '@/hooks/reactQueryHooks/useUpdateUser';

import UserProfileForm from './UserProfileForm';

export function UserProfile() {
  const { data: userData, isLoading, isError, error } = useGetUserDetails();

  const confirmationModal = useModalStore((s) => s.confirmationModal);

  const { updateUserMutation } = useUpdateUser();

  const { user } = useContext(AuthContext);

  const handleFormSubmit = (data) => {
    updateUserMutation.mutate({ user, userData: data });
    return data;
  };

  if (isLoading) return <LoadingAnimation />;

  if (isError) return <div>Error {error}</div>;

  return (
    <Container>
      {/* confirm cancel modal */}
      {confirmationModal && <CancelEditFormModal />}

      <UserProfileForm
        handleFormSubmit={handleFormSubmit}
        userData={userData}
      />
    </Container>
  );
}
export default UserProfile;
