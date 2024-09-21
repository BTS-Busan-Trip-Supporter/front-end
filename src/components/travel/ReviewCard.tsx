'use client';

import styled from '@emotion/styled';
import { useState } from 'react';

export function ReviewCard({
  name,
  date,
  prevReview,
}: {
  name: string;
  date: string;
  prevReview?: string | null;
}) {
  const [review, setReview] = useState<string | null>(prevReview ?? null);

  return (
    <styles.wrapper>
      <styles.container>
        <div>
          <p className='name'>{name}</p>
          <Likes />
        </div>
        <p className='dateTime'>{date}</p>
        <ReviewInput review={review} setReview={setReview} />
      </styles.container>
    </styles.wrapper>
  );
}

function Likes() {
  return (
    <div className='likes'>
      <styles.button src='/button/like.png' alt='like-button' />
      <styles.button src='/button/unlike.png' alt='like-button' />
    </div>
  );
}

function ReviewInput({
  review,
  setReview,
}: {
  review: string | null;
  setReview: (r: string | null) => void;
}) {
  const [text, setText] = useState<string | null>(null);
  return (
    <div style={{ gap: '1rem', marginTop: '1rem' }}>
      {review ? (
        <>
          <input
            className='existReview'
            type='text'
            placeholder='한줄 기록 남기기'
            value={text ?? review}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <div style={{ gap: '0.5rem' }}>
            <styles.button
              src='/button/check.svg'
              alt='check-button'
              onClick={() => {
                if (text) setReview(text);
              }}
            />
            <styles.button
              src='/button/plus.svg'
              alt='x-button'
              style={{ transform: 'rotate(45deg)' }}
              onClick={() => {
                setReview(null);
                setText(null);
              }}
            />
          </div>
        </>
      ) : (
        <>
          <input
            type='text'
            placeholder='한줄 기록 남기기'
            value={text ?? ''}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <styles.button
            src='/button/plus.svg'
            alt='plus-button'
            onClick={() => {
              if (text) setReview(text);
            }}
          />
        </>
      )}
    </div>
  );
}

const styles = {
  wrapper: styled.div`
    width: 100%;
    padding: 0.5rem;
  `,
  container: styled.div`
    width: 100%;
    border-radius: 20px;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    padding: 1.5rem 1rem;
    gap: 1rem;

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .name {
      color: #7d7d7d;
      font-family: 'Noto Sans KR';
      font-size: 0.9375rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.01875rem;
    }

    .likes {
      display: flex;
      gap: 0.5rem;
    }

    .dateTime {
      color: #a2a2a2;
      font-family: 'Noto Sans KR';
      font-size: 0.9375rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    input {
      border-radius: 50px;
      width: 100%;
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
      padding: 0.5rem 0.8rem;
      border: none;
      flex: 1;

      color: #7d7d7d;
      font-family: 'Noto Sans KR';
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.01875rem;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: #e2e2e2;
      }

      .review {
        color: #7d7d7d;
        font-family: 'Noto Sans KR';
        font-size: 0.9375rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: -0.01875rem;
      }
    }

    .existReview {
      background-color: transparent;
      box-shadow: none;

      &:focus {
        background-color: white;
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
      }
    }
  `,

  button: styled.img`
    width: 1.375rem;
    height: 1.375rem;
    object-fit: contain;
  `,
};
