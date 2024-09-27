'use client';

import styled from '@emotion/styled';
import { useState } from 'react';

import { CustomButton } from '@/components';
import { TravelerLocationConfirm } from '@/components/travel/traveler/TravelerLocationConfirm';
import { TravelerLocationSearch } from '@/components/travel/traveler/TravelerLocationSearch';
import { getTourSpots, type GetTourSpotsDTO } from '@/features/tour-spot';
import { TIME_STRING } from '@/features/trip';
import { useTripStore } from '@/features/trip/trip.slice';

export function TravelerAddDays({ onNextPage }: { onNextPage: () => void }) {
  const [state, setState] = useState<{
    ui: 'main' | 'search' | 'confirm';
    day?: number;
    location?: string;
    time?: 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT';
    tourSpotDto?: GetTourSpotsDTO;
  }>({ ui: 'main' });

  const { tourInfo, activities, addTour, addActivity } = useTripStore();

  return (
    <>
      {state.ui === 'main' && (
        <styles.container>
          <styles.dayContainer>
            {activities.map((acts, index) => (
              <styles.daySchedule key={index}>
                <styles.dayTitle>{index + 1}일차</styles.dayTitle>
                <styles.dayFrame>
                  {acts.length > 0 &&
                    acts.map((activity) => (
                      <Destination
                        key={activity.spotName}
                        destination={{
                          time: activity.dayTime,
                          name: activity.spotName,
                        }}
                      />
                    ))}
                  {!(
                    acts.find(
                      (destination) => destination.dayTime === 'MORNING',
                    ) &&
                    acts.find(
                      (destination) => destination.dayTime === 'AFTERNOON',
                    ) &&
                    acts.find(
                      (destination) => destination.dayTime === 'EVENING',
                    ) &&
                    acts.find((destination) => destination.dayTime === 'NIGHT')
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
              <AddButton onClick={addTour} />
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
          onClick={() => {
            if (!state.location) return;

            getTourSpots(state.location, tourInfo.locationName ?? '').then(
              (res) => {
                setState((prev) => ({
                  ...prev,
                  ui: 'confirm',
                  tourSpotDto: res,
                }));
              },
            );
          }}
          onContentChange={(value) =>
            setState((prev) => ({ ...prev, location: value }))
          }
        />
      )}
      {state.ui === 'confirm' &&
        state.tourSpotDto &&
        state.day &&
        state.location && (
          <TravelerLocationConfirm
            location={state.tourSpotDto.data.title}
            day={state.day}
            selectedTime={state.time}
            onTimeClicked={(time) => {
              if (
                state.day &&
                !activities[state.day - 1]?.find(
                  (activity) => activity.dayTime === time,
                )
              ) {
                setState((prev) => ({ ...prev, time }));
              }
            }}
            onConfirm={() => {
              if (
                !state.day ||
                !state.time ||
                !state.tourSpotDto ||
                !tourInfo.startTime ||
                !tourInfo.endTime
              )
                return;

              addActivity(state.day, {
                dayNumber: state.day,
                dayTime: state.time,
                spotName: state.tourSpotDto.data.title,
                tourSpotDto: {
                  id: state.tourSpotDto.data.contentId,
                  typeId: state.tourSpotDto.data.contentTypeId,
                  title: state.tourSpotDto.data.title,
                  sigunguCode: state.tourSpotDto.data.sigunguCode,
                },
                orderIndex: 0,
              });

              setState(() => ({ ui: 'main' }));
            }}
          />
        )}
    </>
  );
}

function Destination({
  destination,
}: {
  destination: {
    name: string;
    time: 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT';
  };
}) {
  return (
    <styles.destinationContainer>
      <p data-time>{TIME_STRING[destination.time]}</p>
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
    min-height: 283px;
    max-height: 283px;
    border-radius: 10px;

    background: #ffffff;

    gap: 2rem;

    box-shadow: 2px 4px 1px 0px #0000000f;

    overflow-y: scroll;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    width: 110px;
    min-height: 78px;
    border-radius: 14px;

    background: #ffffff;
    box-shadow: 2px 3px 4px 0 #00000012;

    font-family: Noto Sans KR;
    font-size: 14px;
    font-weight: 700;
    line-height: 20.27px;
    letter-spacing: -0.02em;

    color: #505050;

    p {
      padding: 0 0.5rem;
    }

    p[data-time] {
      padding: 0;
      align-self: flex-start;
    }

    padding: 0.5rem;

    overflow: clip;
  `,
};
