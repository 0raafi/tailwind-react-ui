import React from 'react';
import { Meta, Story } from '@storybook/react';
import Button, { ButtonProps } from '.';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <div className="px-2">
    <Button {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: 'button'
};

