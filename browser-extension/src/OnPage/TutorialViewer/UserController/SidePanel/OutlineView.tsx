import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React from 'react'
import { Tutorial } from '../../../../client/generated'
import { StepActionList } from '../../../../components/StepActionList'
import { StepController } from '../../index'

export const OutlineView = (props: {
  tutorial: Tutorial
  stepController: StepController
}) => {
  const { tutorial, stepController } = props
  const { stepIndex } = stepController

  const handleStepItemClick = (selectedIndex: number) => {
    stepController.setStep(selectedIndex)
  }

  return (
    <Box className={'outline-view'}>
      {tutorial.steps &&
        tutorial.steps.map((step, index) => (
          <Accordion
            key={step.index}
            expanded={index === stepIndex}
            onChange={() => handleStepItemClick(index)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{step.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{step.description}</Typography>
              <StepActionList step={step} />
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  )
}
