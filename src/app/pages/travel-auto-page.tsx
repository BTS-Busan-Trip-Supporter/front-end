'use client';

import styled from '@emotion/styled';
import { useState, useEffect, useRef } from 'react';

import {
  TravelComponent,
  ScrollMotion,
  TimeCard,
  CustomButton,
  LoadingCard,
  SearchWrapper,
  SearchBox,
} from '@/components';
import { ChoiceList, DetailCard, Loading } from '@/components/travel';
import { Times } from '@/features/travel-schedule/travel-schedule.type';
import { useIntersectionObserver } from '@/shared';

interface Location {
  id: number;
  imageUrl: string;
  name: string;
}

const dummyLocations: Location[] = [
  {
    id: 1,
    imageUrl: 'https://picsum.photos/400/600',
    name: 'hi',
  },
  {
    id: 2,
    imageUrl: 'https://picsum.photos/2600/2600',
    name: 'hi',
  },
  {
    id: 3,
    imageUrl: 'https://picsum.photos/200/500',
    name: 'hi',
  },
  {
    id: 4,
    imageUrl: 'https://picsum.photos/100/100',
    name: 'hi',
  },
];

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
  const [, setPlace] = useState('');

  const [isLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 5000);
  // }, []);

  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleCardClick = (id: number) => {
    setSelectedId(id);
    setIsDetailVisible(true);
  };

  const handleSelectInDetail = () => {
    if (selectedId !== null) {
      setSelectedIds((prevIds) => [...prevIds, selectedId]);
      setIsDetailVisible(false);
    }
  };

  const inputWhenRef = useRef<HTMLDivElement | null>(null);
  const isResultVisible = useIntersectionObserver(inputWhenRef);

  const Contents = {
    backgroundNode: (
      <ChoiceList
        choiceList={{
          where: searchContent,
          what: event,
          when: time === '기본' ? undefined : time,
        }}
      />
    ),
    childNode: (
      <styles.wrapper>
        <InputPlace setContent={setPlace} />
        <InputWhat where={searchContent} setContent={setEvent} />
        <InputWhen selectedTime={time} setContent={setTime} />
        <div ref={inputWhenRef}>
          <ResultWrapper
            isLoading={isLoading}
            isDetailVisible={isDetailVisible}
            selectedId={selectedId}
            selectedIds={selectedIds}
            handleCardClick={handleCardClick}
            handleSelectInDetail={handleSelectInDetail}
          />
        </div>
        {!isResultVisible && <ScrollMotion />}
      </styles.wrapper>
    ),
    type: 'auto' as const,
  };
  return <TravelComponent contents={Contents} />;
}

function InputPlace({ setContent }: { setContent: (value: string) => void }) {
  return (
    <styles.container>
      <styles.description>가고싶은 장소를 입력하세요</styles.description>
      <SearchWrapper setContent={setContent} />
    </styles.container>
  );
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

function Results({
  locations,
  nextLocations,
  onCardClick,
  selectedIds,
}: {
  locations: Location[];
  nextLocations: Location[];
  onCardClick: (id: number) => void;
  selectedIds: number[];
}) {
  return (
    <styles.container>
      <styles.resultCon>
        <styles.description>이런 곳 어떠세요?</styles.description>
        <styles.cardList>
          {locations.map((location) => (
            <LoadingCard
              key={location.id}
              imageUrl={location.imageUrl}
              onClick={() => onCardClick(location.id)}
              isSelected={selectedIds.includes(location.id)}
            />
          ))}
        </styles.cardList>
      </styles.resultCon>
      <styles.resultCon>
        <styles.description>이후에 이 곳은 어떠세요?</styles.description>
        <styles.cardList>
          {nextLocations.map((location) => (
            <LoadingCard
              key={location.id}
              imageUrl={location.imageUrl}
              onClick={() => onCardClick(location.id)}
              isSelected={selectedIds.includes(location.id)}
            />
          ))}
        </styles.cardList>
      </styles.resultCon>
    </styles.container>
  );
}

interface AutoProps {
  isLoading: boolean;
  isDetailVisible: boolean;
  selectedId: number | null;
  selectedIds: number[];
  handleCardClick: (id: number) => void;
  handleSelectInDetail: () => void;
}

function ResultWrapper({
  isLoading,
  isDetailVisible,
  selectedId,
  selectedIds,
  handleCardClick,
  handleSelectInDetail,
}: AutoProps) {
  if (isLoading) {
    return <Loading />;
  }

  if (!isDetailVisible) {
    return (
      <Results
        locations={dummyLocations}
        nextLocations={dummyLocations}
        onCardClick={handleCardClick}
        selectedIds={selectedIds}
      />
    );
  }

  return (
    <DetailCard
      name={dummyLocations[selectedId ?? 1].name}
      src={dummyLocations[selectedId ?? 1].imageUrl}
      onSelect={handleSelectInDetail}
    />
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
};
