'use client';

import styled from '@emotion/styled';

export function Loading({ type }: { type: 'record' | 'travel' }) {
  return (
    <styles.wrapper>
      <div>
        {type === 'travel' ? (
          <p>
            흥미로운 여행지를
            <br />
            선택해보세요!
          </p>
        ) : (
          <p>기록을 불러오는 중입니다</p>
        )}
        <div className='loader' />
      </div>
    </styles.wrapper>
  );
}

const styles = {
  wrapper: styled.div`
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    scroll-snap-align: start;
    padding: 0.5rem;
    position: relative;

    div {
      display: flex;
      position: relative;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }

    p {
      color: #505050;

      text-align: center;
      font-family: 'Noto Sans KR';
      font-size: 1.4375rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.02875rem;
    }

    .loader {
      position: relative;
      width: 2.5em;
      height: 2.5em;
      transform: translateY(230%);
    }

    .loader:before,
    .loader:after {
      content: '';
      position: absolute;
      left: 50%;
      display: block;
      width: 0.5em;
      height: 0.5em;
      border-radius: 0.25em;
      transform: translate(-50%, -50%) rotate(165deg);
      transform-origin: 50% 50%;
    }

    .loader:before {
      animation: before 2s infinite;
    }

    .loader:after {
      animation: after 2s infinite;
    }

    @keyframes before {
      0% {
        width: 0.5em;
        box-shadow:
          1em -0.5em rgba(154, 151, 255, 0.8),
          -1em 0.5em rgba(63, 61, 147, 0.8);
      }

      35% {
        width: 2.5em;
        box-shadow:
          0 -0.5em rgba(154, 151, 255, 0.8),
          0 0.5em rgba(63, 61, 147, 0.8);
      }

      70% {
        width: 0.5em;
        box-shadow:
          -1em -0.5em rgba(154, 151, 255, 0.8),
          1em 0.5em rgba(63, 61, 147, 0.8);
      }

      100% {
        box-shadow:
          1em -0.5em rgba(154, 151, 255, 0.8),
          -1em 0.5em rgba(63, 61, 147, 0.8);
      }
    }

    @keyframes after {
      0% {
        height: 0.5em;
        box-shadow:
          0.5em 1em rgba(184, 182, 243, 0.8),
          -0.5em -1em rgba(107, 103, 249, 0.8);
      }

      35% {
        height: 2.5em;
        box-shadow:
          0.5em 0 rgba(184, 182, 243, 0.8),
          -0.5em 0 rgba(107, 103, 249, 0.8);
      }

      70% {
        height: 0.5em;
        box-shadow:
          0.5em -1em rgba(184, 182, 243, 0.8),
          -0.5em 1em rgba(107, 103, 249, 0.8);
      }

      100% {
        box-shadow:
          0.5em 1em rgba(184, 182, 243, 0.8),
          -0.5em -1em rgba(107, 103, 249, 0.8);
      }
    }

    .loader {
      position: absolute;
      top: 40%;
      left: calc(50% - 1.25em);
    }
  `,
};
