'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';

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
  return (
    <styles.container>
      <Header
        h2='프로필 편집'
        prevButtonHandler={() => router.replace('/my')}
      />
      <ProfileSection user={dummyUser} />
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
