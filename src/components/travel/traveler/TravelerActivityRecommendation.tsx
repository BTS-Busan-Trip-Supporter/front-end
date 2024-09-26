import styled from '@emotion/styled';

import { CustomButton, LoadingCard } from '@/components';

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

export function TravelerActivityRecommendation({
  onNextPage,
}: {
  onNextPage: () => void;
}) {
  return (
    <styles.container>
      <Results
        isLoading={false}
        locations={dummyLocations}
        nextLocations={dummyLocations}
      />
      <CustomButton color='#FF75C8' text='여행 완성' onClick={onNextPage} />
    </styles.container>
  );
}

function Results({
  isLoading,
  locations,
  nextLocations,
}: {
  isLoading: boolean;
  locations: Location[];
  nextLocations: Location[];
}) {
  return (
    <styles.container>
      <styles.resultCon>
        <styles.description>이런 곳 어떠세요?</styles.description>
        <styles.cardList>
          {locations.map((location) => (
            <LoadingCard
              key={location.id}
              dataLoading={isLoading}
              imageUrl={location.imageUrl}
            />
          ))}
        </styles.cardList>
      </styles.resultCon>
      <styles.resultCon>
        <styles.description>다른 활동들도 추천해드릴게요.</styles.description>
        <styles.cardList>
          {nextLocations.map((location) => (
            <LoadingCard
              key={location.id}
              dataLoading={isLoading}
              imageUrl={location.imageUrl}
            />
          ))}
        </styles.cardList>
      </styles.resultCon>
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 2rem;
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
