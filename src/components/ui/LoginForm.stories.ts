import type { Meta, StoryObj } from '@storybook/react';

import { LoginForm } from './login-form';
import { expect, fn, userEvent } from '@storybook/test';

const meta = {
  component: LoginForm,
  args: {
    onSubmit: fn(),
  }
} satisfies Meta<typeof LoginForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyForm: Story = {};

export const FilledForm: Story = {
  play: async ({ args, canvas }) => {
    // 👇 Simulate interactions with the component
    await userEvent.type(canvas.getByLabelText('Email'), 'email@provider.com');

    await userEvent.type(canvas.getByLabelText('Password'), 'a-random-password');

    await userEvent.click(canvas.getByRole('button', { name: 'Log in'}));

    // 👇 Assert DOM structure
    await expect(
      canvas.getByText(
        'Everything is perfect. Your account is ready and we should probably get you started!',
      ),
    ).toBeInTheDocument();

    // 👇 Assert that the onSubmit callback was called
    await expect(args.onSubmit).toHaveBeenCalled();
  },
};