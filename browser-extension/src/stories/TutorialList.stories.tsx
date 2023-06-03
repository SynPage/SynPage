import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {TutorialList} from '../Popup/components/TutorialList';
import {mockTutorial} from "./TutorialFactory/mockServices";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Popup/TutorialList',
  component: TutorialList,
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
} as ComponentMeta<typeof TutorialList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TutorialList> = (args) => <TutorialList {...args}/>;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    tutorials: [
      {
        "id": 0,
        "title": "Test"
      }
    ]
};
