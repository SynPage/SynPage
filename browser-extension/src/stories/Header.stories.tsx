import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Header} from '../Popup/components/Header';
import {userEvent, within} from "@storybook/testing-library";

export default {
  title: 'Popup/Header',
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    viewport: {
      defaultViewport: "popup"
    },
    layout: "fullscreen"
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args}/>;

export const Default = Template.bind({});
export const Searching = Template.bind({});
Searching.play = async ({canvasElement}) => {
  const canvas = within(canvasElement);
  const searchButton = await canvas.getByTestId("open-search");
  await userEvent.click(searchButton);
};
// export const LoggedIn = Template.bind({});
// LoggedIn.args = {
//   user: {
//     name: 'Jane Doe',
//   },
// };
//
// export const LoggedOut = Template.bind({});
// LoggedOut.args = {};
