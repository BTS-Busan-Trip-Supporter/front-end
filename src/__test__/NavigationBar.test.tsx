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

  test('pathname이 /login 이거나 /my, /my/edit 인 경우에는 내비게이션 바가 렌더링되지 않아야 합니다.', () => {
    const pathnames = ['/login', '/my', '/my/edit'];

    pathnames.forEach((pathname) => {
      mockUsePathname.mockReturnValue(pathname);

      const { container } = render(<NavigationBar />);
      expect(container.firstChild).toBeNull();
    });
  });

  test('pathname이 /login 이나 /my가 아닌 경우 내비게이션 바가 렌더링 되어야 합니다.', () => {
    mockUsePathname.mockReturnValue('/test');

    const { getByText } = render(<NavigationBar />);
    expect(getByText('여행하기')).toBeInTheDocument();
    expect(getByText('홈')).toBeInTheDocument();
    expect(getByText('기록하기')).toBeInTheDocument();
  });

  test('pathname이 / 경우 여행하기 메뉴가 활성화 되어야 합니다.', () => {
    mockUsePathname.mockReturnValue('/');
    render(<NavigationBar />);

    expect(screen.getByAltText('travel-active-menu')).toBeInTheDocument();
    expect(screen.getByText('여행하기')).toHaveStyle('color: #605EFF');
  });

  test('pathname이 /my인 경우 마이 페이지 메뉴가 활성화 되어야 합니다.', () => {
    mockUsePathname.mockReturnValue('/');
    render(<NavigationBar />);

    expect(screen.getByAltText('user-active-menu')).toBeInTheDocument();
    expect(screen.getByText('마이 페이지')).toHaveStyle('color: #605EFF');
  });

  test('pathname이 /record인 경우 기록하기 메뉴가 활성화 되어야 합니다.', () => {
    mockUsePathname.mockReturnValue('/record');
    render(<NavigationBar />);

    expect(screen.getByAltText('record-active-menu')).toBeInTheDocument();
    expect(screen.getByText('기록하기')).toHaveStyle('color: #605EFF');
  });

  test('여행하기 메뉴에 클릭 이벤트가 발생한 경우 router가 / 로 replace 되어야 합니다.', () => {
    mockUsePathname.mockReturnValue('/');

    const { getByText } = render(<NavigationBar />);
    fireEvent.click(getByText('여행하기'));

    expect(mockRouter.replace).toHaveBeenCalledWith('/');
  });

  test('마이 페이지 메뉴에 클릭 이벤트가 발생한 경우 router가 /my 로 replace 되어야 합니다.', () => {
    mockUsePathname.mockReturnValue('/my');

    const { getByText } = render(<NavigationBar />);
    fireEvent.click(getByText('마이 페이지'));

    expect(mockRouter.replace).toHaveBeenCalledWith('/my');
  });

  test('기록하기 메뉴에 클릭 이벤트가 발생한 경우 router가 /record 로 replace 되어야 합니다.', () => {
    mockUsePathname.mockReturnValue('/record');

    const { getByText } = render(<NavigationBar />);
    fireEvent.click(getByText('기록하기'));

    expect(mockRouter.replace).toHaveBeenCalledWith('/record');
  });
});
