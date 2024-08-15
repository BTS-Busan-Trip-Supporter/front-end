'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';

import { Background, SearchBox, CustomButton } from '@/components';

export function TravelPage() {
  const user = {
    name: '최보윤',
  };

  const router = useRouter();

  return (
    <>
      <Background page='travel' />
      <styles.container>
        <h2>
          {user.name}님,
          <br />
          어디가실 계획인가요?
        </h2>
        <SearchBox />
        <styles.btnCon>
          <CustomButton
            color='#FF75C8'
            text='알아서 해줘'
            onClick={() => {
              router.replace('/travel/auto');
            }}
          />
          <CustomButton
            color='#514EBD'
            text='여행자 모드'
            onClick={() => {
              router.replace('/travel/travler');
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
