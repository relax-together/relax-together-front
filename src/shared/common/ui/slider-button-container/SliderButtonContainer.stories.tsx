import { Meta, StoryObj } from '@storybook/react';
import SliderButtonContainer from './index';

const meta = {
  title: 'Shared/ui/SliderButtonContainer',
  component: SliderButtonContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SliderButtonContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSize: Story = {
  args: {
    size: 'default',
  },
};

export const SmallSize: Story = {
  args: {
    size: 'small',
  },
};
