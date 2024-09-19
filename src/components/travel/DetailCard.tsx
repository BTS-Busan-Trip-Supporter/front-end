'use client';

import styled from '@emotion/styled';

import { CustomButton } from '../CustomButton';

export function DetailCard({
  name,
  src,
  onSelect,
}: {
  name: string;
  src: string;
  onSelect: () => void;
}) {
  return (
    <styles.wrapper>
      <div>
        <p>{name}</p>
        <img src={src} alt='place-image' />
        <CustomButton color='#5E5BDA' text='선택하기' onClick={onSelect} />
      </div>
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

    div {
      width: 100%;
      min-height: 20rem;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      gap: 0.5rem;
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

    img {
      width: 100%;
      object-fit: content;
      flex: 1;
    }
  `,
};
