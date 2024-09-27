'use client';

import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { CustomButton } from '../CustomButton';
import { TimeCard } from '../TimeCard';

import { useTourSpotData } from '@/features/tour-spot';
import type { TripItem } from '@/features/trip';

type Times = '오전' | '오후' | '저녁' | '밤' | '기본';

interface Location {
  item: TripItem;
  selected?: boolean;
  time?: Times;
}

export function DetailCard({
  place,
  selectedPlaces,
  onSelect,
  setIsDetailVisible,
}: {
  place: Location;
  selectedPlaces: Location[];
  onSelect: (updateFn: (places: Location[]) => Location[]) => void;
  setIsDetailVisible: (i: boolean) => void;
}) {
  const [time, setTime] = useState<Times>(place.time ?? '오전');

  const { data: tourSpot } = useTourSpotData(
    place.item.contentId,
    place.item.contentTypeId,
  );

  const isSelected = selectedPlaces.some(
    (p) => p.item.contentId === place.item.contentId,
  );

  useEffect(() => {
    if (isSelected) {
      const placeIndex = selectedPlaces.findIndex(
        (p) => p.item.contentId === place.item.contentId,
      );
      setTime(selectedPlaces[placeIndex].time ?? '오전');
    }
  }, [isSelected]);

  const savePlace = () => {
    onSelect((prevSelectedPlaces) => {
      const existingPlaceForTime = prevSelectedPlaces.find(
        (p) => p.time === time,
      );

      if (existingPlaceForTime) {
        if (existingPlaceForTime.item.contentId === place.item.contentId) {
          const updatedPlaces = [...prevSelectedPlaces];
          const placeIndex = prevSelectedPlaces.findIndex(
            (p) => p.item.contentId === place.item.contentId,
          );
          const updatedPlace = {
            ...updatedPlaces[placeIndex],
            time,
          };
          updatedPlaces[placeIndex] = updatedPlace;
          return updatedPlaces;
        }

        return prevSelectedPlaces.map((p) =>
          p.time === time ? { ...p, item: place.item, time } : p,
        );
      }

      return [
        ...prevSelectedPlaces,
        {
          item: place.item,
          selected: true,
          time,
        },
      ];
    });
    setIsDetailVisible(false);
  };

  const removePlace = () => {
    onSelect((prevSelectedPlaces) =>
      prevSelectedPlaces.filter(
        (p) => p.item.contentId !== place.item.contentId,
      ),
    );
    setIsDetailVisible(false);
  };

  return (
    <styles.wrapper>
      <styles.placeCon>
        <div>
          <p>{tourSpot?.data.title}</p>
          <styles.xIcon
            className='x'
            src='/x.svg'
            alt='x-icon'
            onClick={() => {
              setIsDetailVisible(false);
            }}
          />
        </div>
        <styles.addr>
          {tourSpot?.data.addr1} {tourSpot?.data.addr2}
        </styles.addr>
        <styles.placeImg src={tourSpot?.data.firstImage} alt='place-image' />
      </styles.placeCon>
      <styles.timeCardCon>
        <TimeCard
          time='오전'
          selected={time === '오전'}
          onClick={() => setTime('오전')}
        />
        <TimeCard
          time='오후'
          selected={time === '오후'}
          onClick={() => setTime('오후')}
        />
        <TimeCard
          time='저녁'
          selected={time === '저녁'}
          onClick={() => setTime('저녁')}
        />
        <TimeCard
          time='밤'
          selected={time === '밤'}
          onClick={() => setTime('밤')}
        />
      </styles.timeCardCon>

      <styles.buttonCon>
        <CustomButton color='#5E5BDA' text='선택하기' onClick={savePlace} />
        {isSelected && (
          <CustomButton
            color='#5E5BDA'
            text='선택 취소'
            onClick={removePlace}
          />
        )}
      </styles.buttonCon>
    </styles.wrapper>
  );
}

const styles = {
  wrapper: styled.div`
    width: 100%;
    min-height: 100dvh;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    scroll-snap-align: start;
    padding: 0.5rem 0.5rem 20rem 0.5rem;
    flex-direction: column;
    gap: 1rem;
  `,

  placeCon: styled.div`
    width: 100%;
    min-height: 20rem;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    gap: 0.3rem;

    div {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    p {
      width: 100%;
      color: #7d7d7d;
      font-family: 'Noto Sans KR';
      font-size: 0.9375rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  `,

  timeCardCon: styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
  `,

  buttonCon: styled.div`
    display: flex;
    gap: 1rem;
  `,

  placeImg: styled.img`
    width: 100%;
    height: 16rem;
    border-radius: 8px;
    margin-top: 0.8rem;
  `,

  xIcon: styled.img`
    width: 0.9375rem;
    height: 0.9375rem;
    object-fit: cover;
  `,

  addr: styled.span`
    width: 100%;
    color: #7d7d7d;
    font-family: 'Noto Sans KR';
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
};
