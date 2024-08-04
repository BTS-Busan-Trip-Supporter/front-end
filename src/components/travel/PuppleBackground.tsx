'use client';

import styled from '@emotion/styled';

interface Position {
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
}

interface ChoiceProps {
  where?: string;
  what?: string;
  when?: string;
}

export function PuppleBackground({ choiceList }: { choiceList: ChoiceProps }) {
  return (
    <styles.container>
      <Elements />
      <styles.choiceSection>
        <h2>내가 선택한</h2>
        <styles.choiceList>
          {choiceList.where && <ChoiceItem item={choiceList.where} />}
          {choiceList.what && <ChoiceItem item={choiceList.what} />}
          {choiceList.when && <ChoiceItem item={choiceList.when} />}
        </styles.choiceList>
      </styles.choiceSection>
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

function Elements() {
  return (
    <>
      <styles.image
        src='/background/pupple/ellipse1.svg'
        $top='0'
        $left='0'
        alt='ellipse1'
      />
      <styles.image
        src='/background/pupple/ellipse2.svg'
        $bottom='4rem'
        $right='5rem'
        alt='ellipse2'
      />
      <styles.image
        src='/background/pupple/polygon1.svg'
        $bottom='4rem'
        $left='3rem'
        alt='polygon1'
      />
      <styles.image
        src='/background/pupple/polygon2.svg'
        $top='1rem'
        $right='0'
        alt='polygon2'
      />
      <styles.image
        src='/background/pupple/vector.svg'
        $top='0'
        $right='0'
        alt='vector'
      />
      <styles.rec />
    </>
  );
}

const styles = {
  container: styled.div`
    width: 100%;
    height: 30%;
    position: relative;
    background: linear-gradient(180deg, #6b67f9 0.04%, #3f3d93 90.12%);
    padding: 2.88rem 1.25rem;
    display: flex;
    z-index: -10000;
  `,

  image: styled.img<Position>`
    position: absolute;
    object-fit: content;
    top: ${(props) => props.$top || 'auto'};
    bottom: ${(props) => props.$bottom || 'auto'};
    left: ${(props) => props.$left || 'auto'};
    right: ${(props) => props.$right || 'auto'};
    z-index: -2000;
  `,

  rec: styled.div`
    width: 4.6385rem;
    height: 3.64544rem;
    transform: rotate(29.395deg);
    flex-shrink: 0;

    border-radius: 0.4375rem;
    border: 14px solid #5d5ad8;

    position: absolute;
    bottom: 50%;
    left: 9rem;
    z-index: -2000;
  `,

  choiceSection: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.7rem;

    h2 {
      color: rgba(199, 198, 253, 0.56);
      font-family: 'Noto Sans KR';
      font-size: 0.8125rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.02438rem;
    }
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
