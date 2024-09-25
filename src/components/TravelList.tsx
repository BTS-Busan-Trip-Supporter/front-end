'use client';

import styled from '@emotion/styled';

interface TourLog {
  id: number;
  name: string;
  locationName: string;
  startTime: string;
  endTime: string;
}

const dummy: TourLog[] = [
  {
    id: 1,
    name: '부산 해운대',
    locationName: '해운대 해수욕장',
    startTime: '2024-09-25T08:00:00.000Z',
    endTime: '2024-09-25T10:00:00.000Z',
  },
  {
    id: 2,
    name: '감천 문화 마을',
    locationName: '부산 감천동',
    startTime: '2024-09-25T11:00:00.000Z',
    endTime: '2024-09-25T13:00:00.000Z',
  },
  {
    id: 3,
    name: '태종대',
    locationName: '부산 태종대 공원',
    startTime: '2024-09-25T14:00:00.000Z',
    endTime: '2024-09-25T15:30:00.000Z',
  },
  {
    id: 4,
    name: '광안리 해변',
    locationName: '광안리',
    startTime: '2024-09-25T16:00:00.000Z',
    endTime: '2024-09-25T18:00:00.000Z',
  },
  {
    id: 5,
    name: '송정 해수욕장',
    locationName: '송정',
    startTime: '2024-09-25T19:00:00.000Z',
    endTime: '2024-09-25T21:00:00.000Z',
  },
  {
    id: 6,
    name: '송정 해수욕장',
    locationName: '송정',
    startTime: '2024-09-25T19:00:00.000Z',
    endTime: '2024-09-25T21:00:00.000Z',
  },
];

function convertDate(isoString: string) {
  const date = new Date(isoString);

  return date
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
    .replace(/\.$/, '');
}

export function TravelList({
  onSelectTravel,
}: {
  onSelectTravel: (tour: {
    id: number;
    name: string;
    startTime: string;
    endTime: string;
  }) => void;
}) {
  return (
    <styles.wrapper>
      <h3>여행을 골라주세요</h3>
      <ul>
        {dummy.map((tour) => (
          <li key={tour.id}>
            <div className='contents'>
              <p className='name'>{tour.name}</p>
              <p className='time'>
                {convertDate(tour.startTime)} - {convertDate(tour.endTime)}
              </p>
            </div>
            <button
              type='button'
              onClick={() => {
                onSelectTravel({
                  id: tour.id,
                  name: tour.name,
                  startTime: convertDate(tour.startTime),
                  endTime: convertDate(tour.endTime),
                });
              }}
            >
              기록하기
            </button>
          </li>
        ))}
      </ul>
    </styles.wrapper>
  );
}

const styles = {
  wrapper: styled.div`
    flex: 1 0 0;
    width: 100%;
    max-height: 100%;
    padding: 1rem 0;
    gap: 1rem;
    display: flex;
    flex-direction: column;
    align-items: start;
    overflow-y: auto;

    h3 {
      width: 100%;
      color: #505050;
      text-align: center;
      font-family: 'Noto Sans KR';
      font-size: 1.4375rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.02875rem;
    }

    &::-webkit-scrollbar {
      display: none;
    }

    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    li {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2rem 0;
      border-bottom: 1px solid #d3d3d3;

      button {
        border: none;
        color: #969696;
        font-family: 'Noto Sans KR';
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.03rem;
        background-color: transparent;
      }
    }

    .contents {
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 0.3rem;
    }

    .name {
      color: #7d7d7d;
      font-family: 'Noto Sans KR';
      font-size: 0.9375rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.01875rem;
    }

    .time {
      color: #919191;
      text-align: center;
      font-family: 'Noto Sans KR';
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.0125rem;
    }
  `,
};
