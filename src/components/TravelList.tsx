'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';

import { useTripSchedules } from '@/features/trip';
import { convertDate } from '@/shared';

export function TravelList() {
  const router = useRouter();

  const { data: logs } = useTripSchedules();
  return (
    <styles.wrapper>
      <h3>여행을 골라주세요</h3>
      <ul>
        {logs?.data.tourLogInfos.length === 0 && (
          <p className='nonData'>
            P의 여행과
            <br />
            함께 여행해보세요!
          </p>
        )}
        {logs?.data.tourLogInfos.map((tour) => (
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
                router.replace(`/record/${tour.id}`);
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

    .nonData {
      color: #969696;

      text-align: center;
      font-family: 'Noto Sans KR';
      font-size: 1.4375rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.02875rem;
      margin-top: 13rem;
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
