'use client';

import ArrowLeftIcon from '@/shared/assets/icons/arrow-left-pagination.svg';
import ArrowRightIcon from '@/shared/assets/icons/arrow-right-pagination.svg';
import ReviewCard from '@/shared/common/ui/review-card';
import { cn } from '@/shared/lib/utils';
import { Review } from '@/shared/model';
import {
  Pagination,
  PaginationItemRenderProps,
  PaginationItemType,
} from '@nextui-org/pagination';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Reviews } from '../model/reviews';

export interface PaginationReviewsProps {
  reviewList: Reviews;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}

export default function PaginationReviews({
  reviewList,
  currentPage,
  setCurrentPage,
  totalPages,
}: PaginationReviewsProps) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handlePageChange = (page: number) => {
    // 유효한 페이지 내에서만 작동하도록 설정
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  };

  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: PaginationItemRenderProps) => {
    // 첫 페이지, 마지막 페이지일 경우 좌우 버튼 비활성화
    const isNextDisabled = currentPage === totalPages;
    const isPrevDisabled = currentPage === 1;

    const handleNextBtnClick = () => {
      if (!isNextDisabled) {
        onNext();
        handlePageChange(currentPage + 1);
      }
    };

    const handlePrevBtnClick = () => {
      if (!isPrevDisabled) {
        onPrevious();
        handlePageChange(currentPage - 1);
      }
    };

    const handlePageBtnClick = (value: number) => {
      handlePageChange(value - 1);
    };

    if (value === PaginationItemType.NEXT) {
      return (
        <button
          role="button"
          aria-label="next"
          key={key}
          className={cn(
            className,
            'ml-[6px] h-[34px] w-[34px] rounded-lg bg-white md:h-12 md:w-12',
          )}
          onClick={handleNextBtnClick}
          disabled={isNextDisabled}
        >
          <ArrowRightIcon
            className={isNextDisabled ? 'fill-[#E5E7EB]' : 'fill-gray-800'}
          />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          role="button"
          aria-label="prev"
          key={key}
          className={cn(
            className,
            'mr-[6px] h-[34px] w-[34px] rounded-lg bg-white md:h-12 md:w-12',
          )}
          onClick={handlePrevBtnClick}
          disabled={isPrevDisabled}
        >
          <ArrowLeftIcon
            className={isPrevDisabled ? 'fill-[#E5E7EB]' : 'fill-gray-800'}
          />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button
          key={key}
          className={cn(
            className,
            'h-[34px] w-[34px] rounded-lg bg-white md:h-12 md:w-12',
          )}
        >
          <Image
            src="/assets/ellipsis.svg"
            alt="생략 아이콘 이미지"
            width={13}
            height={3}
          />
        </button>
      );
    }

    return (
      <button
        role="button"
        aria-label={String(value)}
        key={key}
        ref={ref}
        className={cn(
          className,
          'h-[34px] w-[34px] rounded-lg bg-white text-sm text-gray-300 md:h-12 md:w-12 md:text-base',

          isActive && 'font-semibold text-green-800',
        )}
        onClick={() => handlePageBtnClick(value)}
      >
        {value}
      </button>
    );
  };

  return (
    <>
      <ul>
        {reviewList?.reviews?.map((review: Review, index) => {
          return (
            <li key={index}>
              <ReviewCard
                page="GATHERING_DETAIL"
                score={review.score}
                userName={review.userName}
                userProfileImage={review.userProfileImage}
                comment={review.comment}
                gatheringLocation={review.gatheringLocation}
                gatheringType={review.gatheringType}
                createdDate={review.createdDate}
              />
            </li>
          );
        })}
      </ul>
      <div className="mx-auto mt-6 w-fit">
        <Pagination
          data-testid="pagination"
          disableCursorAnimation
          showControls
          total={totalPages}
          page={currentPage}
          className="gap-2"
          radius="full"
          renderItem={renderItem}
          variant="light"
          siblings={isMobile ? 0 : 1}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}
