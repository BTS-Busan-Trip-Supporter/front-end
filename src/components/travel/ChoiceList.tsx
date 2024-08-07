'use client';

import styled from '@emotion/styled';

interface ChoiceProps {
  where?: string;
  what?: string;
  when?: string;
}

export function ChoiceList({ choiceList }: { choiceList: ChoiceProps }) {
  return (
    <styles.container>
      <styles.description>내가 선택한</styles.description>
      <styles.choiceList>
        {choiceList.where && <ChoiceItem item={choiceList.where} />}
        {choiceList.what && <ChoiceItem item={choiceList.what} />}
        {choiceList.when && <ChoiceItem item={choiceList.when} />}
      </styles.choiceList>
    </styles.container>
  );
}

function ChoiceItem({ item }: { item: string }) {
  return (
    <styles.choiceItem>
      <styles.pin src='/pin.svg' />
      <span>{item}</span>
    </styles.choiceItem>
  );
}

const styles = {
  container: styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.6rem 0;
    gap: 0.7rem;
  `,

  description: styled.h2`
    color: rgba(199, 198, 253, 0.56);
    font-family: 'Noto Sans KR';
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.02438rem;
  `,

  choiceList: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  `,

  choiceItem: styled.li`
    display: flex;
    gap: 0.5rem;
    align-items: flex-end;

    span {
      color: #fff;
      font-family: 'Noto Sans KR';
      font-size: 1.0625rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.03188rem;
    }
  `,

  pin: styled.img`
    width: 0.3125rem;
    height: auto;
    transform: translateY(-0.2rem);
  `,
};
