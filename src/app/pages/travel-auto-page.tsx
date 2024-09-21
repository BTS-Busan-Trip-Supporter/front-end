'use client';

import styled from '@emotion/styled';
import { useState, useEffect, useRef } from 'react';

import {
  TravelComponent,
  ScrollMotion,
  LoadingCard,
  SearchBox,
  CustomButton,
} from '@/components';
import { ChoiceList, DetailCard, Loading } from '@/components/travel';
import { Times } from '@/features/travel-schedule/travel-schedule.type';
import { useIntersectionObserver } from '@/shared';

interface Location {
  id: number;
  imageUrl: string;
  name: string;
  selected?: boolean;
  time?: Times;
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
  const [isLoading] = useState<boolean>(false);

  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Location | null>(null);
  const [selectedPlaces, setSelectedPlaces] = useState<Location[]>([]);

  const handleCardClick = (place: Location) => {
    setSelectedPlace(place);
    setIsDetailVisible(true);
  };

  const ResultsRef = useRef<HTMLDivElement | null>(null);
  const isResultVisible = useIntersectionObserver(ResultsRef);

  const Contents = {
    backgroundNode: (
      <ChoiceList
        choiceList={{
          where: searchContent,
          what: event,
        }}
      />
    ),
    childNode: (
      <styles.wrapper>
        <InputWhat where={searchContent} setContent={setEvent} />
        <div ref={ResultsRef}>
          <ResultWrapper
            isLoading={isLoading}
            isDetailVisible={isDetailVisible}
            selectedPlace={selectedPlace}
            selectedPlaces={selectedPlaces}
            setSelectedPlaces={setSelectedPlaces}
            setIsDetailVisible={setIsDetailVisible}
            handleCardClick={handleCardClick}
          />
        </div>
        {!isResultVisible && <ScrollMotion />}
      </styles.wrapper>
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

function Results({
  locations,
  nextLocations,
  onCardClick,
  selectedPlaces,
}: {
  locations: Location[];
  nextLocations: Location[];
  onCardClick: (place: Location) => void;
  selectedPlaces: Location[];
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
              onClick={() => onCardClick(location)}
              isSelected={selectedPlaces.some((p) => p.id === location.id)}
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
              onClick={() => onCardClick(location)}
              isSelected={selectedPlaces.some((p) => p.id === location.id)}
            />
          ))}
        </styles.cardList>
      </styles.resultCon>
      <CustomButton text='여행 완성' color='#5E5BDA' onClick={() => {}} />
    </styles.container>
  );
}

interface AutoProps {
  isLoading: boolean;
  isDetailVisible: boolean;
  selectedPlace: Location | null;
  selectedPlaces: Location[];
  setSelectedPlaces: (updateFn: (places: Location[]) => Location[]) => void;
  setIsDetailVisible: (i: boolean) => void;
  handleCardClick: (place: Location) => void;
}

function ResultWrapper({
  isLoading,
  isDetailVisible,
  selectedPlace,
  selectedPlaces,
  setSelectedPlaces,
  setIsDetailVisible,
  handleCardClick,
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
        selectedPlaces={selectedPlaces}
      />
    );
  }

  return (
    <DetailCard
      place={selectedPlace ?? { id: 1, imageUrl: '', name: '' }}
      selectedPlaces={selectedPlaces}
      onSelect={setSelectedPlaces}
      setIsDetailVisible={setIsDetailVisible}
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
