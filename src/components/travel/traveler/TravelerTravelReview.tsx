'use client';

import styled from '@emotion/styled';

import type { DaySchedule, Destination } from '@/features/travel-schedule';

export function TravelerTravelReview({
  where,
  when,
  schedules,
  onLikeButtonClick,
  onUnlikeButtonClick,
}: {
  where: string;
  when: string;
  schedules: DaySchedule[];
  onLikeButtonClick: (day: number, destination: Destination) => void;
  onUnlikeButtonClick: (day: number, destination: Destination) => void;
}) {
  return (
    <styles.container>
      <styles.location>
        {where}, {when}
      </styles.location>
      {schedules.map((schedule, index) => (
        <DayScheduleItem
          key={index}
          day={index + 1}
          destinations={schedule.destinations}
          onLikeButtonClick={onLikeButtonClick}
          onUnlikeButtonClick={onUnlikeButtonClick}
        />
      ))}
    </styles.container>
  );
}

function DayScheduleItem({
  day,
  destinations,
  onLikeButtonClick,
  onUnlikeButtonClick,
}: {
  day: number;
  destinations: Destination[];
  onLikeButtonClick: (day: number, destination: Destination) => void;
  onUnlikeButtonClick: (day: number, destination: Destination) => void;
}) {
  const handleLikeButtonClick = (destination: Destination) => {
    onLikeButtonClick(day, destination);
  };

  const handleUnlikeButtonClick = (destination: Destination) => {
    onUnlikeButtonClick(day, destination);
  };

  return (
    <styles.daySchedule>
      <h2>{day}일차</h2>
      <ul>
        {destinations.map((destination) => (
          <DestinationItem
            key={destination.id}
            destination={destination}
            onLikeButtonClick={handleLikeButtonClick}
            onUnlikeButtonClick={handleUnlikeButtonClick}
          />
        ))}
      </ul>
    </styles.daySchedule>
  );
}

function DestinationItem({
  destination,
  onLikeButtonClick,
  onUnlikeButtonClick,
}: {
  destination: Destination;
  onLikeButtonClick: (destination: Destination) => void;
  onUnlikeButtonClick: (destination: Destination) => void;
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
  }

  function LikeButton() {
    return (
      <styles.likeButton
        $selected={destination.selected === 'like'}
        onClick={() => onLikeButtonClick(destination)}
      >
        <img src='/button/like.png' alt='like' />
      </styles.likeButton>
    );
  }

  function UnlikeButton() {
    return (
      <styles.likeButton
        $selected={destination.selected === 'unlike'}
        onClick={() => onUnlikeButtonClick(destination)}
      >
        <img data-unlike src='/button/like.png' alt='unlike' />
      </styles.likeButton>
    );
  }

  function ReviewButtons() {
    return (
      <styles.likeButtons>
        <LikeButton />
        <UnlikeButton />
      </styles.likeButtons>
    );
  }

  return (
    <styles.destinationItem>
      <div className='column'>
        <LocationAndTime />
        <ReviewButtons />
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

  likeButtons: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    gap: 7px;

    width: 100%;
  `,

  likeButton: styled.button<{ $selected: boolean }>`
    all: unset;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 22px;
    height: 22px;

    border: ${({ $selected }) =>
      $selected ? '0.5px solid transparent' : '0.5px solid #aaaaaa'};
    border-radius: 50%;

    background: ${({ $selected }) => ($selected ? '#625EE3' : '#ffffff')};

    img {
      width: 15px;
      height: 15px;
      filter: ${({ $selected }) =>
        $selected
          ? 'invert(100%) brightness(200%);'
          : 'invert(100%) brightness(50%);'};
    }

    img[data-unlike] {
      transform: rotate(180deg);
    }
  `,
};
