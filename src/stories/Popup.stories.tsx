import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import Popup from '../Popup';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Popup/Home',
  component: Popup,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //     backgroundColor: { control: 'color' },
  // },
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    viewport: {
      defaultViewport: "popup"
    },
    layout: "fullscreen"
  },
} as ComponentMeta<typeof Popup>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Popup> = (args) => <Popup/>;

export const Guest = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Primary.args = {
//     primary: true,
//     label: 'Button',
// };