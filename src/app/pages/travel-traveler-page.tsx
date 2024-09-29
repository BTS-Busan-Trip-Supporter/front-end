'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useReducer } from 'react';

import { TravelComponent } from '@/components';
import { ChoiceList } from '@/components/travel';
import {
  TravelerActivitySelection,
  TravelerAddDays,
  TravelerHeaderText,
  TravelerScheduleConfirm,
  TravelerScheduleSelection,
  TravelerTravelArrange,
} from '@/components/travel/traveler';
import { TravelerActivityRecommendation } from '@/components/travel/traveler/TravelerActivityRecommendation';
import { useTripStore } from '@/features/trip/trip.slice';

type UIState =
  | 'traveler-schedule-selection'
  | 'traveler-add-days'
  | 'traveler-activity-selection'
  | 'traveler-activity-recommendation'
  | 'traveler-travel-schedule-confirm'
  | 'traveler-travel-schedule-arrange';

type UIAction =
  | { type: 'NEXT'; payload?: { nextState: UIState } }
  | { type: 'PREV' };

const transitionMap: { [key in UIState]: { NEXT?: UIState; PREV?: UIState } } =
  {
    'traveler-schedule-selection': {
      NEXT: 'traveler-add-days',
    },
    'traveler-add-days': {
      NEXT: 'traveler-activity-selection',
      PREV: 'traveler-schedule-selection',
    },
    'traveler-activity-selection': {
      NEXT: 'traveler-activity-recommendation',
      PREV: 'traveler-add-days',
    },
    'traveler-activity-recommendation': {
      NEXT: 'traveler-travel-schedule-confirm',
      PREV: 'traveler-activity-selection',
    },
    'traveler-travel-schedule-confirm': {
      NEXT: 'traveler-travel-schedule-arrange',
      PREV: 'traveler-activity-selection',
    },
    'traveler-travel-schedule-arrange': {
      PREV: 'traveler-travel-schedule-confirm',
    },
  };

const uiReducer = (state: UIState, action: UIAction): UIState => {
  const nextState = transitionMap[state][action.type];
  if (action.type === 'NEXT' && action.payload) return action.payload.nextState;
  return nextState ?? state;
};

export function TravelerPage() {
  const { tourInfo, isAllTravelSchedulesFilled, setLocation } = useTripStore();

  useEffect(() => {
    const savedContent = sessionStorage.getItem('searchContent');
    if (savedContent) {
      setLocation(savedContent);
      sessionStorage.removeItem('searchContent');
    }
  }, []);

  const [uiState, dispatch] = useReducer(
    uiReducer,
    'traveler-schedule-selection',
  );

  const router = useRouter();

  const backgroundNode = () => {
    switch (uiState) {
      case 'traveler-activity-selection':
      case 'traveler-travel-schedule-confirm':
        return <TravelerHeaderText text='여행지를 수정하세요 :)' />;
      case 'traveler-travel-schedule-arrange':
        return <TravelerHeaderText text='여행을 정리할게요!' />;
      default:
        return <ChoiceList choiceList={{ where: tourInfo.locationName }} />;
    }
  };

  const childNode = () => {
    switch (uiState) {
      case 'traveler-schedule-selection':
        return (
          <TravelerScheduleSelection
            onPrevPage={() => {
              router.replace('/');
            }}
            onNextPage={() => {
              dispatch({ type: 'NEXT' });
            }}
          />
        );
      case 'traveler-add-days':
        return (
          <TravelerAddDays
            onPrevPage={() => {
              dispatch({
                type: 'PREV',
              });
            }}
            onNextPage={() => {
              dispatch({
                type: 'NEXT',
                payload: isAllTravelSchedulesFilled()
                  ? { nextState: 'traveler-travel-schedule-confirm' }
                  : undefined,
              });
            }}
          />
        );
      case 'traveler-activity-selection':
        return (
          <TravelerActivitySelection
            onNextPage={() => dispatch({ type: 'NEXT' })}
            onPrevPage={() => dispatch({ type: 'PREV' })}
          />
        );
      case 'traveler-activity-recommendation':
        return (
          <TravelerActivityRecommendation
            onNextPage={() => dispatch({ type: 'NEXT' })}
            onPrevPage={() => dispatch({ type: 'PREV' })}
          />
        );
      case 'traveler-travel-schedule-confirm':
        return (
          <TravelerScheduleConfirm
            onNextPage={() => dispatch({ type: 'NEXT' })}
          />
        );
      case 'traveler-travel-schedule-arrange':
        return (
          <TravelerTravelArrange
            onNextPage={() => {
              router.replace('/');
            }}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <TravelComponent
      contents={{
        backgroundNode: backgroundNode(),
        childNode: childNode(),
        type: 'edit',
      }}
    />
  );
}
