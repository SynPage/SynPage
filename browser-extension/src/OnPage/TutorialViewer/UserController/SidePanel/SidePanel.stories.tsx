import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {SidePanel, SidePanelView} from "./index";
import {mockTutorial} from "../../../../stories/TutorialFactory/mockServices";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'OnPage/SidePanel',
	component: SidePanel,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	// argTypes: {
	//     backgroundColor: { control: 'color' },
	// },
	parameters: {
		// More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
	},
} as ComponentMeta<typeof SidePanel>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SidePanel> = (args) => {
	return (
		<SidePanel {...args}/>
	)
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
	tutorial: mockTutorial,
	sidePanelController: {
		open: true,
		width: 300,
		view: SidePanelView.step,
		toggle: () => {

		},
		setView: (view: SidePanelView) => {

		}
	}
};
