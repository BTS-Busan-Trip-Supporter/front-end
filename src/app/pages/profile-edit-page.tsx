'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  Header,
  EditProfileSection,
  EditPasswordSection,
} from '@/components/profile';
import { useUserData } from '@/features/member';

export function ProfileEditPage() {
  const router = useRouter();
  const [isEditPWD, setIsEditPWD] = useState(false);

  const returnToEditPage = () => {
    router.replace('/my/edit');
    setIsEditPWD(false);
  };

  const { data: userData } = useUserData(localStorage.getItem('accessToken'));

  return (
    <styles.container>
      {!isEditPWD ? (
        <>
          <Header
            h2='프로필 편집'
            prevButtonHandler={() => router.replace('/my')}
          />
          <EditProfileSection
            user={userData?.data}
            handlingEditPWD={setIsEditPWD}
          />
        </>
      ) : (
        <>
          <Header
            h2='비밀번호 변경하기'
            prevButtonHandler={() => returnToEditPage()}
          />
          <EditPasswordSection onClick={() => returnToEditPage()} />
        </>
      )}
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
