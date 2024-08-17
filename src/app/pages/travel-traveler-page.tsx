'use client';

import { useEffect, useReducer, useState } from 'react';

import { TravelComponent } from '@/components';
import { ChoiceList } from '@/components/travel';
import {
  TravelModeLogo,
  TravelerActivitySelection,
  TravelerAddDays,
  TravelerHeaderText,
  TravelerMain,
  TravelerScheduleConfirm,
  TravelerTimeSelection,
  TravelerTravelArrange,
  TravelerTravelReview,
} from '@/components/travel/traveler';
import { useTravelScheduleStore } from '@/providers';

type UIState =
  | 'traveler-main'
  | 'traveler-add-days'
  | 'traveler-time-selection'
  | 'traveler-activity-selection'
  | 'traveler-travel-schedule-confirm'
  | 'traveler-travel-schedule-arrange'
  | 'traveler-travel-review';

type UIAction = { type: 'NEXT' } | { type: 'PREV' };

const transitionMap: { [key in UIState]: { NEXT?: UIState; PREV?: UIState } } =
  {
    'traveler-main': { NEXT: 'traveler-add-days' },
    'traveler-add-days': {
      NEXT: 'traveler-time-selection',
      PREV: 'traveler-main',
    },
    'traveler-time-selection': {
      NEXT: 'traveler-activity-selection',
      PREV: 'traveler-add-days',
    },
    'traveler-activity-selection': {
      NEXT: 'traveler-travel-schedule-confirm',
      PREV: 'traveler-time-selection',
    },
    'traveler-travel-schedule-confirm': {
      NEXT: 'traveler-travel-schedule-arrange',
      PREV: 'traveler-activity-selection',
    },
    'traveler-travel-schedule-arrange': {
      NEXT: 'traveler-travel-review',
      PREV: 'traveler-travel-schedule-confirm',
    },
    'traveler-travel-review': { PREV: 'traveler-travel-schedule-arrange' },
  };

const uiReducer = (state: UIState, action: UIAction): UIState => {
  const nextState = transitionMap[state][action.type];
  return nextState ?? state;
};

export function TravelerPage() {
  const schedules = useTravelScheduleStore((state) => state.schedules);
  const addDaySchedule = useTravelScheduleStore(
    (state) => state.addDaySchedule,
  );
  const addDestination = useTravelScheduleStore(
    (state) => state.addDestination,
  );
  const removeDestination = useTravelScheduleStore(
    (state) => state.removeDestination,
  );
  const updateDestination = useTravelScheduleStore(
    (state) => state.updateDestination,
  );

  const [selectedDay, setSelectedDay] = useState<number>();
  const [, setSelectedTimeRange] = useState<Set<number>>();

  const [uiState, dispatch] = useReducer(uiReducer, 'traveler-main');

  const backgroundNode = () => {
    switch (uiState) {
      case 'traveler-main':
        return <TravelModeLogo />;
      case 'traveler-add-days':
      case 'traveler-time-selection':
      case 'traveler-activity-selection':
        return <ChoiceList choiceList={{ where: '부산광역시 (Busan)' }} />;
      case 'traveler-travel-schedule-confirm':
        return <TravelerHeaderText text='여행지를 수정하세요 :)' />;
      case 'traveler-travel-schedule-arrange':
        return <TravelerHeaderText text='여행을 정리할게요!' />;
      case 'traveler-travel-review':
        return <TravelerHeaderText text='여행은 어땠나요?' />;
    }
  };

  const childNode = () => {
    switch (uiState) {
      case 'traveler-main':
        return <TravelerMain onClick={() => dispatch({ type: 'NEXT' })} />;
      case 'traveler-add-days':
        return (
          <TravelerAddDays
            schedules={schedules}
            onAddDaySchedule={addDaySchedule}
            onChangeNextUI={(day) => {
              setSelectedDay(day);
              dispatch({ type: 'NEXT' });
            }}
          />
        );
      case 'traveler-time-selection':
        return (
          <TravelerTimeSelection
            day={selectedDay ?? 1}
            onChangeNextUI={(range) => {
              setSelectedTimeRange(range);
              dispatch({ type: 'NEXT' });
            }}
          />
        );
      case 'traveler-activity-selection':
        return (
          <TravelerActivitySelection
            onClick={() => dispatch({ type: 'NEXT' })}
          />
        );
      case 'traveler-travel-schedule-confirm':
        return (
          <TravelerScheduleConfirm
            where='부산광역시 (Busan)'
            schedules={schedules}
            onRemoveDestination={(day, destination) =>
              removeDestination({ day, destination })
            }
            onAddDestination={() => {}}
            onConfirm={() => dispatch({ type: 'NEXT' })}
          />
        );
      case 'traveler-travel-schedule-arrange':
        return (
          <TravelerTravelArrange
            where='부산광역시 (Busan)'
            schedules={schedules}
            onRecord={() => dispatch({ type: 'NEXT' })}
          />
        );
      case 'traveler-travel-review':
        return (
          <TravelerTravelReview
            when='2024.05.12-2024.05.13'
            where='부산광역시 (Busan)'
            schedules={schedules}
            onLikeButtonClick={(day, destination) => {
              updateDestination({
                day,
                target: destination,
                updateValue: {
                  ...destination,
                  selected:
                    destination.selected === 'like' ? undefined : 'like',
                },
              });
            }}
            onUnlikeButtonClick={(day, destination) => {
              updateDestination({
                day,
                target: destination,
                updateValue: {
                  ...destination,
                  selected:
                    destination.selected === 'unlike' ? undefined : 'unlike',
                },
              });
            }}
          />
        );
      default:
        return <></>;
    }
  };

  const type = (): 'traveler' | 'edit' => {
    switch (uiState) {
      case 'traveler-main':
      case 'traveler-add-days':
      case 'traveler-time-selection':
      case 'traveler-activity-selection':
        return 'traveler';
      default:
        return 'edit';
    }
  };

  useEffect(() => {
    if (uiState === 'traveler-add-days') {
      addDaySchedule();
      addDaySchedule();
    }
    if (uiState === 'traveler-travel-schedule-confirm') {
      addDestination({
        day: 1,
        destination: {
          id: 'test',
          name: 'test',
          endDate: new Date(),
          startDate: new Date(),
          timeToDestination: 10,
        },
      });
      addDestination({
        day: 2,
        destination: {
          id: 'test',
          name: 'test',
          endDate: new Date(),
          startDate: new Date(),
          timeToDestination: 10,
        },
      });
    }
  }, [addDaySchedule, addDestination, uiState]);

  return (
    <TravelComponent
      contents={{
        backgroundNode: backgroundNode(),
        childNode: childNode(),
        type: type(),
      }}
    />
  );
}
