'use client';

import styled from '@emotion/styled';

import { postTripSchedule, TIME_STRING } from '@/features/trip';
import type { Activity } from '@/features/trip/trip.slice';
import { useTripStore } from '@/features/trip/trip.slice';

export function TravelerTravelArrange({
  onNextPage,
  onPrevPage,
}: {
  onNextPage: () => void;
  onPrevPage: () => void;
}) {
  const { tourInfo, activities } = useTripStore();

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
        <DayScheduleItem key={index} day={index + 1} activities={acts} />
      ))}
      <button
        type='button'
        onClick={() => {
          if (
            !tourInfo.name ||
            !tourInfo.locationName ||
            !tourInfo.startTime ||
            !tourInfo.endTime
          )
            return;

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
          }).then(onNextPage);
        }}
      >
        <div>
          <img src='/traveler-write-record.svg' alt='button to write review' />
          <p>기록하기</p>
        </div>
      </button>
    </styles.container>
  );
}

function DayScheduleItem({
  day,
  activities,
}: {
  day: number;
  activities: Activity[];
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
  function DashedLine() {
    return (
      <svg>
        <line x1='0' y1='5' x2='100%' y2='5' />
      </svg>
    );
  }

  function LocationAndTime() {
    return (
      <div>
        {/* ICON */}
        <p data-location>{activity.spotName}</p>
        <span className='dashed'>
          <DashedLine />
        </span>
        <p data-time>
          {day}일차 {TIME_STRING[activity.dayTime]}
        </p>
      </div>
    );
  }

  function TimeToDestination() {
    return (
      <div style={{ width: '100%', gap: '6px' }}>
        <img src='/location-pin.svg' alt='location pin' />
        {/* <p data-timetodestination>{activity.timeToDestination}분</p> */}
      </div>
    );
  }

  return (
    <styles.destinationItem>
      <div className='column'>
        <LocationAndTime />
        <TimeToDestination />
      </div>
    </styles.destinationItem>
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

    button {
      all: unset;
      cursor: pointer;

      width: fit-content;
      align-self: center;

      padding: 11px 25px;
      border-radius: 11px;

      background: #5e5bda;
      color: #ffffff;

      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 6px;
      }
    }
  `,

  location: styled.h1`
    transform: translateY(20px);

    font-family: Noto Sans KR;
    font-size: 16px;
    font-weight: 500;
    line-height: 23.17px;
    letter-spacing: -0.03em;
    text-align: left;

    color: #969696;

    margin-top: 1rem;
  `,

  daySchedule: styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 16px;

    h2 {
      align-self: flex-start;

      font-family: Noto Sans KR;
      font-size: 20px;
      font-weight: 700;
      line-height: 28.96px;
      text-align: center;

      color: #6864f1;
    }

    ul {
      width: 100%;
      border-radius: 10px;

      display: flex;
      flex-direction: column;
      gap: 20px;

      background: #ffffff;
      box-shadow: 2px 4px 1px 0px #0000000f;

      padding: 23px 10px;
    }
  `,

  destinationItem: styled.li`
    width: 100%;

    .column {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: end;
    }

    p[data-location] {
      flex-shrink: 0;

      font-family: Noto Sans KR;
      font-size: 15px;
      font-weight: 700;
      line-height: 21.72px;
      letter-spacing: -0.02em;
      text-align: left;

      color: #7d7d7d;
    }

    p[data-time] {
      flex-shrink: 0;

      font-family: Noto Sans KR;
      font-size: 15px;
      font-weight: 500;
      line-height: 21.72px;
      text-align: left;

      color: #a2a2a2;
    }

    p[data-timetodestination] {
      flex-shrink: 0;

      font-family: Noto Sans KR;
      font-size: 14px;
      font-weight: 500;
      line-height: 20.27px;
      text-align: left;

      color: #605eff;
    }

    .dashed {
      flex-grow: 1;
      margin: 0 8px;
    }

    svg {
      width: 100%;
      height: 10px;
    }

    line {
      stroke: #d3d3d3;
      stroke-width: 2px;
      stroke-dasharray: 5, 5;
    }
  `,

  header: styled.div`
    display: flex;
    position: fixed;
    align-items: center;
    gap: 0.5rem;
  `,

  prevButton: styled.img`
    width: 1rem;
    height: 1rem;
  `,
};
