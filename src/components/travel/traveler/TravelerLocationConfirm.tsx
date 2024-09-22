import styled from '@emotion/styled';

import { CustomButton, TimeCard } from '@/components';

export function TravelerLocationConfirm({
  location,
  day,
  selectedTime,
  onTimeClicked,
  onConfirm,
}: {
  location: string;
  day: number;
  selectedTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  onTimeClicked: (time: 'morning' | 'afternoon' | 'evening' | 'night') => void;
  onConfirm: () => void;
}) {
  return (
    <styles.container>
      <p>{location}을/를</p>
      <p>{day}일차</p>
      <styles.timeCardCon>
        <TimeCard
          time='오전'
          selected={selectedTime === 'morning'}
          onClick={() => onTimeClicked('morning')}
        />
        <TimeCard
          time='오후'
          selected={selectedTime === 'afternoon'}
          onClick={() => onTimeClicked('afternoon')}
        />
        <TimeCard
          time='저녁'
          selected={selectedTime === 'evening'}
          onClick={() => onTimeClicked('evening')}
        />
        <TimeCard
          time='밤'
          selected={selectedTime === 'night'}
          onClick={() => onTimeClicked('night')}
        />
      </styles.timeCardCon>
      <p>일정으로 추가합니다.</p>
      <styles.CustomButton
        color='#FF75C8'
        text='추가하기'
        onClick={onConfirm}
        grow
      />
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: start;

    p {
      font-family: Noto Sans KR;
      font-size: 23px;
      font-weight: 700;
      line-height: 33.3px;
      letter-spacing: -0.02em;
      text-align: center;

      color: #505050;
    }
  `,
  timeCardCon: styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
  `,
  CustomButton: styled(CustomButton)`
    margin-top: auto;
    margin-bottom: auto;
  `,
};
