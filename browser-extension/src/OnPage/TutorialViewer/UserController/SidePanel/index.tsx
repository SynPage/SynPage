import {Drawer, Tab, Tabs} from "@mui/material"
import React, {useEffect} from "react";
import {OutlineView} from "./OutlineView";
import {Error} from "../../../../shared/Error";
import {InfoView} from "./InfoView";
import {CommentView} from "./CommentView";
import {Tutorial} from "../../../../client/generated";
import {StepController} from "../../index";
import {SidePanelController} from "../index";

export interface SidePanelProps {
  tutorial: Tutorial,
  sidePanelController: SidePanelController,
  stepController: StepController
}

export enum SidePanelView {
  main = "main",
  comment = "comment",
  step = "step"
}

export const SidePanel = (props: SidePanelProps) => {
  const {tutorial, stepController, sidePanelController} = props;
  const {open, width, view} = sidePanelController;

  const toggleDrawer = () => {
    sidePanelController.toggle();
  }

  const handleViewChange = (view: SidePanelView) => {
    sidePanelController.setView(view);
  }

  const createTabs = () => {
    const tabs = [];
    for (let view in SidePanelView) {
      tabs.push(<Tab label={view} value={view}/>)
    }
    return <Tabs variant={"scrollable"} value={view} onChange={(e, value) => handleViewChange(value)}>
      {tabs}
    </Tabs>
  }

  const createView = () => {
    switch (view) {
      case SidePanelView.step:
        return <OutlineView tutorial={tutorial} stepController={stepController}/>
      case SidePanelView.main:
        return <InfoView tutorial={tutorial}/>
      case SidePanelView.comment:
        return <CommentView tutorial={tutorial}/>
    }
    return <Error error={"View unavailable"}/>
  }

  return (
    <div className={"side-panel"}>
      <Drawer
        sx={{
          width: width,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: width,
            boxSizing: 'border-box',
          },
          border: 'none'
        }}
        anchor="right"
        open={open}
        onClose={() => {
          toggleDrawer()
        }}
        variant={"persistent"}
      >
        {createTabs()}
        {createView()}
      </Drawer>
    </div>
  )
}
