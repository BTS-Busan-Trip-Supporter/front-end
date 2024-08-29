'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Header, ProfileSection } from '@/components/profile';
import { type User } from '@/features/profile';

const dummyUser: User = {
  tag: 123,
  nickname: 'P의 여행자',
  password: '123456',
  email: 'pop@naver.com',
  profileImage: 'https://picsum.photos/50/50',
};

export function ProfileEditPage() {
  const router = useRouter();
  const [isEditPWD, setIsEditPWD] = useState(false);
  return (
    <styles.container>
      {!isEditPWD ? (
        <>
          <Header
            h2='프로필 편집'
            prevButtonHandler={() => router.replace('/my')}
          />
          <ProfileSection user={dummyUser} handlingEditPWD={setIsEditPWD} />
        </>
      ) : (
        <Header
          h2='비밀번호 변경하기'
          prevButtonHandler={() => {
            router.replace('/my/edit');
            setIsEditPWD(false);
          }}
        />
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
