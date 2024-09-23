'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';

import { Header, EditProfileSection } from '@/components/profile';
import { useUserData } from '@/features/member';

export function ProfileEditPage() {
  const router = useRouter();

  const { data: userData } = useUserData(localStorage.getItem('accessToken'));

  return (
    <styles.container>
      <Header
        h2='프로필 편집'
        prevButtonHandler={() => router.replace('/my')}
      />
      <EditProfileSection user={userData?.data} />
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    background-color: #fafaff;
  `,
};
