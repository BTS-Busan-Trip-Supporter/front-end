'use client';

import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';

const range = Array.from({ length: 23 - 9 + 1 }, (_, index) => index + 9);

function TimeItem({
  time,
  selected,
  last,
  onMouseDown,
  onMouseEnter,
  onTouchStart,
  onTouchMove,
}: {
  time: number;
  selected: boolean;
  last: boolean;
  onMouseDown: (time: number) => void;
  onMouseEnter: (time: number) => void;
  onTouchStart: (time: number) => void;
  onTouchMove: (e: React.TouchEvent) => void;
}) {
  return (
    <styles.timeItem $selected={selected} $last={last}>
      <p>{time}시</p>
      <div
        data-time={time}
        onMouseDown={() => onMouseDown(time)}
        onMouseEnter={() => onMouseEnter(time)}
        onTouchStart={() => onTouchStart(time)}
        onTouchMove={onTouchMove}
      />
    </styles.timeItem>
  );
}

export function TravelerTimeSelection({
  day,
  onChangeNextUI,
}: {
  day: number;
  onChangeNextUI: (range: Set<number>) => void;
}) {
  const [selectedRange, setSelectedRange] = useState<
    Record<number, boolean | undefined>
  >({});

  const fillValue = useRef(true);
  const isDraggingRef = useRef(false);
  const isTouchEvent = useRef(false);

  const handleMouseDown = (time: number) => {
    if (isTouchEvent.current) return;
    isDraggingRef.current = true;
    if (!selectedRange[time]) fillValue.current = true;
    else fillValue.current = !selectedRange[time];
    setSelectedRange((prev) => ({ ...prev, [time]: fillValue.current }));
  };

  const handleMouseEnter = (time: number) => {
    if (isDraggingRef.current && !isTouchEvent.current) {
      setSelectedRange((prev) => ({ ...prev, [time]: fillValue.current }));
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (time: number) => {
    isTouchEvent.current = true;
    isDraggingRef.current = true;
    if (!selectedRange[time]) fillValue.current = true;
    else fillValue.current = !selectedRange[time];
    setSelectedRange((prev) => ({ ...prev, [time]: fillValue.current }));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDraggingRef.current) {
      const touch = e.touches[0];
      const target = document.elementFromPoint(
        touch.clientX,
        touch.clientY,
      ) as HTMLElement;

      if (target && target.dataset.time) {
        const targetTime = +target.dataset.time;
        setSelectedRange((prev) => ({
          ...prev,
          [targetTime]: fillValue.current,
        }));
      }
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    setTimeout(() => {
      isTouchEvent.current = false;
    }, 100); // 일정 시간 후에 초기화하여 mouse 이벤트가 다시 동작할 수 있도록 합니다.
    // 모바일 환경에서 단일 탭하였을 때 아래 처럼 진행됩니다.
    // touchstart -> touchend -> mousedown
  };

  return (
    <styles.container
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchEnd={handleTouchEnd}
    >
      <styles.dayTitle>{day}일차</styles.dayTitle>
      {range.map((time, index) => (
        <TimeItem
          key={time}
          time={time}
          last={range.length - 1 === index}
          selected={selectedRange[time] ?? false}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        />
      ))}
      <styles.confirmButton
        onClick={() =>
          onChangeNextUI(new Set(Object.keys(selectedRange).map(parseInt)))
        }
      >
        선택완료
      </styles.confirmButton>
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    flex: 1 0 0;

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    overflow-y: auto;
  `,

  dayTitle: styled.h1`
    font-family: Noto Sans KR;
    font-size: 20px;
    font-weight: 700;
    line-height: 28.96px;
    text-align: center;

    color: #656565;

    margin-bottom: 40px;
  `,

  timeItem: styled.div<{ $selected: boolean; $last: boolean }>`
    display: flex;
    flex-direction: row;

    justify-content: center;
    align-items: center;

    gap: 13px;

    p {
      width: 25px;

      font-family: Noto Sans KR;
      font-size: 12px;
      font-weight: 500;
      line-height: 17.38px;
      text-align: right;

      color: #7d7d7d;
    }

    div {
      width: 63px;
      height: 36.75px;

      background: ${({ $selected }) => ($selected ? '#DDDCFF' : '#FFFFFF')};

      border-top: 1px solid #dcdcdc;
      border-left: 1px solid #dcdcdc;
      border-right: 1px solid #dcdcdc;
      border-bottom: ${({ $last }) =>
        $last ? '1px solid #dcdcdc' : undefined};

      touch-action: none;
    }
  `,

  confirmButton: styled.button`
    all: unset;

    border-radius: 44px;

    background: #ff75c8;
    box-shadow: -2px 2px 2px 0px #0000001f inset;

    padding: 8px 30px;

    font-family: Noto Sans KR;
    font-size: 14px;
    font-weight: 500;
    line-height: 20.27px;
    letter-spacing: 0.02em;
    text-align: center;

    color: white;

    margin-top: 30px;
  `,
};
