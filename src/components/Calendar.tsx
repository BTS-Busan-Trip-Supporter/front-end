'use client';

import styled from '@emotion/styled';
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';

import { getDates } from '@/shared/get-dates';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export function Calendar({
  selectedMode,
  onSelect,
}: {
  selectedMode: 'single' | 'multiple';
  onSelect?: (selectedDates: { start?: Date; end?: Date }) => void;
}) {
  const [now, setNow] = useState(new Date());

  const [selectedDates, setSelectedDates] = useState<{
    start?: Date;
    end?: Date;
  }>({});

  const days = getDates(now);

  const clickDateItem = (date: Date) => {
    if (selectedMode === 'single') {
      // 날짜 단일 선택인 경우, 하루로 고정합니다.
      if (date === selectedDates.start && date === selectedDates.end)
        setSelectedDates({});
      else setSelectedDates({ start: date, end: date });
    } else if (selectedMode === 'multiple') {
      // 날짜가 여러 날 선택 가능한 경우, start를 먼저 채우고
      // 이후에 마지막을 채웁니다. 이 때, 뭐가 앞 날짜인지 판단하고 정렬합니다.
      if (selectedDates.start == null) {
        setSelectedDates({ start: date });
      } else if (selectedDates.end == null) {
        setSelectedDates(({ start }) => {
          if (start && start.getTime() < date.getTime()) {
            return {
              start,
              end: date,
            };
          }
          return {
            start: date,
            end: start,
          };
        });
      } else {
        setSelectedDates({ start: date });
      }
    }
  };

  const ChangeMonthButtons = useMemo(
    () => (
      <>
        <button
          type='button'
          onClick={() => {
            setNow(new Date(now.getFullYear(), now.getMonth() - 1));
          }}
        >
          <img src='calendar-prev-next.svg' alt='to select previous month' />
        </button>
        <button
          type='button'
          onClick={() => {
            setNow(new Date(now.getFullYear(), now.getMonth() + 1));
          }}
        >
          <img
            src='calendar-prev-next.svg'
            alt='to select next month'
            style={{ rotate: '180deg' }}
          />
        </button>
      </>
    ),
    [now],
  );

  useEffect(() => {
    // 클릭시 데이터를 넣어줄 수 있으나, 그러면 경우가 5개라서, selectedDate의 변경사항이,
    // onSelect를 실행시키는 사이드 이펙트가 발생하도록 수정했습니다.
    if (onSelect) onSelect(selectedDates);
  }, [onSelect, selectedDates]);

  return (
    <styles.container>
      <styles.header>
        <styles.date>
          {now.getFullYear()}년 {now.getMonth() + 1}월
        </styles.date>
        <styles.buttons>{ChangeMonthButtons}</styles.buttons>
      </styles.header>
      <styles.dates>
        {DAYS.map((day) => (
          <span className='day' key={day}>
            {day}
          </span>
        ))}
        {days.map((day) => (
          <span
            key={day.getTime()}
            className={classNames({
              'not-current-month': now.getMonth() !== day.getMonth(),
              selected: Object.values(selectedDates)
                .map((date) => date.getTime())
                .includes(day.getTime()),
              'selected-range':
                selectedMode === 'multiple' &&
                selectedDates.start &&
                selectedDates.end &&
                selectedDates.start.getTime() < day.getTime() &&
                day.getTime() < selectedDates.end.getTime(),
            })}
            onClick={() => clickDateItem(day)}
          >
            {day.getDate()}
          </span>
        ))}
      </styles.dates>
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
  `,
  header: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  date: styled.p`
    font-weight: 500;
  `,
  buttons: styled.div`
    display: flex;

    button {
      all: unset;
      padding-inline: 8px;
    }
  `,
  dates: styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-top: 8px;

    span {
      text-align: center;
      padding: 8px;
      border: 2px solid transparent;
      user-select: none;
    }

    .day {
      color: #8b9898;
    }

    span:not(.day):hover {
      border: 2px solid #2383e2;
      border-radius: 3px;
      cursor: pointer;
    }

    .not-current-month {
      color: #8b9898;
    }

    .selected {
      background: #2383e2;
      color: #fff;
      border-radius: 3px;
    }

    .selected-range {
      background: #2383e280;
      color: #fff;
      border-radius: 3px;
    }
  `,
};
