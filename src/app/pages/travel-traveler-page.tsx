'use client';

import { useReducer } from 'react';

import { TravelComponent } from '@/components';

type UIState =
  | 'traveler-main'
  | 'traveler-add-days'
  | 'traveler-time-select'
  | 'traveler-select-what'
  | 'traveler-travel-schedule-confirm'
  | 'traveler-travel-schedule-arrange'
  | 'traveler-travel-review';

type UIAction = { type: 'NEXT' } | { type: 'PREV' };

const transitionMap: { [key in UIState]: { NEXT?: UIState; PREV?: UIState } } =
  {
    'traveler-main': { NEXT: 'traveler-add-days' },
    'traveler-add-days': {
      NEXT: 'traveler-time-select',
      PREV: 'traveler-main',
    },
    'traveler-time-select': {
      NEXT: 'traveler-select-what',
      PREV: 'traveler-add-days',
    },
    'traveler-select-what': {
      NEXT: 'traveler-travel-schedule-confirm',
      PREV: 'traveler-time-select',
    },
    'traveler-travel-schedule-confirm': {
      NEXT: 'traveler-travel-schedule-arrange',
      PREV: 'traveler-select-what',
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
  return (
    <TravelComponent
      contents={{
        backgroundNode: <TravelModeLogo />,
        childNode: <></>,
        type: 'traveler',
      }}
    />
  );
}
