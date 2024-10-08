import { MAX_CAPACITY } from '@/shared/lib/constants';
import { Progress } from '@/shared/ui/progress';
import { render, screen } from '@testing-library/react';
import ProgressBar from '.';

describe('ProgressBar Component', () => {
  test('화면에 렌더링이 된다.', () => {
    render(<ProgressBar participantCount={0} capacity={MAX_CAPACITY} />);
    expect(screen.getByText('0/20')).toBeInTheDocument();
    expect(screen.getByText('join now')).toBeInTheDocument();
  });

  test('참여자 수가 5 이상일 때 체크 아이콘과 "개설확정" 텍스트가 표시된다.', () => {
    render(<ProgressBar participantCount={5} capacity={MAX_CAPACITY} />);
    expect(screen.getByText('개설확정')).toBeInTheDocument();
  });

  test('참여자 수가 20일 때 "Closed" 상태가 되고, 텍스트가 주황색으로 적용된다.', () => {
    render(<ProgressBar participantCount={20} capacity={MAX_CAPACITY} />);
    expect(screen.getByText('Closed')).toBeInTheDocument();
    expect(screen.getByText('20/20')).toHaveClass(
      'text-sm font-medium text-green-400',
    );
  });
});

describe('Progress Component', () => {
  test('화면에 렌더링이 된다.', () => {
    render(<Progress value={0} capacity={MAX_CAPACITY} />);
    expect(screen.getByTestId('indicator')).toBeInTheDocument();
    expect(screen.getByTestId('indicator')).toHaveClass(
      'h-full w-full flex-1 transition-all bg-green-500',
    );
  });

  test('참여자 수에 따른 프로그레스 바 퍼센티지 계산 테스트', () => {
    render(<Progress value={10} capacity={MAX_CAPACITY} />);
    expect(screen.getByTestId('indicator')).toBeInTheDocument();
    expect(screen.getByTestId('indicator')).toHaveStyle(
      `transform: translateX(-50%)`,
    );
  });

  test('"Closed" 상태일 때 indicator가 연한 주황색으로 변경된다.', () => {
    render(<Progress value={20} capacity={MAX_CAPACITY} />);
    expect(screen.getByTestId('indicator')).toBeInTheDocument();
    expect(screen.getByTestId('indicator')).toHaveClass(
      'h-full w-full flex-1 transition-all bg-green-400',
    );
  });
});
