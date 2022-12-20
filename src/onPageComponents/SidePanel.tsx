import {Box, Button, Drawer, IconButton, Toolbar,} from "@mui/material"
import React, {useState} from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {Menu} from "@mui/icons-material";

export interface SidePanelProps {
  onToggleView: () => void,
  onExitTutorial: () => void,
  children?: React.ReactNode
}

export const SidePanel = (props: SidePanelProps) => {
  const {onToggleView, onExitTutorial, ...others} = props;
  const [open, setOpen] = useState(false);
  const sidePanelWidth = 250;

  const toggleDrawer = () => {
    setOpen(!open);
  }

  return (
    <div>
      <Button onClick={toggleDrawer}
              sx={{
                position: 'absolute',
                padding: 0,
                minHeight: 0,
                minWidth: 0,
                height: 100,
                bottom: 'calc(50% - 50px)',
                right: open ? sidePanelWidth : 0,
                border: 1,
                borderRadius: 0,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10
              }}><KeyboardArrowRightIcon fontSize="small"/>
      </Button>
      <Drawer
        sx={{
          width: sidePanelWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidePanelWidth,
            boxSizing: 'border-box',
          },
          backgroundColor: 'transparent',
          border: 'none'
        }}
        anchor="right"
        open={open}
        onClose={() => {
          toggleDrawer()
        }}
        variant={"persistent"}
      >
        <Box position="static" borderBottom={1}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={onToggleView}
            >
              <Menu/>
            </IconButton>
            <Box sx={{flexGrow: 1}}></Box>
            <Button
              color="inherit"
              aria-label="exit"
              onClick={onExitTutorial}
            >
              Exit
            </Button>
          </Toolbar>
        </Box>
        {props.children}
      </Drawer>
    </div>
  )
}