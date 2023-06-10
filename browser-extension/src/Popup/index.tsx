import React, { createContext, useEffect, useState } from 'react'
import { Header } from './components/Header'
import { TutorialList } from './components/TutorialList'
import { Loading } from '../shared/Loading'
import { Error } from '../shared/Error'
import {
  ActionsApi,
  StepsApi,
  Tutorial,
  TutorialInfo,
  TutorialsApi,
} from '../client/generated'
import { QueryType } from '../chrome/query'
import { Status, validateResponse } from '../chrome/response'
import { PopupClient } from '../chrome/popupClient'
import './index.css'
import {
  Alert,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Card,
  CardActionArea,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  InputBase,
  Paper,
  createTheme,
  ThemeProvider,
  Container,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import { TutorialGenerationComponent } from './components/TutorialGeneration'
import SearchIcon from '@mui/icons-material/Search'

export interface PopupProps {
  chromeClient: PopupClient
  tutorialsApi: TutorialsApi
  stepsApi: StepsApi
  actionsApi: ActionsApi
}

interface Context {
  chromeClient: PopupClient
  tutorialsApi: TutorialsApi
  stepsApi: StepsApi
  actionsApi: ActionsApi
}

export const ClientContext = createContext<Context>({
  chromeClient: new PopupClient(),
  tutorialsApi: new TutorialsApi(),
  stepsApi: new StepsApi(),
  actionsApi: new ActionsApi(),
})

export enum Tab {
  TUTORIALS,
  AI,
}

const theme = createTheme({
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
  },
})

export const Popup = (props: PopupProps) => {
  const { chromeClient, tutorialsApi, stepsApi, actionsApi } = props
  const [list, setList] = useState<TutorialInfo[]>([])
  const [loading, setLoading] = useState<string | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)
  const [tab, setTab] = useState<Tab>(Tab.TUTORIALS)
  const [ready, setReady] = useState<boolean>(false)

  useEffect(() => {
    // chromeClient.listen(handleChromeMessage, handleChromeError);
    console.log(chrome)

    setLoading('Loading...')
    tutorialsApi.tutorialsList().then(
      (value) => {
        setLoading(undefined)
        if (!value.results) {
          setError('Failed to get tutorials for site.')
        } else {
          setList(value.results)
        }
      },
      (reason) => {
        setLoading(undefined)
        setError(reason.message ?? 'Unknown error.')
      }
    )
  }, [])

  // const handleChromeMessage = async (query: ChromeQuery): Promise<ChromeResponse> => {
  //   console.log("[Popup]: Received query", query)
  //   switch (query.type) {
  //     default:
  //       const error = "[Popup]: Unexpected query type."
  //       setError(error);
  //       return {
  //         query: query,
  //         status: Status.error,
  //         message: error
  //       }
  //   }
  // }

  // const handleChromeError = async (query: ChromeQuery, message: string): Promise<ChromeResponse> => {
  //   setError(message);
  //   return {
  //     query: query,
  //     status: Status.error,
  //     message: message
  //   }
  // }

  const handleTutorialSelection = (tutorial: TutorialInfo) => {
    if (!tutorial.id) {
      setError('Tutorial does not exist.')
      return
    }
    setLoading('Loading...')
    console.log(`[Popup]: Notifying background of tutorial selection`, tutorial)
    chromeClient
      .queryBackground({ type: QueryType.init, message: tutorial.id })
      .then(
        (chromeResponse) => {
          setLoading(undefined)
          const { valid, validated } = validateResponse(chromeResponse)
          if (!valid) {
            console.log('Received unexpected response.', chromeResponse)
            setError('Received unexpected response.')
          } else if (chromeResponse.status !== Status.ok) {
            setError(validated.message ?? 'Unknown error.')
          } else {
            setReady(true)
          }
        },
        (reason) => {
          console.log(
            '[Popup]: Error occurred when trying to reach background.'
          )
          setLoading(undefined)
          setError(reason.message ?? 'Unknown error.')
        }
      )

    // getCurrentTab().then(tab => {
    //   chromeClient.queryBackground({type: QueryType.accessibility, message: {tabId: tab.id, locator: ""}}).then(chromeResponse => {
    //     console.log("AOM", chromeResponse);
    //     const nodeId: number = chromeResponse.message;
    //   }, reason => {
    //     console.log("[Popup]: Error occurred when trying to reach background.");
    //     setLoading(undefined);
    //     setError(reason.message ?? "Unknown error.");
    //   })
    // })
  }

  const handleSearch = (question: string) => {
    setLoading('Loading Tutorials...')
    tutorialsApi.tutorialsList({ search: question }).then((value) => {
      setLoading(undefined)
      setList(value.results ?? [])
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <ClientContext.Provider
        value={{
          chromeClient: chromeClient,
          tutorialsApi: tutorialsApi,
          stepsApi: stepsApi,
          actionsApi: actionsApi,
        }}
      >
        <Header />
        {/*<Paper sx={{position: 'static', top: 0, left: 0, right: 0}} elevation={5}>*/}
        {/*	*/}
        {/*</Paper>*/}
        <Container
          sx={{
            px: 1,
            py: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'center',
          }}
        >
          <Loading loading={loading} />
          <Error error={error} />
          {!loading && tab === Tab.TUTORIALS && (
            <>
              <Paper
                component='form'
                sx={{
                  p: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 2,
                  boxShadow: 0,
                  border: 1,
                  borderColor: '#dddddd',
                }}
                onSubmit={(event) => {
                  event.preventDefault()
                  handleSearch(
                    event.currentTarget.querySelector('input')?.value ?? ''
                  )
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder='Search'
                  inputProps={{ 'aria-label': 'search tutorials' }}
                />
                <IconButton
                  type='submit'
                  sx={{ p: '10px' }}
                  aria-label='search'
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
              <TutorialList
                tutorials={list}
                onTutorialSelection={handleTutorialSelection}
              />
              <Card sx={{ borderRadius: 2, boxShadow: 0, width: 1 }}>
                <CardActionArea onClick={() => setTab(Tab.AI)}>
                  <Alert severity='info' sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                    Generate a New Tutorial
                  </Alert>
                </CardActionArea>
              </Card>
            </>
          )}
          {!loading && tab === Tab.AI && (
            <TutorialGenerationComponent
              onTutorialSelection={handleTutorialSelection}
            />
          )}
        </Container>

        <Paper
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            boxShadow: 0,
            borderTop: 1,
            borderColor: '#dddddd',
          }}
          elevation={5}
        >
          <BottomNavigation
            showLabels
            value={tab}
            onChange={(event, newValue) => {
              setTab(newValue)
            }}
          >
            <BottomNavigationAction icon={<HomeIcon />} />
            <BottomNavigationAction icon={<SmartToyIcon />} />
          </BottomNavigation>
        </Paper>

        <Dialog open={ready} onClose={() => setReady(false)}>
          <DialogTitle>Tutorial is ready!</DialogTitle>
          <DialogActions>
            <Button
              sx={{ textTransform: 'none' }}
              onClick={() => window.close()}
            >
              Start your tour now!
            </Button>
          </DialogActions>
        </Dialog>
      </ClientContext.Provider>
    </ThemeProvider>
  )
}
