'use client';

import { createContext, ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand';

import {
  createTravelScheduleStore,
  TravelScheduleStore,
} from '@/features/travel-schedule';

export type TravelScheduleStoreApi = ReturnType<
  typeof createTravelScheduleStore
>;

export const TravelScheduleContext = createContext<
  TravelScheduleStoreApi | undefined
>(undefined);

export interface TravelScheduleStoreProviderProps {
  children: ReactNode;
}

export const TravelScheduleStoreProvider = ({
  children,
}: TravelScheduleStoreProviderProps) => {
  const storeRef = useRef<TravelScheduleStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createTravelScheduleStore();
  }

  return (
    <TravelScheduleContext.Provider value={storeRef.current}>
      {children}
    </TravelScheduleContext.Provider>
  );
};

export const useTravelScheduleStore = <T,>(
  selector: (store: TravelScheduleStore) => T,
): T => {
  const travelScheduleStoreContext = useContext(TravelScheduleContext);

  if (!travelScheduleStoreContext) {
    throw new Error(
      'useTravelScheduleStore must be used within TravelScheduleStoreProvider',
    );
  }

  return useStore(travelScheduleStoreContext, selector);
};
