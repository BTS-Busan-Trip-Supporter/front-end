'use client';

import styled from '@emotion/styled';

import { CustomButton } from '@/components';
import { Calendar } from '@/components/Calendar';

export function TravelerScheduleSelection({
  onNextPage,
}: {
  onNextPage: () => void;
}) {
  return (
    <styles.container>
      <h1>언제 가시나요?</h1>
      <Calendar selectedMode='multiple' />
      <styles.CustomButton
        color='linear-gradient(90deg, #6B67F9 0%, #423FB3 100%)'
        text='확인'
        onClick={() => onNextPage()}
      />
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    display: flex;
    flex-grow: 1;
    width: 100%;
    height: 100%;
    flex-direction: column;
    gap: 3rem;

    h1 {
      font-family: Noto Sans KR;
      font-size: 23px;
      font-weight: 700;
      line-height: 33.3px;
      letter-spacing: -0.02em;
      text-align: center;

      color: #505050;
    }
  `,

  CustomButton: styled(CustomButton)`
    margin: 2rem;
  `,
};
