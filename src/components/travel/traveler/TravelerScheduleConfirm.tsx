'use client';

import styled from '@emotion/styled';
import { useState } from 'react';

import { useToast } from '@/features/toast';
import {
  getTripSchedule,
  postTripSchedule,
  TIME_STRING,
} from '@/features/trip';
import type { Activity } from '@/features/trip/trip.slice';
import { useTripStore } from '@/features/trip/trip.slice';

export function TravelerScheduleConfirm({
  onNextPage,
  onPrevPage,
  onRecommendPage,
}: {
  onNextPage: () => void;
  onPrevPage: () => void;
  onRecommendPage: (day: number) => void;
}) {
  const { tourInfo, activities, setIsLoading, load } = useTripStore();

  const [enabled, setEnabled] = useState<boolean>(true);

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
      <styles.location>{tourInfo.locationName}</styles.location>
      {activities.map((acts, index) => (
        <DayScheduleItem
          key={index}
          day={index + 1}
          activities={acts}
          onAddActivityButtonClick={() => {
            onRecommendPage(index + 1);
          }}
        />
      ))}
      <styles.confirmButton
        onClick={() => {
          if (!enabled) return;

          if (
            !tourInfo.name ||
            !tourInfo.locationName ||
            !tourInfo.startTime ||
            !tourInfo.endTime
          )
            return;

          if (activities.some((v) => v.length === 0)) {
            createToast('info', '장소를 한 개 이상 선택해주세요');
            return;
          }

          postTripSchedule({
            tourLogData: {
              name: tourInfo.name,
              locationName: tourInfo.locationName,
              startTime: tourInfo.startTime.toISOString().slice(0, -5),
              endTime: tourInfo.endTime.toISOString().slice(0, -5),
            },
            tourActivityDataList: activities.flat().map((act) => ({
              spotName: act.spotName,
              dayNumber: act.dayNumber,
              dayTime: act.dayTime,
              orderIndex: 0,
              tourSpotData: {
                contentId: act.tourSpotDto.id,
                contentTypeId: act.tourSpotDto.typeId,
              },
            })),
          })
            .then((res) => {
              const { data: logId } = res;

              setIsLoading(true);
              getTripSchedule(logId)
                .then((dto) => {
                  load(dto);
                  onNextPage();
                })
                .catch(() => {
                  createToast('error', '다시 시도해주세요.');
                })
                .finally(() => {
                  setIsLoading(false);
                });
            })
            .finally(() => setEnabled(false));
        }}
      >
        여행 완성
      </styles.confirmButton>
    </styles.container>
  );
}

function DayScheduleItem({
  day,
  activities,
  onAddActivityButtonClick,
}: {
  day: number;
  activities: Activity[];
  onAddActivityButtonClick: () => void;
}) {
  return (
    <styles.daySchedule>
      <h2>{day}일차</h2>
      <ul>
        {activities.map((activity) => (
          <DestinationItem
            key={`${activity.dayTime}-${activity.spotName}`}
            day={day}
            activity={activity}
          />
        ))}
        {activities.length < 4 && (
          <AddDestinationButton onClick={onAddActivityButtonClick} />
        )}
      </ul>
    </styles.daySchedule>
  );
}

function DestinationItem({
  day,
  activity,
}: {
  day: number;
  activity: Activity;
}) {
  const { removeActivity } = useTripStore();

  return (
    <styles.destinationItem>
      <button
        type='button'
        onClickCapture={() => removeActivity(day, activity)}
      >
        <img
          src='/traveler-mode-delete-button.svg'
          alt='button to remove destination'
        />
      </button>
      <p data-location>{activity.spotName}</p>
      <p data-time>
        {day}일차 {TIME_STRING[activity.dayTime]}
      </p>
    </styles.destinationItem>
  );
}

function AddDestinationButton({ onClick }: { onClick: () => void }) {
  return (
    <styles.addDestinationButton onClick={onClick}>
      <img
        src='/traveler-mode-add-button.svg'
        alt='button to add destination'
      />
    </styles.addDestinationButton>
  );
}

const styles = {
  container: styled.div`
    flex: 1 0 0;

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: start;

    gap: 39px;

    overflow-y: auto;
    padding-top: 10px;
  `,

  location: styled.h1`
    font-family: Noto Sans KR;
    font-size: 16px;
    font-weight: 500;
    line-height: 23.17px;
    letter-spacing: -0.03em;
    text-align: left;

    color: #969696;
  `,

  daySchedule: styled.div`
    width: 100%;
    height: fit-content;

    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 16px;

    button {
      all: unset;
      cursor: pointer;

      display: flex;
      align-items: center;
    }

    h2 {
      font-family: Noto Sans KR;
      font-size: 20px;
      font-weight: 700;
      line-height: 28.96px;
      text-align: center;

      color: #7d7d7d;
    }

    ul {
      width: 100%;
      height: fit-content;
      border-radius: 10px;

      display: flex;
      flex-direction: column;
      gap: 14px;

      background: white;
      box-shadow: 2px 4px 1px 0px #0000000f;

      padding: 23px 10px;
    }
  `,

  destinationItem: styled.li`
    width: 100%;
    height: fit-content;

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;

    p[data-location] {
      flex: 1 0 0;

      font-family: Noto Sans KR;
      font-size: 15px;
      font-weight: 700;
      line-height: 21.72px;
      text-align: left;

      color: #7d7d7d;
    }

    p[data-time] {
      font-family: Noto Sans KR;
      font-size: 15px;
      font-weight: 500;
      line-height: 21.72px;
      text-align: left;

      color: #a2a2a2;
    }
  `,

  addDestinationButton: styled.button`
    all: unset;
    cursor: pointer;

    flex: 1 0 0;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
  `,

  confirmButton: styled.button`
    all: unset;
    cursor: pointer;

    width: fit-content;
    height: fit-content;
    border-radius: 130px;
    padding: 0.5rem 1.25rem;

    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;

    background: #5e5bda;

    font-family: Noto Sans KR;
    font-size: 16px;
    font-weight: 700;
    line-height: 28.96px;
    letter-spacing: -0.02em;
    text-align: center;

    color: #ffffff;

    margin-top: 43px;
  `,

  header: styled.div`
    display: flex;
    position: relative;
    align-items: center;
    gap: 0.5rem;
  `,

  prevButton: styled.img`
    width: 1rem;
    height: 1rem;
  `,
};
