'use client';

import styled from '@emotion/styled';

import { Background, SearchBox, CustomButton } from '@/components';

export function TravelPage() {
  return (
    <>
      <Background page='travel' />
      <styles.container>
        <SearchBox />
        <styles.btnCon>
          <CustomButton color='#FF75C8' text='알아서 해줘' />
          <CustomButton color='#514EBD' text='여행자 모드' />
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
  `,
  btnCon: styled.div`
    width: 100%;
    display: flex;
    gap: 0.62rem;
    justify-content: center;
  `,
};
