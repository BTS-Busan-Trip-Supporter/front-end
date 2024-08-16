import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter, usePathname } from 'next/navigation';

import { NavigationBar } from '@/components';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe('내비게이션 바 스냅샷 테스트', () => {
  let mockRouter: { replace: jest.Mock };
  let mockUsePathname: jest.Mock;

  beforeEach(() => {
    mockRouter = {
      replace: jest.fn(),
    };
    mockUsePathname = usePathname as jest.Mock;
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('pathname이 /login 이거나 /my 인 경우에는 내비게이션 바가 렌더링되지 않아야 합니다.', () => {
    mockUsePathname.mockReturnValue('/login');
    const { container } = render(<NavigationBar />);
    expect(container.firstChild).toBeNull();

    mockUsePathname.mockReturnValue('/my');
    const { container: container2 } = render(<NavigationBar />);
    expect(container2.firstChild).toBeNull();
  });

  test('pathname이 /travel인 경우 여행하기 메뉴가 활성화 되어야 합니다.', () => {
    mockUsePathname.mockReturnValue('/travel');
    render(<NavigationBar />);

    expect(screen.getByAltText('travel-active-menu')).toBeInTheDocument();
    expect(screen.getByText('여행하기')).toHaveStyle('color: #605EFF');
  });

  test('pathname이 /인 경우 홈 메뉴가 활성화 되어야 합니다.', () => {
    mockUsePathname.mockReturnValue('/');
    render(<NavigationBar />);

    expect(screen.getByAltText('home-active-menu')).toBeInTheDocument();
    expect(screen.getByText('홈')).toHaveStyle('color: #605EFF');
  });

  test('pathname이 /record인 경우 기록하기 메뉴가 활성화 되어야 합니다.', () => {
    mockUsePathname.mockReturnValue('/record');
    render(<NavigationBar />);

    expect(screen.getByAltText('record-active-menu')).toBeInTheDocument();
    expect(screen.getByText('기록하기')).toHaveStyle('color: #605EFF');
  });

  test('여행하기 메뉴에 클릭 이벤트가 발생한 경우 router가 /travel 로 replace 되어야 합니다.', () => {});

  test('홈 메뉴에 클릭 이벤트가 발생한 경우 router가 / 로 replace 되어야 합니다.', () => {});

  test('기록하기 메뉴에 클릭 이벤트가 발생한 경우 router가 /record 로 replace 되어야 합니다.', () => {});
});
