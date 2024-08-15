'use client';

import styled from '@emotion/styled';

import { TravelComponent, SearchBox, ScrollMotion } from '@/components';
import { ChoiceList } from '@/components/travel';

export function TravelAutoPage() {
  const data = {
    where: '부산 (Busan)',
    what: '웰니스 관광',
    when: '늦은 오후',
  };

  const Contents = {
    backgroundNode: <ChoiceList choiceList={data} />,
    childNode: (
      <>
        <InputWhat />
        <InputWhen />
      </>
    ),
    type: 'auto',
  };
  return <TravelComponent contents={Contents} />;
}

function InputWhat() {
  return (
    <styles.container>
      <styles.description>
        부산(대한민국)에서
        <br /> 뭐하고 싶으세요?
      </styles.description>
      <SearchBox />
      <ScrollMotion />
    </styles.container>
  );
}

function InputWhen() {
  return <styles.container></styles.container>;
}

const styles = {
  container: styled.div`
    width: 100%;
    gap: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  description: styled.p`
    color: #505050;

    text-align: center;
    font-family: 'Noto Sans KR';
    font-size: 1.4375rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.02875rem;
  `,
};
