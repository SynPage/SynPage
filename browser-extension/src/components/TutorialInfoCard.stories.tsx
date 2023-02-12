import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {TutorialInfoCard} from "./TutorialInfoCard";
import {mockTutorial} from "../stories/TutorialFactory/mockServices";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Tutorial Info Card',
	component: TutorialInfoCard,
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
} as ComponentMeta<typeof TutorialInfoCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TutorialInfoCard> = (args) => {
	// useEffect(() => {
	//   mockServices.chromeClient.triggerSuccess?.({
	//     type: QueryType.init, message: {
	//       "id": 1,
	//       "title": "Hello World",
	//       "description": "This is a description.",
	//       "target_site": "http://127.0.0.1:8000/tutorials/",
	//       "steps": [
	//         {
	//           "id": 1,
	//           "title": "Step 1",
	//           "index": 0
	//         }
	//       ]
	//     }
	//   }).then(value => {
	//     console.log(value);
	//   })
	// }, [mockServices.chromeClient.triggerSuccess])

	return <TutorialInfoCard {...args}/>
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
	tutorial: mockTutorial
};
