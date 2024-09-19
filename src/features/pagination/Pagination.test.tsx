import { REVIEWS_PER_PAGE } from '@/shared/lib/constants';
import { fireEvent, render, screen } from '@testing-library/react';
import PaginationComponent, { PaginationComponentProps } from '.';
import { reviews } from './dummy';

describe('Pagination Component', () => {
  let mockProps: PaginationComponentProps;

  beforeEach(() => {
    mockProps = {
      reviewList: reviews,
      currentPage: 1,
      setCurrentPage: jest.fn(),
      totalPages: Math.ceil(reviews.length / REVIEWS_PER_PAGE),
      getReviewData: jest.fn(),
    };
  });

  test('화면에 렌더링 된다.', () => {
    render(<PaginationComponent {...mockProps} />);

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  test('페이지 버튼의 수가 올바르게 렌더링 된다.', () => {
    render(<PaginationComponent {...mockProps} />);

    const totalPages = mockProps.totalPages;
    const pageButtons = screen.getAllByRole('button');

    if (totalPages >= 8) {
      expect(pageButtons.length).toBe(9); // 페이지 6개 + dots + 이전 + 다음
    } else {
      expect(pageButtons.length).toBe(totalPages + 2); // 페이지 5개 + 이전 + 다음
    }
  });

  test('첫 페이지에서 이전 버튼이 비활성화된다.', () => {
    render(<PaginationComponent {...mockProps} />);

    const prevButton = screen.getByRole('button', { name: 'prev' });
    expect(prevButton).toBeDisabled();
  });

  test('마지막 페이지에서 다음 버튼이 비활성화된다.', () => {
    render(
      <PaginationComponent {...mockProps} currentPage={mockProps.totalPages} />,
    );

    const nextButton = screen.getByRole('button', { name: 'next' });
    expect(nextButton).toBeDisabled();
  });

  test('페이지 버튼 클릭 시 setCurrentPage와 getReviewData가 호출된다.', () => {
    render(<PaginationComponent {...mockProps} />);

    const pageButton = screen.getByRole('button', { name: '2' });
    fireEvent.click(pageButton);
    expect(mockProps.setCurrentPage).toHaveBeenCalledWith(2);
    expect(mockProps.getReviewData).toHaveBeenCalledWith(2);
  });

  test('이전, 다음 버튼 클릭 시 setCurrentPage와 getReviewData가 호출된다.', () => {
    render(<PaginationComponent {...mockProps} />);

    const nextButton = screen.getByRole('button', { name: 'next' });
    fireEvent.click(nextButton);
    expect(mockProps.setCurrentPage).toHaveBeenCalledWith(2);
    expect(mockProps.getReviewData).toHaveBeenCalledWith(2);
  });
});