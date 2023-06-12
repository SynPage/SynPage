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
            key={`accordion-${step.index}`}
            expanded={index === stepIndex}
            onChange={() => handleStepItemClick(index)}
          >
            <AccordionSummary
              key={`summary-${step.index}`}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography key={`typo-${step.index}`}>{step.title}</Typography>
            </AccordionSummary>
            <AccordionDetails key={`details-${step.index}`}>
              <Typography key={`typo2-${step.index}`}>
                {step.description}
              </Typography>
              <StepActionList key={`step-${step.index}`} step={step} />
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  )
}
