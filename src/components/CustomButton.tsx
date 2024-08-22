'use client';

import styled from '@emotion/styled';

interface Color {
  $color: string;
}

export function CustomButton({
  color,
  text,
  onClick,
}: {
  color: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <styles.button $color={color} onClick={onClick}>
      {text}
    </styles.button>
  );
}

const styles = {
  button: styled.button<Color>`
    border-radius: 2.8125rem;
    background: ${(props) => props.$color};
    padding: 0.6rem 1.13rem;
    box-shadow: inset 2px 2px 4px 0px rgba(0, 0, 0, 0.15);
    border: none;

    color: #fff;
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.02rem;
    text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  `,
};
