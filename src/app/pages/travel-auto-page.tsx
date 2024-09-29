'use client';

import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

import {
  CustomButton,
  LoadingCard,
  ScrollMotion,
  SearchBox,
  TravelComponent,
} from '@/components';
import { ChoiceList, DetailCard, Loading } from '@/components/travel';
import { useToast } from '@/features/toast';
import {
  DropBoxMenu,
  type PostDayTripResponseDTO,
  type ScheduleTimeFromServer,
  type TripItem,
  useCreateTripSchedule,
  useRecommendDayTrip,
} from '@/features/trip';
import { useIntersectionObserver } from '@/shared';

type Times = '오전' | '오후' | '저녁' | '밤' | '기본';

interface Location {
  item: TripItem;
  selected?: boolean;
  time?: Times;
}

function convertTime(
  time: Times | undefined,
): 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT' {
  switch (time) {
    case '오전':
      return 'MORNING';
    case '오후':
      return 'AFTERNOON';
    case '저녁':
      return 'EVENING';
    case '밤':
      return 'NIGHT';
    default:
      return 'MORNING';
  }
}

function transformTourActivityData(selectedPlaces: Location[]) {
  return selectedPlaces.map((place) => ({
    spotName: place.item.title,
    dayNumber: 1,
    dayTime: convertTime(place.time),
    orderIndex: 1,
    tourSpotData: {
      contentId: place.item.contentId,
      contentTypeId: place.item.contentTypeId,
    },
  }));
}

export function TravelAutoPage() {
  const { createToast } = useToast();
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
        'AFTERNOON',
        'EVENING',
        'NIGHT',
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
    if (event !== '') recommend(parsingItem());
  }, [event]);

  const parsingSchedule = () => ({
    tourLogData: {
      name: searchContent,
      locationName: searchContent,
      startTime: new Date().toISOString().slice(0, -5),
      endTime: new Date().toISOString().slice(0, -5),
    },
    tourActivityDataList: transformTourActivityData(selectedPlaces),
  });

  const { mutate: createSchedule, status: isCreate } =
    useCreateTripSchedule(parsingSchedule());

  useEffect(() => {
    if (isCreate === 'success')
      createToast('success', '여행이 완성되었습니다!');
    else if (isCreate === 'error')
      createToast('error', '여행이 완성되지 않았습니다.');
  }, [isCreate]);

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
        <div ref={ResultsRef} className='result-wrapper'>
          <ResultWrapper
            isLoading={status === 'pending'}
            isError={status === 'error'}
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
  isError,
  locations,
  onCardClick,
  selectedPlaces,
  createSchedule,
}: {
  isError: boolean;
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
          {isError ? (
            <styles.description
              style={{ fontSize: '1rem', fontWeight: '500', marginTop: '3rem' }}
            >
              추천 데이터가 없습니다
            </styles.description>
          ) : (
            locations.map((location) => (
              <LoadingCard
                key={location.contentId}
                title={location.title}
                imageUrl={location.imageUrl}
                onClick={() => onCardClick({ item: location })}
                isSelected={selectedPlaces.some(
                  (p) => p.item.contentId === location.contentId,
                )}
              />
            ))
          )}
        </styles.cardList>
      </styles.resultCon>
      {!isError && (
        <>
          <styles.travel>
            <li>
              <p>오전</p>
              <span>
                {selectedPlaces.find((p) => p.time === '오전')?.item.title ??
                  ''}
              </span>
            </li>
            <li>
              <p>오후</p>
              <span>
                {selectedPlaces.find((p) => p.time === '오후')?.item.title ??
                  ''}
              </span>
            </li>
            <li>
              <p>저녁</p>
              <span>
                {selectedPlaces.find((p) => p.time === '저녁')?.item.title ??
                  ''}
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
        </>
      )}
    </styles.container>
  );
}

interface AutoProps {
  isLoading: boolean;
  isError: boolean;
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
  isError,
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
    return <Loading type='travel' />;
  }

  if (!isDetailVisible) {
    return (
      <Results
        isError={isError}
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
    height: calc(100% - 35px);
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: y mandatory;

    &::-webkit-scrollbar {
      display: none;
    }

    .result-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,

  container: styled.div`
    width: 100%;
    height: 100%;
    gap: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    scroll-snap-align: start;
    overflow-y: scroll;
    padding: 1rem 0;
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
    height: 100%;
    align-items: flex-start;
    justify-content: center;
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
    height: 100%;
    justify-content: center;
    align-items: center;
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
      width: 100%;
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
