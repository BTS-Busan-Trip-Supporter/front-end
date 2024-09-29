'use client';

import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

import { DropBoxMenu } from '@/features/trip';

interface Type {
  id: string;
  type: string;
}

export function DropBox({
  type,
  setContent,
  setDropBoxVisible,
}: {
  type: 'travelType' | 'regionType';
  setContent: (content: string) => void;
  setDropBoxVisible: (i: boolean) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        containerRef.current !== null &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setDropBoxVisible(false);
      }
    };

    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  return (
    <styles.wrapper ref={containerRef}>
      <styles.container>
        <div className='listWrapper'>
          <div className='listContainer'>
            {DropBoxMenu[type].map((item: Type) => (
              <styles.item
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setContent(item.type);
                  setDropBoxVisible(false);
                }}
              >
                {item.type}
              </styles.item>
            ))}
          </div>
        </div>
      </styles.container>
    </styles.wrapper>
  );
}

const styles = {
  wrapper: styled.div`
    position: absolute;
    left: 0;
    bottom: -8.5rem;
    width: 100%;
    padding: 0.5rem;
  `,

  container: styled.div`
    width: 100%;
    height: 7.5rem;
    border-radius: 20px;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    padding: 1.5rem 1rem;
    gap: 1rem;
    background-color: white;

    .listWrapper {
      width: 100%;
      height: 100%;
      display: flex;

      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 10px;
        height: 20px;
      }

      &::-webkit-scrollbar-thumb {
        background: #d9d9d9;
        border-radius: 20px;
      }
    }

    .listContainer {
      width: 90%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `,

  item: styled.p`
    color: #7d7d7d;
    font-family: 'Noto Sans KR';
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.01875rem;
  `,
};
