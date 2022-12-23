import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {TutorialViewer} from "../OnPage/TutorialViewer";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'OnPage/TutorialViewer',
  component: TutorialViewer
} as ComponentMeta<typeof TutorialViewer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TutorialViewer> = (args) => <TutorialViewer {...args}/>;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  tutorial: {
    title: "Hello World!",
    target_site: "https://google.ca",
    steps: [
      {
        title: 'Step 1',
        index: 0,
      },
      {
        title: 'Step 2',
        index: 1,
      },
      {
        title: 'Step 3',
        index: 2,
      }
    ]
  }
};