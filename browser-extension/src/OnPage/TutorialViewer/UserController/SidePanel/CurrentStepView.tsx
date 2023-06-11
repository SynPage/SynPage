import { Step } from '../../../../client/generated'
import { Button, DialogActions, DialogContent, Typography } from '@mui/material'
import React from 'react'
import { Error } from '../../../../shared/Error'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setStepIndex } from '../../../store/tutorialSlice'

export const CurrentStepView = (props: { step: Step }) => {
  const dispatch = useAppDispatch()
  const { step } = props
  const canNext = false

  const handlePrevStep = () => {
    if (step) {
      dispatch(setStepIndex(step.index - 1))
    }
  }

  const handleNextStep = () => {
    if (step) {
      dispatch(setStepIndex(step.index + 1))
    }
  }

  const createActionList = () => {
    if (!step.actions) {
      return <Error error={'Failed to load actions for current step.'} />
    }

    return (
      <ul>
        {step.actions.map((action, index) => (
          <li key={index}>
            <Typography variant={'h6'}>Action Type: {action.type}</Typography>
            <Typography variant={'h6'}>
              Action Target: {action.targetElement}
            </Typography>
            <Typography variant={'h6'}>
              Action Content: {action.extras}
            </Typography>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      <DialogContent>
        <Typography variant={'h6'}>{step.title}</Typography>
        <Typography variant={'body1'}>{step.description}</Typography>
        {createActionList()}
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePrevStep} disabled={step.index < 1}>
          Prev
        </Button>
        <Button onClick={handleNextStep} disabled={!canNext}>
          Next
        </Button>
      </DialogActions>
    </>
  )
}
