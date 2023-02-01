import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {OnPage} from './index';
import {mockOnPageClient} from "../stories/TutorialFactory/mockServices";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'OnPage',
  component: OnPage,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //     backgroundColor: { control: 'color' },
  // },
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
  },
} as ComponentMeta<typeof OnPage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof OnPage> = (args) => {
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

  return <OnPage {...args}/>
};

export const Home = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Home.args = {
  chromeClient: mockOnPageClient
};
