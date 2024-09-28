import styled from '@emotion/styled';
import { useState } from 'react';

import { CustomButton, LoadingCard } from '@/components';
import { DetailCard, Loading } from '@/components/travel';
import type { TripItem } from '@/features/trip';
import { useTripStore } from '@/features/trip/trip.slice';

type Times = '오전' | '오후' | '저녁' | '밤' | '기본';

interface Location {
  item: TripItem;
  selected?: boolean;
  time?: Times;
}

const types = {
  travelType: [
    { id: 12, type: '관광지' },
    { id: 14, type: '문화시설' },
    { id: 15, type: '축제공연행사' },
    { id: 28, type: '레포츠' },
    { id: 38, type: '쇼핑' },
    { id: 39, type: '음식점' },
  ],
  regionType: [
    { id: 1, type: '강서구' },
    { id: 2, type: '금정구' },
    { id: 3, type: '기장군' },
    { id: 4, type: '남구' },
    { id: 5, type: '동구' },
    { id: 6, type: '동래구' },
    { id: 7, type: '부산진구' },
    { id: 8, type: '북구' },
    { id: 9, type: '사상구' },
    { id: 10, type: '사하구' },
    { id: 11, type: '서구' },
    { id: 12, type: '수영구' },
    { id: 13, type: '연제구' },
    { id: 14, type: '영도구' },
    { id: 15, type: '중구' },
    { id: 16, type: '해운대구' },
  ],
};

export function TravelerActivityRecommendation({
  onNextPage,
}: {
  onNextPage: () => void;
}) {
  const { isRecommendLoading, tourInfo, recommendContent, fillActivities } =
    useTripStore();

  const [isDetailVisible, setIsDetailVisible] = useState(false);

  const [selectedPlace, setSelectedPlace] = useState<Location | null>(null);
  const [selectedPlaces, setSelectedPlaces] = useState<Location[]>([]);

  const handleCardClick = (place: Location) => {
    setSelectedPlace(place);
    setIsDetailVisible(true);
  };

  return (
    <styles.container>
      <ResultWrapper
        isLoading={isRecommendLoading}
        isDetailVisible={isDetailVisible}
        selectedPlace={selectedPlace}
        selectedPlaces={selectedPlaces}
        setSelectedPlaces={setSelectedPlaces}
        setIsDetailVisible={setIsDetailVisible}
        handleCardClick={handleCardClick}
      />
      {!setIsDetailVisible && (
        <CustomButton
          color='#FF75C8'
          text='여행 완성'
          onClick={() => {
            fillActivities(
              selectedPlaces.map((place) => ({
                dayTime: convertTimeString(place.time ?? '오전'),
                orderIndex: 0,
                dayNumber: 0,
                spotName: place.item.title,
                tourSpotDto: {
                  id: place.item.contentId,
                  sigunguCode: String(
                    types.regionType.find(
                      (region) => region.type === tourInfo.locationName,
                    )?.id ?? 1,
                  ),
                  title: place.item.title,
                  typeId: String(
                    types.travelType.find(
                      (travel) => travel.type === recommendContent,
                    )?.id ?? 1,
                  ),
                },
              })),
            );
            onNextPage();
          }}
        />
      )}
    </styles.container>
  );
}

interface Props {
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
}: Props) {
  const { recommendedItems } = useTripStore();

  if (isLoading) {
    return <Loading />;
  }

  if (!isDetailVisible) {
    return (
      <Results
        locations={recommendedItems.map((item) => ({
          item: {
            title: item.title,
            contentId: item.contentId,
            contentTypeId: item.contentTypeId,
            imageUrl: item.imageUrl,
          },
        }))}
        onCardClick={handleCardClick}
        selectedPlaces={selectedPlaces}
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

function Results({
  locations,
  onCardClick,
  selectedPlaces,
}: {
  locations: Location[];
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
              key={location.item.contentId}
              title={location.item.title}
              imageUrl={location.item.imageUrl}
              onClick={() => onCardClick(location)}
              isSelected={selectedPlaces.some(
                (p) => p.item.contentId === location.item.contentId,
              )}
            />
          ))}
        </styles.cardList>
      </styles.resultCon>
    </styles.container>
  );
}

const convertTimeString = (
  time: Times,
): 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT' => {
  if (time === '오전') {
    return 'MORNING';
  }
  if (time === '오후') {
    return 'AFTERNOON';
  }
  if (time === '저녁') {
    return 'EVENING';
  }
  if (time === '밤') {
    return 'NIGHT';
  }
  return 'MORNING';
};

const styles = {
  container: styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 2rem;

    margin-top: 2rem;
  `,

  description: styled.p`
    color: #505050;

    text-align: center;
    font-family: 'Noto Sans KR';
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.02875rem;
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
