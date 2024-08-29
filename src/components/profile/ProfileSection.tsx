'use client';

import styled from '@emotion/styled';

import { type User } from '@/features/profile';

export function ProfileSection({ user }: { user: User }) {
  return (
    <styles.container>
      <styles.infoEditSection>
        <EditProfileImage imgSrc={user.profileImage} />
        <styles.nickname>{`${user.nickname} #${user.tag}`}</styles.nickname>
      </styles.infoEditSection>
      <styles.infoSection>
        <ProfileInfo user={user} />
      </styles.infoSection>
    </styles.container>
  );
}

function EditProfileImage({ imgSrc }: { imgSrc: string }) {
  return (
    <styles.imageWrapper>
      <styles.profileImg src={imgSrc} alt='profile-img' />
      <styles.cameraIcon />
    </styles.imageWrapper>
  );
}

function ProfileInfo({ user }: { user: User }) {
  return (
    <styles.infoList>
      <ListItem menu='닉네임' content={user.nickname} onClick={() => {}} />
      <ListItem
        menu='비밀번호'
        content={user.password.replace(/./g, '*')}
        onClick={() => {}}
      />
      <ListItem menu='이메일' content={user.email} onClick={() => {}} />
    </styles.infoList>
  );
}

function ListItem({
  menu,
  content,
  onClick,
}: {
  menu: string;
  content: string;
  onClick: () => void;
}) {
  return (
    <li>
      <p>{menu}</p>
      <input type='text' value={content} readOnly={menu === '비밀번호'} />
      <styles.changeButton onClick={onClick}>변경하기</styles.changeButton>
    </li>
  );
}

const styles = {
  container: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    background-color: #fafaff;
  `,

  infoEditSection: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.88rem 1.38rem;
  `,

  imageWrapper: styled.div`
    display: flex;
    position: relative;
  `,
  profileImg: styled.img`
    width: 4.625rem;
    height: 4.625rem;
    background: #f2f2f2;
    border: 0.5px solid #ccc;
    border-radius: 50%;
    overflow: auto;
    object-fit: cover;
  `,

  cameraIcon: styled.div`
    width: 1.5rem;
    height: 1.5rem;
    background: url('/camera.svg') no-repeat center;
    background-size: content;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 100;
  `,

  nickname: styled.div`
    width: 11.8125rem;
    height: 2.4375rem;
    border-radius: 0.375rem;
    border: 0.4px solid #ccc;
    background: #f7f7f7;

    padding: 0.25rem;
    align-items: center;
    justify-content: space-between;
    display: flex;

    color: #505050;
    font-family: 'Noto Sans KR';
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.01875rem;
  `,

  changeButton: styled.button`
    padding: 0.15rem 0.38rem;
    border-radius: 0.25rem;
    border: 0.4px solid #c9c9c9;
    background-color: transparent;

    color: #b5b5b5;
    font-family: 'Noto Sans KR';
    font-size: 0.625rem;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.0125rem;
  `,

  infoSection: styled.div`
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 2rem 1.8rem;
  `,

  infoList: styled.ul`
    display: flex;
    width: 100%;
    flex-direction: column;

    li {
      border-bottom: 0.4px solid #d3d3d3;
      padding: 1.2rem 0.3rem;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      gap: 0.8rem;

      p {
        width: 5rem;
        color: #505050;
        font-family: 'Noto Sans KR';
        font-size: 0.9375rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.01875rem;
      }

      input {
        border: none;
        width: 50%;
        height: 100%;
        color: #b5b5b5;
        text-align: right;
        font-family: 'Noto Sans KR';
        font-size: 0.9375rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.01875rem;

        &:focus {
          outline: none;
        }
      }
    }
  `,
};
