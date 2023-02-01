import {Drawer, Tab, Tabs} from "@mui/material"
import React from "react";
import {Step, Tutorial} from "../../../../client/generated";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {setSidePanelView, SidePanelView, toggleSidePanel} from "../../../store/controllerInterfaceSlice";
import {OutlineView} from "./OutlineView";
import {Error} from "../../../../shared/Error";
import {InfoView} from "./InfoView";
import {CommentView} from "./CommentView";

export interface SidePanelProps {
  tutorial: Tutorial,
  step?: Step,
}

export const SidePanel = (props: SidePanelProps) => {
  const dispatch = useAppDispatch();
  const {tutorial, step, ...others} = props;
  const open = useAppSelector(state => state.controllerInterface.sidePanelOpen);
  const sidePanelWidth = useAppSelector(state => state.controllerInterface.sidePanelWidth);
  const sidePanelView = useAppSelector(state => state.controllerInterface.sidePanelView);

  const toggleDrawer = () => {
    dispatch(toggleSidePanel());
  }

  const handleViewChange = (view: SidePanelView) => {
    dispatch(setSidePanelView(view));
  }

  const createTabs = () => {
    const tabs = [];
    for (let view in SidePanelView) {
      tabs.push(<Tab label={view} value={view}/>)
    }
    return <Tabs variant={"scrollable"} value={sidePanelView} onChange={(e, value) => handleViewChange(value)}>
      {tabs}
    </Tabs>
  }

  const createView = () => {
    switch (sidePanelView) {
      case SidePanelView.step:
        if (!step) {
          break;
        }
        return <OutlineView tutorial={tutorial}/>
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
          width: sidePanelWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidePanelWidth,
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
