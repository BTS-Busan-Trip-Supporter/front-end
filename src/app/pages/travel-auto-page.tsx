'use client';

import styled from '@emotion/styled';
import { useState } from 'react';

import {
  TravelComponent,
  SearchBox,
  ScrollMotion,
  TimeCard,
  CustomButton,
} from '@/components';
import { ChoiceList } from '@/components/travel';

export function TravelAutoPage() {
  const data = {
    where: '부산 (Busan)',
    what: '웰니스 관광',
    when: '늦은 오후',
  };

  const Contents = {
    backgroundNode: <ChoiceList choiceList={data} />,
    childNode: (
      <>
        <InputWhat />
        <InputWhen />
      </>
    ),
    type: 'auto',
  };
  return <TravelComponent contents={Contents} />;
}

function InputWhat() {
  return (
    <styles.container>
      <styles.description>
        부산(대한민국) 에서
        <br /> 뭐하고 싶으세요?
      </styles.description>
      <SearchBox />
      <ScrollMotion />
    </styles.container>
  );
}

function InputWhen() {
  const [selectedTime, setSelectedTime] = useState<string | null>('오전');

  const handleTimeCardClick = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <styles.container>
      <styles.description>언제 가시나요?</styles.description>
      <styles.timeCardCon>
        <TimeCard
          time='오전'
          selected={selectedTime === '오전'}
          onClick={() => handleTimeCardClick('오전')}
        />
        <TimeCard
          time='오후'
          selected={selectedTime === '오후'}
          onClick={() => handleTimeCardClick('오후')}
        />
        <TimeCard
          time='저녁'
          selected={selectedTime === '저녁'}
          onClick={() => handleTimeCardClick('저녁')}
        />
        <TimeCard
          time='밤'
          selected={selectedTime === '밤'}
          onClick={() => handleTimeCardClick('밤')}
        />
      </styles.timeCardCon>
      <CustomButton
        color='linear-gradient(90deg, #6B67F9 0%, #423FB3 100%)'
        text='오늘이 아니야'
        onClick={() => {}}
      />
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    width: 100%;
    gap: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  description: styled.p`
    color: #505050;

    text-align: center;
    font-family: 'Noto Sans KR';
    font-size: 1.4375rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.02875rem;
  `,

  timeCardCon: styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
  `,
};
