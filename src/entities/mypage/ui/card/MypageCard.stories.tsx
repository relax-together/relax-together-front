import { getISOTimeWithOffset } from '@/shared/lib/utils';
import type { Meta, StoryObj } from '@storybook/react';
import MypageCard from './index';

const meta: Meta<typeof MypageCard> = {
  title: 'Entities/Mypage/ui/MypageCard',
  component: MypageCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: Story => (
    <div className="w-full md:w-[996px]">
      <Story />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof MypageCard>;

export const MyGatheringsWithButtonActive: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/mypage',
        query: { subPage: 'my-gatherings' },
      },
    },
  },
  render: function Render(args) {
    return <MypageCard {...args} />;
  },
  args: {
    imageUrl: '/assets/review-sample.png',
    alt: '리뷰 샘플 이미지',
    name: '달램핏 오피스 스트래칭',
    location: '을지로3가',
    participantCount: 5,
    dateTime: getISOTimeWithOffset(4),
  },
};

export const MyGatheringsWithButtonActiveAndCompleted: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/mypage',
        query: { subPage: 'my-gatherings' },
      },
    },
  },
  render: function Render(args) {
    return <MypageCard {...args} />;
  },
  args: {
    imageUrl: '/assets/review-sample.png',
    alt: '리뷰 샘플 이미지',
    name: '달램핏 오피스 스트래칭',
    location: '을지로3가',
    participantCount: 5,
    dateTime: getISOTimeWithOffset(-4),
  },
};

export const MyReviewsWithButtonActive: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/mypage',
        query: { subPage: 'my-reviews' },
      },
    },
  },
  render: function Render(args) {
    return <MypageCard {...args} />;
  },
  args: {
    imageUrl: '/assets/review-sample.png',
    alt: '리뷰 샘플 이미지',
    name: '달램핏 오피스 스트래칭',
    location: '을지로3가',
    participantCount: 5,
    dateTime: getISOTimeWithOffset(4),
  },
};

export const MyHostedGatherings: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/mypage',
        query: { subPage: 'my-hosted-gatherings' },
      },
    },
  },
  render: function Render(args) {
    return <MypageCard {...args} />;
  },
  args: {
    imageUrl: '/assets/review-sample.png',
    alt: '리뷰 샘플 이미지',
    name: '달램핏 오피스 스트래칭',
    location: '을지로3가',
    participantCount: 5,
    dateTime: getISOTimeWithOffset(4),
  },
};
