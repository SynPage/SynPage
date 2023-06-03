import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {TutorialViewer} from "./index";
import {mockTutorial} from "../../stories/TutorialFactory/mockServices";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'OnPage/TutorialViewer',
	component: TutorialViewer,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	// argTypes: {
	//     backgroundColor: { control: 'color' },
	// },
	parameters: {
		// More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
	},
} as ComponentMeta<typeof TutorialViewer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TutorialViewer> = (args) => {
	return (
		<TutorialViewer {...args}/>
	)
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
	tutorial: mockTutorial
};
