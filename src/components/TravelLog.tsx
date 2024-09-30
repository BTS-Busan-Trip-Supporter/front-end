'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Loading } from './travel/Loading';
import { ReviewCard } from './travel/ReviewCard';

import {
  type TourActivityDTO,
  translateDayTime,
  useTripSchedule,
  useUpdateActivityHistory,
  useUpdateActivityRecommend,
} from '@/features/trip';
import { convertDate, getDayOfWeek, getMonthAndDate } from '@/shared';

const groupByDayNumber = (
  data: TourActivityDTO[],
): Record<number, TourActivityDTO[]> =>
  data.reduce((acc: Record<number, TourActivityDTO[]>, item) => {
    if (!acc[item.dayNumber]) {
      acc[item.dayNumber] = [];
    }
    acc[item.dayNumber].push(item);
    return acc;
  }, {});

export function TravelLog({ selectedTravel }: { selectedTravel: number }) {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const { data: tripSchedule, status } = useTripSchedule(selectedTravel);
  const [groupedData, setGroupedData] = useState<
    Record<number, TourActivityDTO[]>
  >([]);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 1;

  const { mutate: updateReview } = useUpdateActivityHistory(selectedTravel);
  const { mutate: updateRecommend } =
    useUpdateActivityRecommend(selectedTravel);
  const [reviews, setReviews] = useState<Record<number, string | null>>({});
  const [recommends, setRecommends] = useState<Record<number, boolean | null>>(
    {},
  );

  const handleSetReview = (id: number, review: string | null) => {
    setReviews((prev) => ({
      ...prev,
      [id]: review,
    }));
    updateReview({
      tourActivityId: id,
      history: review,
    });
  };

  const handleSetRecommend = (id: number, recommend: boolean | null) => {
    setRecommends((prev) => ({
      ...prev,
      [id]: recommend,
    }));
    updateRecommend({
      tourActivityId: id,
      recommend,
    });
  };

  useEffect(() => {
    if (tripSchedule?.data?.tourActivityInfos) {
      setGroupedData(groupByDayNumber(tripSchedule.data.tourActivityInfos));
    }
  }, [tripSchedule]);

  return (
    <styles.wrapper>
      {status === 'pending' ? <Loading type='record' /> : null}
      {selectedDay === null ? (
        <>
          <styles.header>
            <styles.prevButton
              src='/chevron-left.svg'
              alt='chevron-left'
              onClick={() => {
                router.replace('/record');
              }}
            />
            <h3>
              {tripSchedule?.data.tourLogInfo.name},{' '}
              {convertDate(tripSchedule?.data.tourLogInfo.startTime ?? ' ')} -{' '}
              {convertDate(tripSchedule?.data.tourLogInfo.endTime ?? ' ')}
            </h3>
          </styles.header>
          <styles.logs>
            {Object.keys(groupedData).map((dayNumberString) => {
              const dayNumber = parseInt(dayNumberString, 10);
              const sortedActivities = groupedData[dayNumber].sort(
                (a, b) => a.orderIndex - b.orderIndex,
              );

              return (
                <styles.dayContainer key={dayNumber}>
                  <div className='dayNumCon'>
                    <p>{dayNumber}일차</p>
                    <span className='dates'>
                      {getMonthAndDate(
                        tripSchedule?.data.tourLogInfo.startTime ?? '',
                        dayNumber,
                      )}
                      {`(${getDayOfWeek(
                        tripSchedule?.data.tourLogInfo.startTime ?? '',
                        dayNumber,
                      )})`}
                    </span>
                    <button
                      type='button'
                      onClick={() => {
                        setSelectedDay(dayNumber);
                        setCurrentPage(0);
                      }}
                    >
                      기록하기
                    </button>
                  </div>
                  <div className='logCon'>
                    {sortedActivities.map((activity) => (
                      <li key={activity.id}>
                        <div className='contents'>
                          <styles.pin src='/gray-pin.svg' alt='gray-pin-icon' />
                          <styles.name $isHistory={activity.history}>
                            {activity.spotName}
                          </styles.name>
                          <span className='dotted-line' />
                          <p className='time'>
                            {translateDayTime(activity.dayTime)}
                          </p>
                        </div>
                        <div className='buttons'>
                          <styles.likeButton
                            $active={activity.recommend === true}
                          >
                            <img src='/button/like.png' alt='like' />
                          </styles.likeButton>
                          <styles.likeButton
                            $active={activity.recommend === false}
                          >
                            <img
                              src='/button/like.png'
                              alt='unlike'
                              data-unlike
                            />
                          </styles.likeButton>
                        </div>
                      </li>
                    ))}
                  </div>
                </styles.dayContainer>
              );
            })}
          </styles.logs>
        </>
      ) : (
        <>
          <styles.header>
            <styles.prevButton
              src='/chevron-left.svg'
              alt='chevron-left'
              onClick={() => {
                setSelectedDay(null);
              }}
            />
            <h3>{selectedDay}일차</h3>
          </styles.header>
          <styles.reviews>
            {groupedData[selectedDay]
              .slice(
                currentPage * itemsPerPage,
                (currentPage + 1) * itemsPerPage,
              )
              .map((spot) => (
                <ReviewCard
                  key={spot.id}
                  name={spot.spotName}
                  date={translateDayTime(spot.dayTime)}
                  review={
                    reviews[spot.id] !== undefined
                      ? reviews[spot.id]
                      : (spot.history ?? null)
                  }
                  onReviewChange={(newReview) =>
                    handleSetReview(spot.id, newReview)
                  }
                  recommend={
                    recommends[spot.id] !== undefined
                      ? recommends[spot.id]
                      : (spot.recommend ?? null)
                  }
                  onRecommendChange={(newRecommend) =>
                    handleSetRecommend(spot.id, newRecommend)
                  }
                />
              ))}
          </styles.reviews>
          <styles.pagination>
            {groupedData[selectedDay].map((_, index) => (
              <styles.paginationButton
                key={groupedData[selectedDay][index].id}
                onClick={() => setCurrentPage(index)}
                $active={currentPage === index}
              />
            ))}
          </styles.pagination>
        </>
      )}
    </styles.wrapper>
  );
}

interface ActiveProp {
  $active: boolean;
}

interface History {
  $isHistory?: string | null;
}

const styles = {
  wrapper: styled.div`
    flex: 1 0 0;

    width: 100%;
    padding: 2rem 0;
    gap: 2rem;
    display: flex;
    flex-direction: column;
    align-items: start;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  `,

  logs: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 2rem;
  `,

  dayContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;

    .dayNumCon {
      display: flex;
      gap: 0.5rem;
      width: 100%;
      align-items: center;

      p {
        color: #6864f1;
        text-align: center;
        font-family: 'Noto Sans KR';
        font-size: 1.25rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }

      .dates {
        color: #a2a2a2;
        font-family: 'Noto Sans KR';
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }

      button {
        color: #969696;
        font-family: 'Noto Sans KR';
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.03rem;
        text-decoration-line: underline;

        background-color: transparent;
        border: none;
      }
    }

    .logCon {
      padding: 1.5rem 1rem;
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 1.3rem;
      border-radius: 20px;
      box-shadow: 2px 4px 1px 0px rgba(0, 0, 0, 0.06);
      background-color: #fff;

      li {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        align-items: end;
        width: 100%;
      }

      .contents {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        width: 100%;
      }

      .buttons {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }

      .dotted-line {
        flex-grow: 1;
        border-bottom: 1px dashed #d3d3d3;
      }

      .time {
        color: #a2a2a2;
        font-family: 'Noto Sans KR';
        font-size: 0.9375rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        white-space: nowrap;
      }
    }
  `,

  name: styled.p<History>`
    color: #7d7d7d;
    font-family: 'Noto Sans KR';
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.01875rem;

    background-color: ${(props) =>
      props.$isHistory != null ? '#f5fca6' : 'transparent'};

    max-width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  pin: styled.img`
    width: 0.3125rem;
    height: 0.875rem;
    transform: translateY(10%);
  `,

  likeButton: styled.div<ActiveProp>`
    width: 1.375rem;
    height: 1.375rem;
    background-color: ${({ $active }) => ($active ? '#625ee3' : '#fff')};
    border-radius: 50%;
    border: ${({ $active }) => ($active ? 'none' : '0.5px solid #aaa')};
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 0.6875rem;
      height: 0.74481rem;
      filter: ${({ $active }) =>
        $active ? 'none' : 'grayscale(100%) brightness(0.5)'};
    }

    img[data-unlike] {
      transform: rotate(180deg);
    }
  `,

  header: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    h3 {
      color: #969696;
      font-family: 'Noto Sans KR';
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.03rem;
    }
  `,

  prevButton: styled.img`
    width: 0.7rem;
    height: 0.7rem;
  `,

  reviews: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    gap: 2rem;
  `,

  pagination: styled.div`
    width: 100%;
    display: flex;
    gap: 0.8rem;
    justify-content: center;
  `,

  paginationButton: styled.span<ActiveProp>`
    width: 0.67463rem;
    height: 0.67463rem;
    border: none;
    background-color: ${({ $active }) => ($active ? '#625ee3' : '#E2E2E2')};
    border-radius: 50%;
  `,
};
