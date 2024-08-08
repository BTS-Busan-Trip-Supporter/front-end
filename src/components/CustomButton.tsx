'use client';

import styled from '@emotion/styled';

interface Color {
  $color: string;
}

export function CustomButton({ color, text }: { color: string; text: string }) {
  return <styles.button $color={color}>{text}</styles.button>;
}

const styles = {
  button: styled.button<Color>`
    border-radius: 2.8125rem;
    background: ${(props) => props.$color};
    padding: 0.6rem 1.13rem;
    box-shadow: -2px 2px 4px 0px rgba(0, 0, 0, 0.15);
    border: none;

    color: #fff;
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.02rem;
  `,
};
