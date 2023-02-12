import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {StepActionList} from "./StepActionList";
import {mockSteps, mockTutorial} from "../stories/TutorialFactory/mockServices";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Step Action List',
	component: StepActionList,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	// argTypes: {
	//     backgroundColor: { control: 'color' },
	// },
	parameters: {
		// More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
		viewport: {
			defaultViewport: "popup"
		},
	},
} as ComponentMeta<typeof StepActionList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StepActionList> = (args) => {
	return <StepActionList {...args}/>
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
	step: mockSteps[0]
};
