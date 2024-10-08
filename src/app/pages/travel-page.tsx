'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Background, CustomButton, SearchBox } from '@/components';
import { useUserData } from '@/features/member';
import { useToast } from '@/features/toast';

export function TravelPage() {
  const [searchContent, setSearchContent] = useState('');
  const { createToast } = useToast();

  const router = useRouter();

  const handleButtonClick = (route: string) => {
    if (searchContent === '') {
      createToast('info', '장소를 선택해보세요!');
      return;
    }
    router.replace(route);
    sessionStorage.setItem('searchContent', searchContent);
  };

  const { data: userData } = useUserData();

  return (
    <>
      <Background page='travel' />
      <styles.container>
        <h2>
          {userData?.data.name}님,
          <br />
          어디가실 계획인가요?
        </h2>
        <SearchBox
          setContent={setSearchContent}
          dropBoxType='regionType'
          placeholder='가고 싶은 곳을 입력하세요.'
        />
        <styles.btnCon>
          <CustomButton
            color='#FF75C8'
            text='선택 완료'
            onClick={() => {
              handleButtonClick('/travel/auto');
            }}
          />
          <CustomButton
            color='#514EBD'
            text='여행자 모드'
            onClick={() => {
              handleButtonClick('/travel/traveler');
            }}
          />
        </styles.btnCon>
      </styles.container>
    </>
  );
}

const styles = {
  container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1.37rem;
    justify-content: center;
    align-items: center;
    gap: 1.69rem;

    h2 {
      color: #505050;
      font-family: 'Noto Sans KR';
      font-size: 1.4375rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.02875rem;
      text-align: center;
    }
  `,
  btnCon: styled.div`
    width: 100%;
    display: flex;
    gap: 0.62rem;
    justify-content: center;
  `,
};
