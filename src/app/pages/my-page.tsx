'use client';

import styled from '@emotion/styled';
import { useState } from 'react';

interface Travel {
  name: string;
  date: string;
  with: string;
}

interface User {
  name: string;
  travel: {
    [id: number]: Travel;
  };
  record: { [id: number]: string };
  scrap: { [id: number]: string };
}

export function MyPage() {
  const user = {
    name: 'P의 여행자님',
    travel: {
      1: {
        name: '부산 여행',
        date: '2024.6.23 - 6.25',
        with: '친구들과 함께',
      },
      2: {
        name: '부산 여행',
        date: '2024.6.23 - 6.25',
        with: '친구들과 함께',
      },
      3: {
        name: '부산 여행',
        date: '2024.6.23 - 6.25',
        with: '친구들과 함께',
      },
    },
    record: {},
    scrap: {},
  };

  const [activeTab, setActiveTab] = useState('travel');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'travel':
        return <TravelTab user={user} />;
      case 'record':
        return <RecordTab />;
      case 'scrap':
        return <ScrapTab />;
      default:
        return null;
    }
  };

  return (
    <styles.container>
      <styles.top>
        <styles.header>
          <styles.xBtn src='/x.svg' alt='x' />
          <span>프로필 편집</span>
        </styles.header>
        <styles.profileSection>
          <styles.profileImg />
          <p>{user.name}</p>
        </styles.profileSection>
      </styles.top>
      <styles.tabContainer>
        <styles.tabList>
          <styles.tabItem
            $active={activeTab === 'travel'}
            onClick={() => setActiveTab('travel')}
          >
            내 여행 {Object.keys(user.travel).length}
          </styles.tabItem>
          <styles.tabItem
            $active={activeTab === 'record'}
            onClick={() => setActiveTab('record')}
          >
            내 기록
          </styles.tabItem>
          <styles.tabItem
            $active={activeTab === 'scrap'}
            onClick={() => setActiveTab('scrap')}
          >
            내 저장
          </styles.tabItem>
        </styles.tabList>
        {renderTabContent()}
      </styles.tabContainer>
    </styles.container>
  );
}

function TravelTab({ user }: { user: User }) {
  return (
    <styles.tabContents>
      {Object.values(user.travel).map((travel, id) => (
        <styles.list key={id}>
          <styles.thumbnail />
          <section>
            <h3>{travel.name}</h3>
            <p>{travel.date}</p>
            <p>{travel.with}</p>
          </section>
          <styles.ellipsisBtn />
        </styles.list>
      ))}
    </styles.tabContents>
  );
}

function RecordTab() {
  return <></>;
}

function ScrapTab() {
  return <></>;
}

const styles = {
  container: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
  `,
  top: styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.7rem 0 3.5rem 0;
    width: 100%;
    align-items: center;
    gap: 4.375rem;
    background: #fafaff;
  `,
  header: styled.div`
    display: flex;
    padding: 0rem 1.17188rem;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;

    span {
      color: #605eff;

      text-align: center;
      font-family: 'Noto Sans KR';
      font-size: 0.8125rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.01625rem;
      cursor: pointer;
    }
  `,

  xBtn: styled.img`
    width: 1.06069rem;
    height: 1.06069rem;
    cursor: pointer;
  `,

  profileSection: styled.section`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 1.19rem;
    align-self: stretch;

    p {
      align-self: stretch;
      color: #505050;

      text-align: center;
      font-family: 'Noto Sans KR';
      font-size: 1.3125rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.02625rem;
    }
  `,

  profileImg: styled.div`
    width: 4.625rem;
    height: 4.625rem;
    border-radius: 50%;
    border: 0.5px solid #ccc;
    background-color: #f2f2f2;
  `,
  tabContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
  tabList: styled.ul`
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding: 1.12rem 0;
    border-bottom: 1.2px solid #f1f1f1;
  `,

  tabItem: styled.li<{ $active: boolean }>`
    color: ${({ $active }) => ($active ? '#505050' : '#e6e6e6')};

    text-align: center;
    font-family: 'Noto Sans KR';
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.01875rem;
    cursor: pointer;
  `,

  tabContents: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1.62rem 1.36rem;
    gap: 1rem;

    text-align: center;
    font-family: 'Noto Sans KR';
    font-style: normal;
    line-height: normal;
  `,

  list: styled.div`
    display: flex;
    gap: 0.69rem;

    section {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    }

    h3 {
      color: #3a3a3a;
      font-size: 0.875rem;
      font-weight: 500;
      letter-spacing: -0.0175rem;
    }

    p {
      color: #919191;
      font-size: 0.625rem;
      font-weight: 400;
      letter-spacing: -0.0125rem;
    }
  `,

  thumbnail: styled.div`
    width: 4rem;
    height: 3.25rem;
    flex-shrink: 0;
    border-radius: 0.375rem;
    background: #d9d9d9;
  `,

  ellipsisBtn: styled.button`
    width: 1rem;
    height: 100%;
    background: url('/ellipsis.svg') no-repeat center;
    background-size: 100%;
    border: none;
    cursor: pointer;
  `,
};
