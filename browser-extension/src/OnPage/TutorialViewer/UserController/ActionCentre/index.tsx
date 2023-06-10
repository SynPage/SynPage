import React from 'react'
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined'
import SaveIcon from '@mui/icons-material/Save'
import PrintIcon from '@mui/icons-material/Print'
import { SidePanelView } from '../SidePanel'
import { SidePanelController } from '../index'

export interface ActionCentreProps {
  sidePanelController: SidePanelController
}

export const ActionCentre = (props: ActionCentreProps) => {
  const { sidePanelController } = props
  const sidePanelWidth = sidePanelController.open
    ? sidePanelController.width
    : 0
  const fabBottom = 16
  const fabRight = 16
  const logoUrl = 'https://i.imgur.com/WJeZZ7Q.png'

  const actions = [
    { icon: <FileCopyIcon />, view: SidePanelView.step },
    // {icon: <SaveIcon/>, view: SidePanelView.comment},
    // {icon: <PrintIcon/>, view: SidePanelView.main},
  ]

  const handleSpeedDialViewClick = (view: SidePanelView) => {
    sidePanelController.setView(view)
  }

  return (
    <div className={'action-centre'}>
      <SpeedDial
        ariaLabel="Action Centre"
        sx={{
          position: 'fixed',
          bottom: fabBottom,
          right: fabRight + sidePanelWidth,
        }}
        icon={<img src={logoUrl} height={'80%'} width={'80%'} />}
        direction={'left'}
        onDoubleClick={() => {
          sidePanelController.toggle()
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.view}
            icon={action.icon}
            tooltipTitle={action.view}
            onClick={(e) => {
              if (!sidePanelController.open) {
                sidePanelController.toggle()
              }
              handleSpeedDialViewClick(action.view)
            }}
          />
        ))}
      </SpeedDial>
    </div>
  )
}
