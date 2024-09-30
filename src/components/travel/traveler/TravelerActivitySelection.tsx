'use client';

import styled from '@emotion/styled';

import { CustomButton, SearchBox } from '@/components';
import { useToast } from '@/features/toast';
import { postDayTrip } from '@/features/trip';
import { useTripStore } from '@/features/trip/trip.slice';

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

export function TravelerActivitySelection({
  onPrevPage,
  onNextPage,
}: {
  onPrevPage: () => void;
  onNextPage: () => void;
}) {
  const {
    tourInfo,
    recommendContent,
    setIsLoading,
    setRecommendContent,
    setRecommendedItems,
  } = useTripStore();

  const { createToast } = useToast();

  return (
    <styles.container>
      <styles.header>
        <styles.prevButton
          src='/chevron-left.svg'
          alt='chevron-left'
          onClick={onPrevPage}
        />
      </styles.header>
      <styles.caption>나머지 일정도 추천해드릴게요.</styles.caption>
      <styles.description>어떤 활동을 하고 싶으세요?</styles.description>
      <styles.SearchBox
        dropBoxType='travelType'
        setContent={(value) => {
          setRecommendContent(value);
        }}
        onClick={() => {
          setIsLoading(true);

          postDayTrip({
            tourDate: new Date().toISOString(),
            sigunguCode: String(
              types.regionType.find(
                (region) => region.type === tourInfo.locationName,
              )?.id ?? '1',
            ),
            contentTypeId: String(
              types.travelType.find(
                (region) => region.type === recommendContent,
              )?.id ?? '1',
            ),
            dayTimes: ['MORNING', 'AFTERNOON', 'EVENING', 'NIGHT'],
          })
            .then((res) => {
              setRecommendedItems(res.data);
            })
            .catch(() => {
              createToast('error', '오류가 발생했습니다. 다시 시도해주세요.');
              onPrevPage();
            })
            .finally(() => {
              setIsLoading(false);
            });

          onNextPage();
        }}
      />
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    flex: 1 0 0;
    width: 100%;
    height: 100%;
    gap: 2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  caption: styled.p`
    font-family: Noto Sans KR;
    font-size: 20px;
    font-weight: 700;
    line-height: 28.96px;
    letter-spacing: -0.02em;

    color: #505050;
  `,

  description: styled.p`
    font-family: Noto Sans KR;
    font-size: 23px;
    font-weight: 700;
    line-height: 33.3px;
    letter-spacing: -0.02em;

    color: #505050;

    margin-top: auto;
  `,

  CustomButton: styled(CustomButton)`
    margin-bottom: auto;
  `,

  header: styled.div`
    align-self: flex-start;
    display: flex;
    position: fixed;
    gap: 0.5rem;
    transform: translateY(50%);
  `,

  prevButton: styled.img`
    width: 1rem;
    height: 1rem;
  `,

  SearchBox: styled(SearchBox)`
    margin-bottom: auto;
  `,
};
