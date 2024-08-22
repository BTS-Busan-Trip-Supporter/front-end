'use client';

import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

import {
  TravelComponent,
  SearchBox,
  ScrollMotion,
  TimeCard,
  CustomButton,
} from '@/components';
import { ChoiceList } from '@/components/travel';
import { Times } from '@/features/travel-schedule/travel-schedule.type';

interface Loading {
  $isLoading: boolean;
}

export function TravelAutoPage() {
  const [searchContent, setSearchContent] = useState('');

  useEffect(() => {
    const savedContent = sessionStorage.getItem('searchContent');
    if (savedContent) {
      setSearchContent(savedContent);
      sessionStorage.removeItem('searchContent');
    }
  }, []);

  const [event, setEvent] = useState('');
  const [time, setTime] = useState<Times>('기본');
  const [isLoading] = useState<boolean>(true);

  const Contents = {
    backgroundNode: (
      <ChoiceList
        choiceList={{
          where: searchContent,
          what: event,
          when: time,
        }}
      />
    ),
    childNode: (
      <>
        <styles.wrapper>
          <InputWhat where={searchContent} setContent={setEvent} />
          <InputWhen selectedTime={time} setContent={setTime} />
          <Results isLoading={isLoading} />
        </styles.wrapper>
        <ScrollMotion />
      </>
    ),
    type: 'auto' as const,
  };
  return <TravelComponent contents={Contents} />;
}

function InputWhat({
  where,
  setContent,
}: {
  where: string;
  setContent: (value: string) => void;
}) {
  return (
    <styles.container>
      <styles.description>
        {where} 에서
        <br /> 뭐하고 싶으세요?
      </styles.description>
      <SearchBox setContent={setContent} />
    </styles.container>
  );
}

function InputWhen({
  selectedTime,
  setContent,
}: {
  selectedTime: Times;
  setContent: (value: Times) => void;
}) {
  const handleTimeCardClick = (time: Times) => {
    setContent(time);
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

function Results({ isLoading }: { isLoading: boolean }) {
  return (
    <styles.container>
      <styles.resultCon>
        <styles.description>이런 곳 어떠세요?</styles.description>
        <styles.cardList>
          <styles.card $isLoading={isLoading} />
          <styles.card $isLoading={isLoading} />
          <styles.card $isLoading={isLoading} />
          <styles.card $isLoading={isLoading} />
          <styles.card $isLoading={isLoading} />
          <styles.card $isLoading={isLoading} />
        </styles.cardList>
      </styles.resultCon>
      <styles.resultCon>
        <styles.description>이후에 이 곳은 어떠세요?</styles.description>
        <styles.cardList>
          <styles.card $isLoading={isLoading} />
          <styles.card $isLoading={isLoading} />
          <styles.card $isLoading={isLoading} />
          <styles.card $isLoading={isLoading} />
          <styles.card $isLoading={isLoading} />
          <styles.card $isLoading={isLoading} />
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
    scroll-snap-type: y mandatory;

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
    scroll-snap-align: start;
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

  card: styled.div<Loading>`
    width: 6.875rem;
    height: 7.6875rem;
    flex-shrink: 0;
    border-radius: 14px;
    background-color: ${(props) => (props.$isLoading ? '#f0f0f0' : '#fff')};
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0)
    );
    background-size: 40px 100%;
    background-repeat: no-repeat;
    background-position: left -80px top 0;

    box-shadow: 2px 3px 4px 0px rgba(0, 0, 0, 0.07);
    animation: ${(props) =>
      props.$isLoading ? 'loading 1s ease-in-out infinite' : 'none'};

    @keyframes loading {
      to {
        background-position: right -40px top 0;
      }
    }
  `,
};
