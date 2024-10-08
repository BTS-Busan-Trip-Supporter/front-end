'use client';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

import { useToastStore, type Toast, type ToastType } from '@/features/toast';

export function ToastProvider() {
  const { toasts } = useToastStore();

  return (
    <styles.wrapper>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </styles.wrapper>
  );
}

const DURATION = 2000;
const ANIMATION = 500;

interface ToastContainer {
  $type: ToastType;
  $visible: boolean;
}

function ToastItem({ toast }: { toast: Toast }) {
  const [visible, setVisible] = useState(true);
  const { removeToast } = useToastStore();
  const { id, type, message, duration } = toast;

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration ?? DURATION);

    const removeTimer = setTimeout(
      () => {
        removeToast(id);
      },
      (duration ?? DURATION) + ANIMATION,
    );

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [id, removeToast, duration]);
  return (
    <styles.container id={id} $type={type} $visible={visible}>
      {message}
    </styles.container>
  );
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const getToastColors = (type: ToastType) => {
  switch (type) {
    case 'success':
      return { backgroundColor: '#f7f7fc' };
    case 'error':
      return { backgroundColor: '#FF6F61' };
    case 'info':
      return { backgroundColor: '#f7f7fc' };
    default:
      return { backgroundColor: '#f7f7fc' };
  }
};

const styles = {
  wrapper: styled.div`
    position: fixed;
    top: 20px;
    z-index: 999999;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
  `,

  container: styled.div<ToastContainer>`
    width: 90%;
    border-radius: 8px;
    color: ${({ $type }) => ($type === 'error' ? 'white' : '#505050')};
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.02rem;
    background: ${({ $type }) => getToastColors($type).backgroundColor};
    text-align: center;
    padding: 1rem;
    box-shadow: 0px 1px 4px 0px #6e80913d;
    animation: ${({ $visible }) => ($visible ? fadeIn : fadeOut)} 0.5s ease;
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
  `,
};
