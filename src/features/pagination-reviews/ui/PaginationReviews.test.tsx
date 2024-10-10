import { dummyReviews } from '@/shared/fixture/reviews';
import { REVIEWS_PER_PAGE } from '@/shared/lib/constants';
import { fireEvent, render, screen } from '@testing-library/react';
import PaginationReviews, { PaginationReviewsProps } from '.';

describe('Pagination Component', () => {
  let mockProps: PaginationReviewsProps;

  beforeEach(() => {
    mockProps = {
      reviewList: dummyReviews,
      currentPage: 1,
      setCurrentPage: jest.fn(),
      totalPages: Math.ceil(dummyReviews.totalElements / REVIEWS_PER_PAGE),
    };
  });

  test('화면에 렌더링 된다.', () => {
    render(<PaginationReviews {...mockProps} />);

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  test('페이지 버튼의 수가 올바르게 렌더링 된다.', () => {
    render(<PaginationReviews {...mockProps} />);

    const totalPages = mockProps.totalPages;
    const pageButtons = screen.getAllByRole('button');

    if (totalPages >= 8) {
      expect(pageButtons.length).toBe(9); // 페이지 6개 + dots + 이전 + 다음
    } else {
      expect(pageButtons.length).toBe(totalPages + 2); // 페이지 5개 + 이전 + 다음
    }
  });

  test('첫 페이지에서 이전 버튼이 비활성화된다.', () => {
    render(<PaginationReviews {...mockProps} />);

    const prevButton = screen.getByRole('button', { name: 'prev' });
    expect(prevButton).toBeDisabled();
  });

  test('마지막 페이지에서 다음 버튼이 비활성화된다.', () => {
    render(
      <PaginationReviews {...mockProps} currentPage={mockProps.totalPages} />,
    );

    const nextButton = screen.getByRole('button', { name: 'next' });
    expect(nextButton).toBeDisabled();
  });

  test('페이지 버튼 클릭 시 setCurrentPage가 호출된다.', () => {
    render(<PaginationReviews {...mockProps} />);

    const pageButton = screen.getByRole('button', { name: '2' });
    fireEvent.click(pageButton);
    expect(mockProps.setCurrentPage).toHaveBeenCalledWith(1);
  });

  test('이전, 다음 버튼 클릭 시 setCurrentPage가 호출된다.', () => {
    render(<PaginationReviews {...mockProps} />);

    const nextButton = screen.getByRole('button', { name: 'next' });
    fireEvent.click(nextButton);
    expect(mockProps.setCurrentPage).toHaveBeenCalledWith(2);
  });
});
