'use client';

import styled from '@emotion/styled';
import { useState } from 'react';

import { DropBox } from './DropBox';

export function SearchBox({
  onClick,
  setContent,
  dropBoxType,
  placeholder,
  className,
}: {
  onClick?: () => void;
  setContent?: (value: string) => void;
  dropBoxType?: 'travelType' | 'regionType';
  placeholder?: string;
  className?: string;
}) {
  const [value, setValue] = useState<string | null>(null);
  const [dropBoxVisible, setDropBoxVisible] = useState(false);

  const handleChange = (content: string) => {
    if (setContent) setContent(content);
    setValue(content);
  };

  return (
    <styles.container
      onClick={() => {
        if (dropBoxType !== undefined) setDropBoxVisible(true);
      }}
      className={className}
    >
      <styles.searchInput
        readOnly={dropBoxVisible}
        placeholder={placeholder || '키워드나 활동을 찾아보세요.'}
        value={value ?? ''}
        onChange={
          dropBoxType === undefined
            ? (e) => {
                handleChange(e.target.value);
              }
            : () => {}
        }
      />
      {onClick && (
        <button type='button' onClick={onClick}>
          <img alt='search' src='/search.svg' />
        </button>
      )}
      {dropBoxVisible && (
        <DropBox
          type={dropBoxType ?? 'travelType'}
          setContent={handleChange}
          setDropBoxVisible={setDropBoxVisible}
        />
      )}
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    width: 100%;
    padding: 1rem 1.44rem;
    border-radius: 4rem;
    background: #fff;
    box-shadow: 3px 3px 8px 0px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    button {
      all: unset;
      cursor: pointer;
    }
  `,

  searchInput: styled.input`
    width: 90%;
    height: 100%;
    color: #505050;
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.03rem;
    border: none;
    margin-left: 0.5rem;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #e2e2e2;
    }
  `,
};
