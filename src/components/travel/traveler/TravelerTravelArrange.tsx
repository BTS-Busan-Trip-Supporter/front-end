'use client';

import styled from '@emotion/styled';

import { DaySchedule, Destination } from '@/features/travel-schedule';

export function TravelerTravelArrange({
  schedules,
  where,
  onRecord,
}: {
  schedules: DaySchedule[];
  where: string;
  onRecord: () => void;
}) {
  return (
    <styles.container>
      <styles.location>{where}</styles.location>
      {schedules.map((schedule, index) => (
        <DayScheduleItem
          key={index}
          day={index + 1}
          destinations={schedule.destinations}
        />
      ))}
      <button onClick={onRecord}>
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
  destinations,
}: {
  day: number;
  destinations: Destination[];
}) {
  return (
    <styles.daySchedule>
      <h2>{day}일차</h2>
      <ul>
        {destinations.map((destination) => (
          <DestinationItem key={destination.id} destination={destination} />
        ))}
      </ul>
    </styles.daySchedule>
  );
}

function DestinationItem({ destination }: { destination: Destination }) {
  const DashedLine = () => (
    <svg>
      <line x1='0' y1='5' x2='100%' y2='5' />
    </svg>
  );

  const LocationAndTime = () => (
    <div>
      {/* ICON */}
      <p data-location>{destination.name}</p>
      <span className='dashed'>
        <DashedLine />
      </span>
      <p data-time>
        {convertTimeString(destination.startDate)} -
        {convertTimeString(destination.endDate)}
      </p>
    </div>
  );

  const TimeToDestination = () => (
    <div style={{ width: '100%', gap: '6px' }}>
      <img src='/location-pin.svg' alt='location pin image' />
      <p data-timeToDestination>{destination.timeToDestination}분</p>
    </div>
  );

  return (
    <styles.destinationItem>
      <div className='column'>
        <LocationAndTime />
        <TimeToDestination />
      </div>
    </styles.destinationItem>
  );
}

const convertTimeString = (date: Date) =>
  `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

const styles = {
  container: styled.div`
    flex: 1 0 0;

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 39px;

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

    p[data-timeToDestination] {
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
};
