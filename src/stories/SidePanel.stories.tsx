import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {SidePanel} from "../onPageComponents/SidePanel";
import {Box} from "@mui/material";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'OnPage/SidePanel',
  component: SidePanel
} as ComponentMeta<typeof SidePanel>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SidePanel> = (args) => <SidePanel {...args}/>;

export const DefaultView = Template.bind({});
DefaultView.args = {
  children: <Box sx={{backgroundColor: "orange", width: "100%", height: "100%"}}>
    Customizable content
  </Box>
}
