'use client';

import styled from '@emotion/styled';
import { useState } from 'react';

import { ReviewCard } from './travel/ReviewCard';

import { ScheduleTimeFromServer } from '@/features/trip';

interface TourActivity {
  id: number;
  spotName: string;
  recommend: boolean;
  history: string;
  dayNumber: number;
  dayTime: ScheduleTimeFromServer;
  orderIndex: number;
  tourSpotDto: {
    id: string;
    typeId: string;
    title: string;
    sigunguCode: string;
  };
}

function translateDayTime(dayTime: string) {
  switch (dayTime) {
    case 'MORNING':
      return '오전';
    case 'AFTERNOON':
      return '오후';
    case 'EVENING':
      return '저녁';
    case 'NIGHT':
      return '밤';
    default:
      return dayTime;
  }
}

const dummy: TourActivity[] = [
  {
    id: 0,
    spotName: '대저생태공원',
    recommend: true,
    history: 'string',
    dayNumber: 0,
    dayTime: 'MORNING',
    orderIndex: 0,
    tourSpotDto: {
      id: 'string',
      typeId: 'string',
      title: 'string',
      sigunguCode: 'string',
    },
  },
  {
    id: 1,
    spotName: '스타필드 푸드코트',
    recommend: true,
    history: 'string',
    dayNumber: 0,
    dayTime: 'MORNING',
    orderIndex: 0,
    tourSpotDto: {
      id: 'string',
      typeId: 'string',
      title: 'string',
      sigunguCode: 'string',
    },
  },
  {
    id: 1,
    spotName: '전포 카페거리',
    recommend: true,
    history: 'string',
    dayNumber: 1,
    dayTime: 'MORNING',
    orderIndex: 0,
    tourSpotDto: {
      id: 'string',
      typeId: 'string',
      title: 'string',
      sigunguCode: 'string',
    },
  },
  {
    id: 1,
    spotName: '전포 카페거리',
    recommend: true,
    history: 'string',
    dayNumber: 1,
    dayTime: 'MORNING',
    orderIndex: 0,
    tourSpotDto: {
      id: 'string',
      typeId: 'string',
      title: 'string',
      sigunguCode: 'string',
    },
  },
  {
    id: 1,
    spotName: '전포 카페거리',
    recommend: true,
    history: 'string',
    dayNumber: 1,
    dayTime: 'MORNING',
    orderIndex: 0,
    tourSpotDto: {
      id: 'string',
      typeId: 'string',
      title: 'string',
      sigunguCode: 'string',
    },
  },
  {
    id: 1,
    spotName: '전포 카페거리',
    recommend: true,
    history: 'string',
    dayNumber: 1,
    dayTime: 'MORNING',
    orderIndex: 0,
    tourSpotDto: {
      id: 'string',
      typeId: 'string',
      title: 'string',
      sigunguCode: 'string',
    },
  },
  {
    id: 1,
    spotName: '전포 카페거리',
    recommend: true,
    history: 'string',
    dayNumber: 1,
    dayTime: 'MORNING',
    orderIndex: 0,
    tourSpotDto: {
      id: 'string',
      typeId: 'string',
      title: 'string',
      sigunguCode: 'string',
    },
  },
  {
    id: 1,
    spotName: '전포 카페거리',
    recommend: true,
    history: 'string',
    dayNumber: 1,
    dayTime: 'MORNING',
    orderIndex: 0,
    tourSpotDto: {
      id: 'string',
      typeId: 'string',
      title: 'string',
      sigunguCode: 'string',
    },
  },
  {
    id: 0,
    spotName: '대저생태공원',
    recommend: true,
    history: 'string',
    dayNumber: 0,
    dayTime: 'MORNING',
    orderIndex: 0,
    tourSpotDto: {
      id: 'string',
      typeId: 'string',
      title: 'string',
      sigunguCode: 'string',
    },
  },
  {
    id: 0,
    spotName: '대저생태공원',
    recommend: true,
    history: 'string',
    dayNumber: 0,
    dayTime: 'MORNING',
    orderIndex: 0,
    tourSpotDto: {
      id: 'string',
      typeId: 'string',
      title: 'string',
      sigunguCode: 'string',
    },
  },
  {
    id: 0,
    spotName: '대저생태공원',
    recommend: true,
    history: 'string',
    dayNumber: 0,
    dayTime: 'MORNING',
    orderIndex: 0,
    tourSpotDto: {
      id: 'string',
      typeId: 'string',
      title: 'string',
      sigunguCode: 'string',
    },
  },
  {
    id: 0,
    spotName: '대저생태공원',
    recommend: true,
    history: 'string',
    dayNumber: 0,
    dayTime: 'MORNING',
    orderIndex: 0,
    tourSpotDto: {
      id: 'string',
      typeId: 'string',
      title: 'string',
      sigunguCode: 'string',
    },
  },
  {
    id: 0,
    spotName: '대저생태공원대저생태공원대저생태공원대저생태공원',
    recommend: true,
    history: 'string',
    dayNumber: 0,
    dayTime: 'MORNING',
    orderIndex: 0,
    tourSpotDto: {
      id: 'string',
      typeId: 'string',
      title: 'string',
      sigunguCode: 'string',
    },
  },
];

export function TravelLog({
  selectedTravel,
  handlePrevButton,
}: {
  selectedTravel: {
    id: number;
    name: string;
    startTime: string;
    endTime: string;
  } | null;
  handlePrevButton: () => void;
}) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 1;

  const groupByDayNumber = (
    data: TourActivity[],
  ): Record<number, TourActivity[]> =>
    data.reduce((acc: Record<number, TourActivity[]>, item) => {
      if (!acc[item.dayNumber]) {
        acc[item.dayNumber] = [];
      }
      acc[item.dayNumber].push(item);
      return acc;
    }, {});

  const groupedData = groupByDayNumber(dummy);

  return (
    <styles.wrapper>
      {selectedDay === null ? (
        <>
          <styles.header>
            <styles.prevButton
              src='/chevron-left.svg'
              alt='chevron-left'
              onClick={handlePrevButton}
            />
            <h3>
              {selectedTravel?.name}, {selectedTravel?.startTime} -{' '}
              {selectedTravel?.endTime}
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
                          <p className='name'>{activity.spotName}</p>
                          <span className='dotted-line' />
                          <p className='time'>
                            {translateDayTime(activity.dayTime)}
                          </p>
                        </div>
                        <div className='buttons'>
                          <styles.likeButton $active>
                            <img src='/button/like.png' alt='like' />
                          </styles.likeButton>
                          <styles.likeButton $active={false}>
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
                  prevReview={spot.history}
                />
              ))}
          </styles.reviews>
          <styles.pagination>
            {groupedData[selectedDay].map((_, index) => (
              <styles.paginationButton
                key={index}
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
      gap: 0.3rem;
      width: 100%;

      p {
        color: #6864f1;
        text-align: center;
        font-family: 'Noto Sans KR';
        font-size: 1.25rem;
        font-style: normal;
        font-weight: 700;
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

      .name {
        color: #7d7d7d;
        font-family: 'Noto Sans KR';
        font-size: 0.9375rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: -0.01875rem;

        max-width: 50%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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

  pin: styled.img`
    width: 0.3125rem;
    height: 0.875rem;
    object-fit: content;
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
      object-fit: content;
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
    object-fit: content;
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
