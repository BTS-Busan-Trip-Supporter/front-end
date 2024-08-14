'use client';

import styled from '@emotion/styled';

import { DaySchedule } from '@/features/travel-schedule';

export function TravelerAddDays({
  schedules,
  onAddDaySchedule,
  onChangeNextUI,
}: {
  schedules: DaySchedule[];
  onAddDaySchedule: () => void;
  onChangeNextUI: (day: number) => void;
}) {
  return (
    <styles.container>
      <styles.dayContainer>
        {schedules.map((schedule, index) => (
          <styles.daySchedule key={index}>
            <styles.dayTitle>{index + 1}일차</styles.dayTitle>
            <styles.dayFrame>
              <AddButton onClick={() => onChangeNextUI(index + 1)} />
            </styles.dayFrame>
          </styles.daySchedule>
        ))}
        <styles.addDayFrame>
          <p>1박</p>
          <p>추가하기</p>
          <AddButton onClick={onAddDaySchedule} />
        </styles.addDayFrame>
      </styles.dayContainer>
    </styles.container>
  );
}

const AddButton = ({ onClick }: React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <styles.addDayButton onClick={onClick}>
      <img
        src='/traveler-mode-add-button.svg'
        alt='button to add destination'
      />
    </styles.addDayButton>
  );
};

const styles = {
  container: styled.div`
    padding-top: 53px;

    flex: 1 0 0;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    overflow-x: auto;
  `,

  dayContainer: styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    gap: 23px;
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
};
