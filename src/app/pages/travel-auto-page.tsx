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
        <styles.wrapper>
          <InputWhat />
          <InputWhen />
          <Results />
        </styles.wrapper>
        <ScrollMotion />
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

function Results() {
  return (
    <styles.container>
      <styles.resultCon>
        <styles.description>이런 곳 어떠세요?</styles.description>
        <styles.cardList>
          <styles.card />
          <styles.card />
          <styles.card />
          <styles.card />
          <styles.card />
          <styles.card />
        </styles.cardList>
      </styles.resultCon>
      <styles.resultCon>
        <styles.description>이후에 이 곳은 어떠세요?</styles.description>
        <styles.cardList>
          <styles.card />
          <styles.card />
          <styles.card />
          <styles.card />
          <styles.card />
          <styles.card />
        </styles.cardList>
      </styles.resultCon>
    </styles.container>
  );
}

const styles = {
  wrapper: styled.div`
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }
  `,

  container: styled.div`
    width: 100%;
    height: 100vh;
    gap: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 20rem;
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

  resultCon: styled.div`
    display: flex;
    width: 100%;
    align-items: flex-start;
    flex-direction: column;
    gap: 0.5rem;
  `,

  cardList: styled.div`
    display: flex;
    width: 100%;
    padding: 0.5rem 0;
    gap: 1rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    justify-content: flex-start;
  `,

  card: styled.div`
    width: 6.875rem;
    height: 7.6875rem;
    flex-shrink: 0;
    border-radius: 14px;
    background: #fff;

    box-shadow: 2px 3px 4px 0px rgba(0, 0, 0, 0.07);
  `,
};
