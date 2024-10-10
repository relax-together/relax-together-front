'use client';
import { ReviewCardProps } from '@/shared/common/ui/review-card';
import { Page } from '@/shared/lib/constants';
import { formatFullDate } from '@/shared/lib/utils';
import { useEffect, useRef, useState } from 'react';
import ReviewPlaceTag from './PlaceTag';
import ReviewHearts from './ReviewHearts';
import ReviewProfile from './ReviewProfile';

const REVIEW_MAX_LENGTH = 3;

export default function ReviewContent(props: ReviewCardProps) {
  const {
    page,
    score,
    comment,
    gatheringType,
    gatheringLocation,
    userName,
    userProfileImage,
    createdDate,
  } = props;
  const [moreButton, setMoreButton] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const commentRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  useEffect(() => {
    if (commentRef.current) {
      const element = commentRef.current;
      const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
      const height = element.clientHeight;
      const lines = Math.round(height / lineHeight);
      if (lines > REVIEW_MAX_LENGTH) {
        setMoreButton(true);
      }
    }
  }, []);

  return (
    <div
      className={`flex ${page === Page.GATHERING_DETAIL ? 'min-h-[102px] py-4' : 'pb-1'} flex-col gap-2 border-b-2 border-dashed border-b-gray-200 text-gray-700 sm:w-full`}
    >
      <div className="relative flex flex-col gap-[10px]">
        <ReviewHearts score={score} />
        <div
          ref={commentRef}
          className={`${moreButton && !isExpanded ? 'line-clamp-3 overflow-hidden' : ''} text-sm font-medium`}
        >
          {comment}
          {moreButton ? (
            <button
              onClick={toggleExpand}
              className="absolute bottom-2 right-0 z-10 text-xs font-medium text-gray-500"
            >
              {isExpanded ? '간략히' : '자세히 보기'}
            </button>
          ) : (
            <></>
          )}
        </div>

        {page !== Page.GATHERING_DETAIL && (
          <ReviewPlaceTag
            gatheringType={gatheringType}
            gatheringLocation={gatheringLocation}
          />
        )}
      </div>
      <div className="font-xs text-medium flex items-center gap-3">
        {page !== Page.MYPAGE && (
          <ReviewProfile
            userName={userName}
            userProfileImage={userProfileImage}
          />
        )}
        <div className="text-xs font-medium text-gray-500">
          {formatFullDate(createdDate)}
        </div>
      </div>
    </div>
  );
}
