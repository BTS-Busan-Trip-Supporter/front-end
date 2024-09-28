'use client';

import styled from '@emotion/styled';
import { useState } from 'react';

import { CustomButton } from '@/components';
import { Calendar } from '@/components/Calendar';
import { useTripStore } from '@/features/trip/trip.slice';

export function TravelerScheduleSelection({
  onPrevPage,
  onNextPage,
}: {
  onPrevPage: () => void;
  onNextPage: ({ start, end }: { start?: Date; end?: Date }) => void;
}) {
  const { setDates: setTourInfoDates } = useTripStore((state) => state);
  const [dates, setDates] = useState<{ start?: Date; end?: Date }>({});

  return (
    <styles.container>
      <styles.header>
        <styles.prevButton
          src='/chevron-left.svg'
          alt='chevron-left'
          onClick={onPrevPage}
        />
      </styles.header>
      <h1>언제 가시나요?</h1>
      <Calendar selectedMode='multiple' onSelect={setDates} />
      <styles.CustomButton
        color='linear-gradient(90deg, #6B67F9 0%, #423FB3 100%)'
        text='확인'
        onClick={() => {
          const { start, end } = dates;
          if (start) {
            setTourInfoDates({ start, end: end ?? start });
            onNextPage(dates);
          }
        }}
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

  header: styled.div`
    display: flex;
    position: fixed;
    align-items: center;
    gap: 0.5rem;
    transform: translateY(50%);
  `,

  prevButton: styled.img`
    width: 1rem;
    height: 1rem;
  `,
};
