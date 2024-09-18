'use client';

import { useReducer } from 'react';

import { TravelComponent } from '@/components';
import { ChoiceList } from '@/components/travel';
import {
  TravelerActivitySelection,
  TravelerAddDays,
  TravelerHeaderText,
  TravelerMain,
  TravelerScheduleConfirm,
  TravelerScheduleSelection,
  TravelerTravelArrange,
  TravelerTravelReview,
  TravelModeLogo,
} from '@/components/travel/traveler';
import { useTravelScheduleStore } from '@/providers';

type UIState =
  | 'traveler-main'
  | 'traveler-schedule-selection'
  | 'traveler-add-days'
  | 'traveler-activity-selection'
  | 'traveler-travel-schedule-confirm'
  | 'traveler-travel-schedule-arrange'
  | 'traveler-travel-review';

type UIAction = { type: 'NEXT' } | { type: 'PREV' };

const transitionMap: { [key in UIState]: { NEXT?: UIState; PREV?: UIState } } =
  {
    'traveler-main': { NEXT: 'traveler-schedule-selection' },
    'traveler-schedule-selection': {
      NEXT: 'traveler-add-days',
      PREV: 'traveler-main',
    },
    'traveler-add-days': {
      PREV: 'traveler-schedule-selection',
    },
    'traveler-activity-selection': {
      NEXT: 'traveler-travel-schedule-confirm',
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
  const removeDestination = useTravelScheduleStore(
    (state) => state.removeDestination,
  );
  const updateDestination = useTravelScheduleStore(
    (state) => state.updateDestination,
  );

  const [uiState, dispatch] = useReducer(uiReducer, 'traveler-main');

  const backgroundNode = () => {
    switch (uiState) {
      case 'traveler-main':
        return <TravelModeLogo />;
      case 'traveler-schedule-selection':
      case 'traveler-add-days':
      case 'traveler-activity-selection':
        return <ChoiceList choiceList={{ where: '부산광역시 (Busan)' }} />;
      case 'traveler-travel-schedule-confirm':
        return <TravelerHeaderText text='여행지를 수정하세요 :)' />;
      case 'traveler-travel-schedule-arrange':
        return <TravelerHeaderText text='여행을 정리할게요!' />;
      case 'traveler-travel-review':
        return <TravelerHeaderText text='여행은 어땠나요?' />;
      default:
        return <TravelModeLogo />;
    }
  };

  const childNode = () => {
    switch (uiState) {
      case 'traveler-main':
        return <TravelerMain onNextPage={() => dispatch({ type: 'NEXT' })} />;
      case 'traveler-schedule-selection':
        return (
          <TravelerScheduleSelection
            onNextPage={(dates) => {
              const { start, end } = dates;
              if (start && end) {
                const DAY = 24 * 60 * 60 * 1000;
                Array.from({
                  length:
                    Math.round((end.getTime() - start.getTime()) / DAY) + 1,
                }).forEach(() => addDaySchedule());
                dispatch({ type: 'NEXT' });
              }
            }}
          />
        );
      case 'traveler-add-days':
        return (
          <TravelerAddDays
            schedules={schedules}
            onAddDaySchedule={addDaySchedule}
            onNextPage={() => {
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
            onNextPage={() => dispatch({ type: 'NEXT' })}
          />
        );
      case 'traveler-travel-schedule-arrange':
        return (
          <TravelerTravelArrange
            where='부산광역시 (Busan)'
            schedules={schedules}
            onNextPage={() => dispatch({ type: 'NEXT' })}
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
      case 'traveler-activity-selection':
        return 'traveler';
      default:
        return 'edit';
    }
  };

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
