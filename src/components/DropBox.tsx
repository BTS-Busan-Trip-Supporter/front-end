'use client';

import styled from '@emotion/styled';

interface Type {
  id: number;
  type: string;
}

const types = {
  travelType: [
    { id: 12, type: '관광지' },
    { id: 14, type: '문화시설' },
    { id: 15, type: '축제공연행사' },
    { id: 28, type: '레포츠' },
    { id: 38, type: '쇼핑' },
    { id: 39, type: '음식점' },
  ],
  regionType: [
    { id: 1, type: '강서구' },
    { id: 2, type: '금정구' },
    { id: 3, type: '기장군' },
    { id: 4, type: '남구' },
    { id: 5, type: '동구' },
    { id: 6, type: '동래구' },
    { id: 7, type: '부산진구' },
    { id: 8, type: '북구' },
    { id: 9, type: '사상구' },
    { id: 10, type: '사하구' },
    { id: 11, type: '서구' },
    { id: 12, type: '수영구' },
    { id: 13, type: '연제구' },
    { id: 14, type: '영도구' },
    { id: 15, type: '중구' },
    { id: 16, type: '해운대구' },
  ],
};

export function DropBox({
  type,
  setContent,
  setDropBoxVisible,
}: {
  type: string;
  setContent: (content: string) => void;
  setDropBoxVisible: (i: boolean) => void;
}) {
  return (
    <styles.wrapper>
      <styles.container>
        <div className='listWrapper'>
          <div className='listContainer'>
            {types[type as keyof typeof types].map((item: Type) => (
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
