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
    position: absolute;
    height: 100px;
    bottom: 12rem;
  `,

  scrollMotionBtn: styled.span`
    position: absolute;
    top: 0;
    left: 50%;
    width: 24px;
    height: 24px;
    margin-left: -12px;
    border-left: 1px solid #000;
    border-bottom: 1px solid #000;
    transform: rotate(-45deg);
    animation: motion 1.5s infinite;
    box-sizing: border-box;

    @keyframes motion {
      0% {
        transform: rotate(-45deg) translate(0, 0);
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        transform: rotate(-45deg) translate(-20px, 20px);
        opacity: 0;
      }
    }
  `,
};
