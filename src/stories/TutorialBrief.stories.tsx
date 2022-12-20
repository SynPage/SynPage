import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {TutorialBrief} from "../popupComponents/TutorialBrief";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Popup/TutorialBrief',
  component: TutorialBrief,
} as ComponentMeta<typeof TutorialBrief>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TutorialBrief> = (args) => <TutorialBrief {...args}/>;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Primary.args = {
//     primary: true,
//     label: 'Button',
// };