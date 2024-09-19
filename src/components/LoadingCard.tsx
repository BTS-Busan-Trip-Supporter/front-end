'use client';

import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

interface Loading {
  $isLoading: boolean;
}

export function LoadingCard({
  imageUrl,
  onClick,
  isSelected,
}: {
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
  );
}

const styles = {
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
};
