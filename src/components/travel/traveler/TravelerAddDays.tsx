'use client';

import styled from '@emotion/styled';
import { useCallback, useState } from 'react';

import { CustomButton } from '@/components';
import { TravelerLocationConfirm } from '@/components/travel/traveler/TravelerLocationConfirm';
import { TravelerLocationSearch } from '@/components/travel/traveler/TravelerLocationSearch';
import type { DaySchedule, Destination } from '@/features/travel-schedule';

export function TravelerAddDays({
  schedules,
  onAddDaySchedule,
  onNextPage,
}: {
  schedules: DaySchedule[];
  onAddDaySchedule: () => void;
  onAddDestination: (day: number, destination: Destination) => void;
  onNextPage: () => void;
}) {
  const [state, setState] = useState<{
    ui: 'main' | 'search' | 'confirm';
    day?: number;
    searchContent?: string;
    location?: string;
    time?: 'morning' | 'afternoon' | 'evening' | 'night';
  }>({ ui: 'main' });

  const destinations = useCallback(
    (destination: Destination[]) => (
      <>
        {destination.map((des) => (
          <Destination key={des.id} destination={des} />
        ))}
      </>
    ),
    [],
  );

  return (
    <>
      {state.ui === 'main' && (
        <styles.container>
          <styles.dayContainer>
            {schedules.map((schedule, index) => (
              <styles.daySchedule key={index}>
                <styles.dayTitle>{index + 1}일차</styles.dayTitle>
                <styles.dayFrame>
                  {schedule.destinations.length > 0 &&
                    destinations(schedule.destinations)}
                  {!(
                    schedule.destinations.find(
                      (destination) => destination.time === 'morning',
                    ) &&
                    schedule.destinations.find(
                      (destination) => destination.time === 'afternoon',
                    ) &&
                    schedule.destinations.find(
                      (destination) => destination.time === 'evening',
                    ) &&
                    schedule.destinations.find(
                      (destination) => destination.time === 'night',
                    )
                  ) && (
                    <AddButton
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          ui: 'search',
                          day: index + 1,
                        }))
                      }
                    />
                  )}
                </styles.dayFrame>
              </styles.daySchedule>
            ))}
            <styles.addDayFrame>
              <p>1박</p>
              <p>추가하기</p>
              <AddButton onClick={onAddDaySchedule} />
            </styles.addDayFrame>
          </styles.dayContainer>
          <styles.CustomButton
            color='linear-gradient(90deg, #6B67F9 0%, #423FB3 100%)'
            text='여행 완성'
            onClick={onNextPage}
          />
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

function Destination({ destination }: { destination: Destination }) {
  return (
    <styles.destinationContainer>
      <p>{destination.time}</p>
      <p>{destination.name}</p>
    </styles.destinationContainer>
  );
}

function AddButton({ onClick }: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <styles.addDayButton onClick={onClick}>
      <img
        src='/traveler-mode-add-button.svg'
        alt='button to add destination'
      />
    </styles.addDayButton>
  );
}

const styles = {
  container: styled.div`
    padding-top: 53px;

    flex: 1 0 0;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
  `,

  dayContainer: styled.div`
    width: 100%;
    padding: 1rem 0;

    display: flex;
    flex-direction: row;
    gap: 23px;
    overflow-x: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  `,

  daySchedule: styled.div`
    display: flex;
    flex-direction: column;
    gap: 13px;
  `,

  dayTitle: styled.h1`
    font-family: Noto Sans KR;
    font-size: 16px;
    font-weight: 500;
    line-height: 23.17px;
    text-align: center;
    color: #7d7d7d;
  `,

  dayFrame: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 136px;
    height: 283px;
    border-radius: 10px;

    background: #ffffff;

    box-shadow: 2px 4px 1px 0px #0000000f;
  `,

  addDayFrame: styled.div`
    width: 136px;
    min-width: 136px;
    max-width: 136px;
    height: calc(283px + 23.16px + 13px);
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: transparent;

    p {
      font-family: Noto Sans KR;
      font-size: 9px;
      font-weight: 500;
      line-height: 13.03px;
      text-align: center;

      color: #949494;

      :last-of-type {
        margin-bottom: 11px;
      }
    }
  `,

  addDayButton: styled.button`
    all: unset;
    cursor: pointer;

    display: flex;
    align-items: center;
  `,

  CustomButton: styled(CustomButton)`
    margin: auto 0;
  `,

  destinationContainer: styled.div`
    width: 110px;
    height: 78px;
    border-radius: 14px;

    background: #ffffff;
    box-shadow: 2px 3px 4px 0 #00000012;

    font-family: Noto Sans KR;
    font-size: 14px;
    font-weight: 700;
    line-height: 20.27px;
    letter-spacing: -0.02em;

    color: #505050;
  `,
};
