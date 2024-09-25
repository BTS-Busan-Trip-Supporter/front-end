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
import {
  useRecommendDayTrip,
  useCreateTripSchedule,
  DropBoxMenu,
  ScheduleTimeFromServer,
  type PostDayTripResponseDTO,
  type TripItem,
  type TourActivity,
} from '@/features/trip';
import { useIntersectionObserver } from '@/shared';

interface Location {
  item: TripItem;
  selected?: boolean;
  time?: Times;
}

function convertTime(
  time: Times | undefined,
): 'MORNING' | 'MIDNOON' | 'AFTERNOON' | 'EVENING' {
  switch (time) {
    case '오전':
      return 'MORNING';
    case '오후':
      return 'AFTERNOON';
    case '저녁':
      return 'EVENING';
    case '밤':
      return 'MIDNOON';
    default:
      return 'MORNING';
  }
}

function transformTourActivityData(
  selectedPlaces: Location[],
  regionCode: string,
): TourActivity[] {
  return selectedPlaces.map((place, index) => ({
    id: Math.floor(Math.random() * Date.now()),
    spotName: place.item.title,
    dayNumber: 0,
    dayTime: convertTime(place.time),
    orderIndex: index,
    tourSpotData: {
      contentId: place.item.contentId,
      contentTypeId: place.item.contentTypeId,
      title: place.item.title,
      sigunguCode: regionCode,
    },
    isNew: true,
    isOrderChanged: false,
    isTourSpotChanged: false,
    isDeleted: false,
  }));
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

  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Location | null>(null);
  const [selectedPlaces, setSelectedPlaces] = useState<Location[]>([]);

  const handleCardClick = (place: Location) => {
    setSelectedPlace(place);
    setIsDetailVisible(true);
  };

  const ResultsRef = useRef<HTMLDivElement | null>(null);
  const isResultVisible = useIntersectionObserver(ResultsRef);

  const parsingItem = () => {
    const contentType = DropBoxMenu.travelType.find(
      (item) => item.type === event,
    );

    const sigungu = DropBoxMenu.regionType.find(
      (item) => item.type === searchContent,
    );

    return {
      contentTypeId: contentType?.id ?? '12',
      sigunguCode: sigungu?.id ?? '1',
      dayTimes: [
        'MORNING',
        'MIDNOON',
        'AFTERNOON',
        'EVENING',
      ] as ScheduleTimeFromServer[],
      tourDate: new Date().toISOString().slice(0, 10),
    };
  };

  const {
    mutate: recommend,
    status,
    data: recommendData,
  } = useRecommendDayTrip();

  useEffect(() => {
    recommend(parsingItem());
  }, [event]);

  const parsingSchedule = () => ({
    tourLogData: {
      id: Math.floor(Math.random() * Date.now()),
      name: searchContent,
      locationName: searchContent,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
    },
    tourActivityDataList: transformTourActivityData(
      selectedPlaces,
      DropBoxMenu.regionType.find((item) => item.type === searchContent)?.id ??
        '',
    ),
  });

  const { mutate: createSchedule } = useCreateTripSchedule(parsingSchedule());

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
            isLoading={status === 'pending'}
            recommendData={recommendData}
            isDetailVisible={isDetailVisible}
            selectedPlace={selectedPlace}
            selectedPlaces={selectedPlaces}
            setSelectedPlaces={setSelectedPlaces}
            setIsDetailVisible={setIsDetailVisible}
            handleCardClick={handleCardClick}
            createSchedule={createSchedule}
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
      <SearchBox setContent={setContent} dropBoxType='travelType' />
    </styles.container>
  );
}

function Results({
  locations,
  onCardClick,
  selectedPlaces,
  createSchedule,
}: {
  locations: TripItem[];
  onCardClick: (place: Location) => void;
  selectedPlaces: Location[];
  createSchedule: () => void;
}) {
  return (
    <styles.container>
      <styles.resultCon>
        <styles.description>이런 곳 어떠세요?</styles.description>
        <styles.cardList>
          {locations.map((location) => (
            <LoadingCard
              key={location.contentId}
              title={location.title}
              imageUrl={location.imageUrl}
              onClick={() => onCardClick({ item: location })}
              isSelected={selectedPlaces.some(
                (p) => p.item.contentId === location.contentId,
              )}
            />
          ))}
        </styles.cardList>
      </styles.resultCon>
      <styles.travel>
        <li>
          <p>오전</p>
          <span>
            {selectedPlaces.find((p) => p.time === '오전')?.item.title ?? ''}
          </span>
        </li>
        <li>
          <p>오후</p>
          <span>
            {selectedPlaces.find((p) => p.time === '오후')?.item.title ?? ''}
          </span>
        </li>
        <li>
          <p>저녁</p>
          <span>
            {selectedPlaces.find((p) => p.time === '저녁')?.item.title ?? ''}
          </span>
        </li>
        <li>
          <p>밤</p>
          <span>
            {selectedPlaces.find((p) => p.time === '밤')?.item.title ?? ''}
          </span>
        </li>
      </styles.travel>
      <CustomButton
        text='여행 완성'
        color='#5E5BDA'
        onClick={() => {
          createSchedule();
        }}
      />
    </styles.container>
  );
}

interface AutoProps {
  isLoading: boolean;
  recommendData?: PostDayTripResponseDTO;
  isDetailVisible: boolean;
  selectedPlace: Location | null;
  selectedPlaces: Location[];
  setSelectedPlaces: (updateFn: (places: Location[]) => Location[]) => void;
  setIsDetailVisible: (i: boolean) => void;
  handleCardClick: (place: Location) => void;
  createSchedule: () => void;
}

function ResultWrapper({
  isLoading,
  recommendData,
  isDetailVisible,
  selectedPlace,
  selectedPlaces,
  setSelectedPlaces,
  setIsDetailVisible,
  handleCardClick,
  createSchedule,
}: AutoProps) {
  if (isLoading) {
    return <Loading />;
  }

  if (!isDetailVisible) {
    return (
      <Results
        locations={recommendData?.data ?? []}
        onCardClick={handleCardClick}
        selectedPlaces={selectedPlaces}
        createSchedule={createSchedule}
      />
    );
  }

  return (
    <DetailCard
      place={
        selectedPlace ?? {
          item: { contentId: '1', imageUrl: '', title: '', contentTypeId: '1' },
        }
      }
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

  travel: styled.ul`
    display: flex;
    width: 100%;
    flex-direction: column;

    color: #505050;

    text-align: center;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.02875rem;

    li {
      display: flex;
      gap: 1rem;
      border-bottom: 1px solid #e2e2e2;
      padding: 0.3rem 0;
      align-items: center;
    }

    p {
      width: 20%;
    }

    span {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: start;
    }
  `,
};
