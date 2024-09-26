'use client';

import styled from '@emotion/styled';
import { useState } from 'react';

import { TravelerLocationConfirm } from '@/components/travel/traveler/TravelerLocationConfirm';
import { TravelerLocationSearch } from '@/components/travel/traveler/TravelerLocationSearch';
import type { DaySchedule, Destination } from '@/features/travel-schedule';

export function TravelerTravelArrange({
  schedules,
  where,
  onNextPage,
}: {
  schedules: DaySchedule[];
  where: string;
  onNextPage: () => void;
}) {
  const [state, setState] = useState<{
    ui: 'main' | 'search' | 'confirm';
    day?: number;
    searchContent?: string;
    location?: string;
    time?: 'morning' | 'afternoon' | 'evening' | 'night';
  }>({ ui: 'main' });

  return (
    <>
      {state.ui === 'main' && (
        <styles.container>
          <styles.location>{where}</styles.location>
          {schedules.map((schedule, index) => (
            <DayScheduleItem
              key={index}
              day={index + 1}
              destinations={schedule.destinations}
            />
          ))}
          <button type='button' onClick={onNextPage}>
            <div>
              <img
                src='/traveler-write-record.svg'
                alt='button to write review'
              />
              <p>기록하기</p>
            </div>
          </button>
        </styles.container>
      )}
      {state.ui === 'search' && (
        <TravelerLocationSearch
          onClick={() => setState((prev) => ({ ...prev, ui: 'confirm' }))}
          onContentChange={(value) =>
            setState((prev) => ({ ...prev, searchContent: value }))
          }
        />
      )}
      {state.ui === 'confirm' && state.day && state.location && (
        <TravelerLocationConfirm
          location={state.location}
          day={state.day}
          selectedTime={state.time}
          onTimeClicked={(time) => {
            if (
              state.day &&
              !schedules[state.day - 1].destinations.find(
                (destination) => destination.time === time,
              )
            ) {
              setState((prev) => ({ ...prev, time }));
            }
          }}
          onConfirm={() => {
            // onAddDestination({});
            setState(() => ({ ui: 'main' }));
          }}
        />
      )}
    </>
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
        <p data-location>{destination.name}</p>
        <span className='dashed'>
          <DashedLine />
        </span>
        <p data-time>{convertTimeString[destination.time]}</p>
      </div>
    );
  }

  function TimeToDestination() {
    return (
      <div style={{ width: '100%', gap: '6px' }}>
        <img src='/location-pin.svg' alt='location pin' />
        <p data-timetodestination>{destination.timeToDestination}분</p>
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

const convertTimeString: Record<
  'morning' | 'afternoon' | 'evening' | 'night',
  string
> = {
  morning: '오전',
  afternoon: '오후',
  evening: '저녁',
  night: '밤',
};

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
};
