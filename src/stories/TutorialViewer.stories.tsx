import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {TutorialViewer} from "../onPageComponents/TutorialViewer";

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
        name: "Hello World!",
        targetSite: "https://google.ca"
    }
};