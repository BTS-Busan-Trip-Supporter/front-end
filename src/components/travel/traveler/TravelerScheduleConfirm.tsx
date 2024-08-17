'use client';

import styled from '@emotion/styled';

import type { DaySchedule, Destination } from '@/features/travel-schedule';

export function TravelerScheduleConfirm({
  schedules,
  where,
  onRemoveDestination,
  onAddDestination,
  onConfirm,
}: {
  schedules: DaySchedule[];
  where: string;
  onRemoveDestination: (day: number, destination: Destination) => void;
  onAddDestination: () => void;
  onConfirm: () => void;
}) {
  return (
    <styles.container>
      <styles.location>{where}</styles.location>
      {schedules.map((schedule, index) => (
        <DayScheduleItem
          key={index}
          day={index + 1}
          schedule={schedule}
          onRemoveDestination={onRemoveDestination}
          onAddDestination={onAddDestination}
        />
      ))}
      <styles.confirmButton onClick={onConfirm}>여행 완성</styles.confirmButton>
    </styles.container>
  );
}

function DayScheduleItem({
  day,
  schedule,
  onRemoveDestination,
  onAddDestination,
}: {
  day: number;
  schedule: DaySchedule;
  onRemoveDestination: (day: number, destination: Destination) => void;
  onAddDestination: () => void;
}) {
  return (
    <styles.daySchedule>
      <h2>{day}일차</h2>
      <ul>
        {schedule.destinations.map((destination) => (
          <DestinationItem
            key={destination.id}
            day={day}
            destination={destination}
            onRemoveDestination={onRemoveDestination}
          />
        ))}
        <AddDestinationButton onAddDestination={onAddDestination} />
      </ul>
    </styles.daySchedule>
  );
}

function DestinationItem({
  day,
  destination,
  onRemoveDestination,
}: {
  day: number;
  destination: Destination;
  onRemoveDestination: (day: number, destination: Destination) => void;
}) {
  return (
    <styles.destinationItem>
      <button onClickCapture={() => onRemoveDestination(day, destination)}>
        <img
          src='/traveler-mode-delete-button.svg'
          alt='button to remove destination'
        />
      </button>
      <p data-location>{destination.name}</p>
      <p data-time>
        {convertTimeString(destination.startDate)} -
        {convertTimeString(destination.endDate)}
      </p>
    </styles.destinationItem>
  );
}

function AddDestinationButton({
  onAddDestination,
}: {
  onAddDestination: () => void;
}) {
  return (
    <styles.addDestinationButton onClick={onAddDestination}>
      <img
        src='/traveler-mode-add-button.svg'
        alt='button to add destination'
      />
    </styles.addDestinationButton>
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
    align-items: start;

    gap: 39px;

    overflow-y: auto;
    padding-top: 10px;
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
    padding: 16px 22px;

    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;

    background: #5e5bda;

    font-family: Noto Sans KR;
    font-size: 20px;
    font-weight: 700;
    line-height: 28.96px;
    letter-spacing: -0.02em;
    text-align: center;

    color: #ffffff;

    margin-top: 43px;
  `,
};
