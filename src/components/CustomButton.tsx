'use client';

import styled from '@emotion/styled';

interface Color {
  $color: string;
  $grow: boolean;
}

export function CustomButton({
  color,
  text,
  onClick,
  grow = false,
  className,
}: {
  color: string;
  text: string;
  onClick: () => void;
  grow?: boolean;
  className?: string;
}) {
  return (
    <styles.button
      className={className}
      $color={color}
      $grow={grow}
      onClick={onClick}
    >
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

    width: ${({ $grow }) => ($grow ? '100%' : 'auto')};
  `,
};
