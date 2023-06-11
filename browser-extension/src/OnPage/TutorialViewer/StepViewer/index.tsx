import { Action, Step } from '../../../client/generated'
import React, { useEffect, useState } from 'react'
import { StepController } from '../index'
import Joyride, {
  Step as JoyrideStep,
  CallBackProps,
  EVENTS,
  ACTIONS,
  STATUS,
} from 'react-joyride'
import { ElementUtils } from '../../../shared/ElementUtils'
import { useAppSelector } from '../../store/hooks'
import { Alert } from '@mui/material'

export interface StepViewerProps {
  step: Step
  stepController: StepController
}

export const StepViewer = (props: StepViewerProps) => {
  const { step, stepController } = props
  const [joyrideSteps, setJoyrideSteps] = useState<JoyrideStep[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const chromeClient = useAppSelector(
    (state) => state.tutorialManager.chromeClient,
  )

  useEffect(() => {
    setLoading(true)
    loadOnPageActions().then(() => setLoading(false))
  }, [step])

  const loadOnPageActions = async () => {
    const joyrideSteps: JoyrideStep[] = []
    if (step.actions.length < 1) {
      joyrideSteps.push({
        content: (
          <div>
            <h2>{step.description}</h2>
          </div>
        ),
        placement: 'center',
        target: 'body',
      })
    }
    joyrideSteps.push(
      ...(await Promise.all(
        step.actions.map(async (action): Promise<JoyrideStep> => {
          if (!action.targetElement || action.targetElement === '') {
            return {
              content: (
                <div>
                  <h2>{action.description}</h2>
                </div>
              ),
              placement: 'center',
              target: 'body',
              floaterProps: {
                hideArrow: true,
              },
            }
          }
          let selector = await ElementUtils.getNodeSelectorByDescription(
            action.targetElement,
            chromeClient,
          )
          try {
            const targetElement = document.querySelector(selector)
            console.log('Target element found', selector, targetElement)
            return {
              content: <h2>{action.description}</h2>,
              spotlightPadding: 20,
              spotlightClicks: true,
              target: selector,
            }
          } catch (e) {
            console.log('Target element not found', selector, e)
            return {
              content: (
                <div>
                  <Alert severity="info" sx={{ fontFamily: 'Inter' }}>
                    The target element could not be located. Follow the step
                    below.
                  </Alert>
                  <h2 style={{ fontFamily: 'Inter' }}>{action.description}</h2>
                </div>
              ),
              placement: 'top-start',
              target: 'body',
              disableBeacon: true,
              spotlightClicks: true,
              locale: {
                back: 'Back',
                close: 'Close',
                last: 'Done',
                next: 'Done',
                skip: 'Skip',
              },
              floaterProps: {
                hideArrow: true,
              },
            }
          }
        }),
      )),
    )

    console.log('Joyride steps', joyrideSteps)
    setJoyrideSteps(joyrideSteps)
  }

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data

    if (type === EVENTS.TOUR_END) {
      console.log('Joyride tour ended')
      if (stepController.canNextStep()) {
        stepController.nextStep()
      } else {
        console.log('Tutorial Ended.')
      }
    }
  }

  return (
    <div className={'step-viewer'}>
      <Joyride
        run={!loading}
        callback={handleJoyrideCallback}
        steps={joyrideSteps}
        hideCloseButton={true}
        continuous={true}
        hideBackButton={true}
        styles={{
          options: {
            zIndex: 10000,
          },
          buttonNext: {
            backgroundColor: 'black',
            fontFamily: 'Inter',
            marginTop: '-40px',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0)', // Set background color to transparent
            pointerEvents: 'none', // Disable pointer events to allow interaction with the background
          },
        }}
        locale={{
          back: 'Back',
          close: 'Close',
          last: 'Done',
          next: 'Done',
          skip: 'Skip',
        }}
      />
    </div>
  )
}
