'use client';

import styled from '@emotion/styled';

import {
  TIME_STRINGS,
  Times,
} from '@/features/travel-schedule/travel-schedule.type';

interface Color {
  $selected: boolean;
}

export function TimeCard({
  time,
  selected,
  onClick,
}: {
  time: Times;
  selected: boolean;
  onClick: () => void;
}) {
  const timeString = TIME_STRINGS[time as Times] || '';

  return (
    <styles.container onClick={onClick}>
      <styles.timeIcon
        src={selected ? `/${timeString}-selected.svg` : `/${timeString}.svg`}
        alt='time-icon'
      />
      <styles.timeDescription $selected={selected}>
        {time}
      </styles.timeDescription>
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    border-radius: 14px;
    background: #fff;
    box-shadow: 2px 3px 5px 0px rgba(0, 0, 0, 0.09);
    padding: 0.8rem 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  `,

  timeIcon: styled.img`
    width: 2.1875rem;
    height: 2.1875rem;
  `,

  timeDescription: styled.span<Color>`
    color: ${(props) => (props.$selected ? '#505050' : '#d9d9d9')};
    font-family: 'Noto Sans KR';
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.0175rem;
  `,
};
