import type { Meta, StoryObj } from '@storybook/react';

import { Calendar } from './calendar';
import { expect, fn, userEvent } from '@storybook/test';

const meta = {
  component: Calendar,
  args: {
    mode: 'single',
    onMonthChange: fn(),
    onSelect: fn(),
  }
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SelectDayNextMonth: Story = {
  // @ts-expect-error - onSelect is valid when mode is single
  async play({ canvas, args: { onMonthChange, onSelect } }) {
    const nextMonthButton = canvas.getByRole('button', { name: 'Go to next month' });
    await userEvent.click(nextMonthButton);

    await expect(onMonthChange).toHaveBeenCalled();

    const day = canvas.getByRole('gridcell', { name: '41' });
    await userEvent.click(day);

    await expect(onSelect).toHaveBeenCalled();
  },
};