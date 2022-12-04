import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {SidePanel} from "../onPageComponents/SidePanel";
import {SidePanelStepView, SidePanelTutorialView} from "../onPageComponents/SidePanelViews";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'OnPage/SidePanel',
    component: SidePanel
} as ComponentMeta<typeof SidePanel>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SidePanel> = (args) => <SidePanel {...args}/>;

export const StepView = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
StepView.args = {
    children: <SidePanelStepView/>,
};

export const TutorialView = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TutorialView.args = {
    children: <SidePanelTutorialView/>,
};