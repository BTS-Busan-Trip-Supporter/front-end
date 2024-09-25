'use client';

import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

interface Loading {
  $isLoading: boolean;
}

export function LoadingCard({
  title,
  imageUrl,
  onClick,
  isSelected,
}: {
  title: string;
  imageUrl: string;
  onClick: () => void;
  isSelected: boolean;
}) {
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageLoading(false);
    img.onerror = () => setImageLoading(false);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);

  return (
    <styles.wrapper>
      <styles.card $isLoading={imageLoading} onClick={onClick}>
        <styles.checkIcon
          src={`/check${isSelected ? '' : '-non'}.svg`}
          alt='check-icon'
        />
        <styles.contents
          $isLoading={imageLoading}
          src={imageUrl}
          alt='card-contents'
        />
      </styles.card>
      <styles.description>{title}</styles.description>
    </styles.wrapper>
  );
}

const styles = {
  wrapper: styled.div`
    width: 7rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7rem;
  `,
  card: styled.div<Loading>`
    width: 6.875rem;
    height: 7.6875rem;
    flex-shrink: 0;
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    background-color: ${(props) => (props.$isLoading ? '#f9f9f9' : '#fff')};
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0)
    );
    background-size: 40px 100%;
    background-repeat: no-repeat;
    background-position: left -80px top 0;

    box-shadow: 2px 3px 4px 0px rgba(0, 0, 0, 0.07);
    animation: ${(props) =>
      props.$isLoading ? 'loading 1s ease-in-out infinite' : 'none'};

    @keyframes loading {
      to {
        background-position: right -40px top 0;
      }
    }
  `,

  contents: styled.img<Loading>`
    object-fit: cover;
    width: 100%;
    height: 100%;
    display: ${(props) => (props.$isLoading ? 'none' : 'block')};
  `,

  checkIcon: styled.img`
    width: 1.25rem;
    height: 1.25rem;
    object-fit: content;
    position: absolute;
    top: 0.5rem;
    right: 0.3rem;
  `,

  description: styled.p`
    width: 100%;
    color: #505050;

    text-align: center;
    font-family: 'Noto Sans KR';
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.02875rem;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
};
