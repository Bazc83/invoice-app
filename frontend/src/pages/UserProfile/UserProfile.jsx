import { useEffect } from 'react';

import CancelEditFormModal from '@/components/CancelEditFormModal';
import Container from '@/components/Container';
import useModalStore from '@/context/useModalStore';
import useGetUserDetails from '@/hooks/reactQueryHooks/useGetUserDetails';

import UserProfileForm from './UserProfileForm';

export function UserProfile() {
  const { data: userData, isLoading, isError, error } = useGetUserDetails();

  const confirmationModal = useModalStore((s) => s.confirmationModal);

  const handleFormSubmit = (data) => {
    console.log(data);
    return data;
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  if (isLoading) return <div>Loading ...</div>;

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
