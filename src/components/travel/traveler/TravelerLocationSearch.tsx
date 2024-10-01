'use client';

import styled from '@emotion/styled';

import { SearchBox } from '@/components';
import { Loading } from '@/components/travel';
import { useTripStore } from '@/features/trip/trip.slice';

interface Location {
  contentId: string;
  contentTypeId: string;
  title: string;
  imageUrl: string;
}

export function TravelerLocationSearch({
  locations,
  onClick,
  onContentChange,
  onPrevPage,
  onItemClick,
}: {
  locations: Location[];
  onClick: () => void;
  onContentChange: (value: string) => void;
  onPrevPage: () => void;
  onItemClick: (lcoation: Location) => void;
}) {
  const { isLoading } = useTripStore();

  if (isLoading) return <Loading type='travel' />;

  return (
    <styles.container>
      <styles.header>
        <styles.prevButton
          src='/chevron-left.svg'
          alt='chevron-left'
          onClick={onPrevPage}
        />
      </styles.header>
      <h2>미리 계획한 장소를 입력하세요.</h2>
      <SearchBox
        setContent={onContentChange}
        onClick={onClick}
        placeholder='장소를 입력해주세요.'
      />
      {locations.length > 0 ? (
        <styles.results>
          {locations.map((location) => (
            <LocationItem
              key={location.title}
              location={location}
              onClick={() => onItemClick(location)}
            />
          ))}
        </styles.results>
      ) : (
        <styles.empty>검색을 해주세요!</styles.empty>
      )}
    </styles.container>
  );
}

function LocationItem({
  location: { title, imageUrl },
  onClick,
}: {
  location: Location;
  onClick: () => void;
}) {
  return (
    <styles.locationItem onClick={onClick}>
      <img src={imageUrl} alt={imageUrl} />
      <p>{title}</p>
    </styles.locationItem>
  );
}

const styles = {
  container: styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    h2 {
      font-family: Noto Sans KR;
      font-size: 23px;
      font-weight: 700;
      line-height: 33.3px;
      letter-spacing: -0.02em;
      text-align: center;

      color: #505050;
    }
  `,

  header: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,

  prevButton: styled.img`
    width: 1rem;
    height: 1rem;
  `,

  results: styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 2rem;
  `,

  locationItem: styled.div`
    width: calc(50% - 1rem);
    height: 100px;

    img {
      width: 100%;
      height: 90%;

      background: #fff;
      border-radius: 8px;
      box-shadow: 0px 1px 4px 0px #6e80913d;

      object-fit: cover;
      object-position: center;
    }
  `,

  empty: styled.p`
    font-family: Noto Sans KR;
    font-size: 1rem;
    font-weight: 700;
    line-height: 33.3px;
    text-align: center;

    color: #505050;
  `,
};
