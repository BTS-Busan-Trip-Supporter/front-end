'use client';

import styled from '@emotion/styled';

export function ScrollMotion() {
  return (
    <styles.container>
      <div>
        <styles.scrollMotionBtn></styles.scrollMotionBtn>
      </div>
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    position: fixed;
    height: 100px;
    bottom: 4rem;
  `,

  scrollMotionBtn: styled.span`
    position: absolute;
    z-index: 9999;
    top: 0;
    left: 50%;
    width: 24px;
    height: 24px;
    margin-left: -12px;
    background: url('/chevron-bottom.svg') no-repeat center;
    background-size: 100%;
    animation: motion 1.5s infinite;
    box-sizing: border-box;

    @keyframes motion {
      0% {
        transform: translate(0, 0);
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        transform: translate(0, 20px);
        opacity: 0;
      }
    }
  `,
};
