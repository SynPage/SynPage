import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Popup} from '../Popup';
import {mockData, mockPopupClient} from "./TutorialFactory/mockServices";
import {actionsApi, stepsApi, tutorialsApi} from "../client";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Popup',
  component: Popup,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //     backgroundColor: { control: 'color' },
  // },
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    viewport: {
      defaultViewport: "popup"
    },
    layout: "fullscreen",
    mockData: mockData,
  },
} as ComponentMeta<typeof Popup>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Popup> = (args) => {
  return <Popup {...args}/>
};

export const Home = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Home.args = {
  chromeClient: mockPopupClient,
  tutorialsApi: tutorialsApi,
  stepsApi: stepsApi,
  actionsApi: actionsApi,
};