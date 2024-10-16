import Provider from '@/app/provider';
import MypageCard from '@/entities/mypage/ui/card';
import { myGatheringsContents } from '@/shared/fixture/my-gatherings';
import { mockUseSearchParams } from '@/shared/mocks/mockUseSearchParams';
import { render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
  useParams: jest.fn(),
}));

describe('MypageCard Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('모임 참여시간이 남아있고 참여인원이 5명 이상일 경우 나의 모임으로 필터를 하면 화면에 이용 예정(chip-state), 개설확정(chip-state), 모임 정보, 예약 취소하기 버튼이 렌더링된다.', () => {
    mockUseSearchParams('?subPage=my-gatherings');
    render(
      <Provider>
        <MypageCard alt="리뷰 샘플 이미지" {...myGatheringsContents[0]} />,
      </Provider>,
    );

    const upcomingChip = screen.getByText('이용 예정');
    const completedChip = screen.queryByText('개설확정');
    const headerElement = screen.getByRole('heading', { level: 2 });
    const gatheringLocation = screen.getByText('건대입구');
    const cancelReservationButton = screen.getByText('예약 취소하기');

    expect(upcomingChip).toBeInTheDocument();
    expect(completedChip).toBeInTheDocument();
    expect(headerElement).toHaveTextContent('오피스 스트레칭', {
      normalizeWhitespace: true,
    });
    expect(gatheringLocation).toBeInTheDocument();
    expect(cancelReservationButton).toBeInTheDocument();
  });
  test('모임 참여시간이 남아있고 참여인원이 5명 이하일 경우 나의 모임으로 필터를 하면 화면에 이용 예정(chip-state), 개설대기(chip-state),  모임 정보, 예약 취소하기 버튼이 렌더링된다.', () => {
    mockUseSearchParams('?subPage=my-gatherings');
    render(
      <Provider>
        <MypageCard
          {...myGatheringsContents[0]}
          alt="리뷰 샘플 이미지"
          participantCount={4}
        />
        ,
      </Provider>,
    );

    const upcomingChip = screen.getByText('이용 예정');
    const scheduledChip = screen.queryByText('개설대기');
    const headerElement = screen.getByRole('heading', { level: 2 });
    const gatheringLocation = screen.getByText('건대입구');
    const cancelReservationButton = screen.getByText('예약 취소하기');

    expect(upcomingChip).toBeInTheDocument();
    expect(scheduledChip).toBeInTheDocument();
    expect(headerElement).toHaveTextContent('오피스 스트레칭', {
      normalizeWhitespace: true,
    });
    expect(gatheringLocation).toBeInTheDocument();
    expect(cancelReservationButton).toBeInTheDocument();
  });
  test('모임 참여시간이 지났을 경우 나의 모임으로 필터를 하면 화면에 이용 완료(chip-state), 모임 정보, 리뷰 작성하기 버튼이 렌더링된다.', () => {
    mockUseSearchParams('?subPage=my-gatherings');
    render(
      <Provider>
        <MypageCard {...myGatheringsContents[1]} alt="리뷰 샘플 이미지" />,
      </Provider>,
    );

    const upcomingChip = screen.getByText('이용 완료');
    const completedChip = screen.queryByText('개설확정');
    const headerElement = screen.getByRole('heading', { level: 2 });
    const gatheringLocation = screen.getByText('건대입구');
    const writeReviewButton = screen.getByText('리뷰 작성하기');

    expect(upcomingChip).toBeInTheDocument();
    expect(completedChip).not.toBeInTheDocument();
    expect(headerElement).toHaveTextContent('달램핏 마인드풀니스', {
      normalizeWhitespace: true,
    });
    expect(gatheringLocation).toBeInTheDocument();
    expect(writeReviewButton).toBeInTheDocument();
  });
  test('나의 리뷰로 필터를 하면 화면에 chip-state은 보이지 않고, 모임 정보, 리뷰 작성하기 버튼이 렌더링된다.', () => {
    mockUseSearchParams('?subPage=my-reviews');
    render(
      <Provider>
        <MypageCard {...myGatheringsContents[1]} alt="리뷰 샘플 이미지" />,
      </Provider>,
    );

    const upcomingChip = screen.queryByText('이용 완료');
    const completedChip = screen.queryByText('개설확정');
    const headerElement = screen.getByRole('heading', { level: 2 });
    const gatheringLocation = screen.getByText('건대입구');
    const writeReviewButton = screen.getByText('리뷰 작성하기');

    expect(upcomingChip).not.toBeInTheDocument();
    expect(completedChip).not.toBeInTheDocument();
    expect(headerElement).toHaveTextContent('달램핏 마인드풀니스', {
      normalizeWhitespace: true,
    });
    expect(gatheringLocation).toBeInTheDocument();
    expect(writeReviewButton).toBeInTheDocument();
  });
  test('내가 만든 모임으로 필터를 하면 화면에 chip-state와 버튼은 보이지 않고, 모임 정보만 렌더링된다.', () => {
    mockUseSearchParams('?subPage=my-hosted-gatherings');
    render(
      <Provider>
        <MypageCard {...myGatheringsContents[1]} alt="리뷰 샘플 이미지" />,
      </Provider>,
    );

    const upcomingChip = screen.queryByText('이용 완료');
    const completedChip = screen.queryByText('개설확정');
    const writeReviewButton = screen.queryByText('리뷰 작성하기');
    const cancelReservationButton = screen.queryByText('예약 취소하기');

    const headerElement = screen.getByRole('heading', { level: 2 });
    const gatheringLocation = screen.getByText('건대입구');

    expect(upcomingChip).not.toBeInTheDocument();
    expect(completedChip).not.toBeInTheDocument();
    expect(writeReviewButton).not.toBeInTheDocument();
    expect(cancelReservationButton).not.toBeInTheDocument();

    expect(headerElement).toHaveTextContent('달램핏 마인드풀니스', {
      normalizeWhitespace: true,
    });
    expect(gatheringLocation).toBeInTheDocument();
  });
});
