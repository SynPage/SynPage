import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Skeleton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import React, { useContext, useState } from 'react'
import { ClientContext } from '../index'
import { Tutorial } from '../../client/generated'
import { TutorialNameCard } from './TutorialNameCard'
import { QueryType } from '../../chrome/query'
import { Status, validateResponse } from '../../chrome/response'
import { Error } from '../../shared/Error'

export interface TutorialGenerationProps {
  onTutorialSelection: (tut: Tutorial) => void
}

export const TutorialGenerationComponent = (props: TutorialGenerationProps) => {
  const { onTutorialSelection } = props
  const chromeClient = useContext(ClientContext).chromeClient

  const [error, setError] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<string | undefined>(undefined)
  const [generated, setGenerated] = useState<Tutorial | undefined>(undefined)
  const [context, setContext] = useState<string>('')
  const [question, setQuestion] = useState<string>('')

  const handleGenerate = () => {
    console.log('question is :' + question + ':')

    if (question === '') {
      setError('Please enter a question.')
      return
    }

    setLoading('Generating tutorial...')
    chromeClient
      .queryBackground({
        type: QueryType.generate,
        message: { question: question, context: context },
      })
      .then(
        (chromeResponse) => {
          console.log('askAI', chromeResponse)
          setLoading(undefined)
          const { valid, validated } = validateResponse(chromeResponse)
          if (!valid) {
            console.log('Received unexpected response.', chromeResponse)
            setError('Received unexpected response.')
          } else if (chromeResponse.status !== Status.ok) {
            setError(validated.message.toString() ?? 'Unknown error.')
          }
          console.log('askAI', validated)
          setGenerated(validated.message as Tutorial)
        },
        (reason) => {
          console.log(
            '[Popup]: Error occurred when trying to reach background.',
          )
          setLoading(undefined)
          setError(reason.message ?? 'Unknown error.')
        },
      )
  }

  const handleClickGenerated = () => {
    generated && onTutorialSelection(generated)
  }

  const handleChange = (event: any) => {
    setContext(event.target.value)
  }

  return (
    <Box
      sx={{
        width: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontSize: '1.4rem',
          color: 'rgba(0, 0, 0, 0.6)',
          textAlign: 'center',
          marginTop: '1rem',
        }}
      >
        New Tutorial
      </Typography>

      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault()
          handleGenerate()
        }}
      >
        <Error error={error} />

        <Grid container direction={'column'} spacing={2}>
          <Grid item sx={{ borderRadius: 2 }}>
            {/* <FormControl fullWidth>
              <InputLabel id="context-label">Context</InputLabel>
              <Select
                labelId="context-label"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="aws" data-id="aws">
                  AWS
                </MenuItem>
                <MenuItem value="azure" data-id="azure">
                  Azure
                </MenuItem>
                <MenuItem value="gcp" data-id="gcp">
                  GCP
                </MenuItem>
              </Select>
            </FormControl> */}

            {/* <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Platform</InputLabel>
              <Select
                sx={{ borderRadius: 2 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={context}
                label="Platform"
                onChange={handleChange}
              >
                <MenuItem value={'aws'}>AWS</MenuItem>
                <MenuItem value={'gcp'}>GCP</MenuItem>
                <MenuItem value={'azure'}>Azure</MenuItem>
              </Select>
            </FormControl> */}
          </Grid>
          <Grid item>
            <TextField
              InputProps={{
                style: {
                  borderRadius: 8,
                },
              }}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              fullWidth
              multiline
              maxRows={4}
              label="How do I..."
            />
          </Grid>
          <Grid item>
            {(loading || generated) && (
              <TutorialNameCard
                tutorial={generated}
                onClick={handleClickGenerated}
                loading={!!loading}
              />
            )}
          </Grid>
          <Grid item display="flex" justifyContent="center">
            <Button
              type={'submit'}
              variant="contained"
              sx={{
                textTransform: 'none',
                fontFamily: 'Inter',
                fontSize: '16px',
                padding: '0.75rem 2.75rem',
                fontWeight: 400,
                fill: '#FFFFFF',
                color: '#FFFFFF',
                backgroundColor: 'transparent',
                backgroundImage:
                  'linear-gradient(245deg, #9881FD 0%, #B038C2 100%)',
                borderRadius: '50px 50px 50px 50px',
                boxShadow: '0px 1px 31px -1px #9881FD',
                '&:hover': {
                  opacity: '0.8',
                  boxShadow: '0px 1px 31px -1px #9881FD',
                  backgroundImage:
                    'linear-gradient(245deg, #9881FD 0%, #B038C2 100%)',
                },
              }}
              disabled={!!loading}
              endIcon={loading ? <CircularProgress /> : <ArrowForwardIosIcon />}
            >
              {loading ? 'Generating...' : 'Generate'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/*{*/}
      {/*	generated &&*/}
      {/*	<Box paddingY={2} display="flex" justifyContent="center">*/}
      {/*		<Button variant="contained" sx={{textTransform: 'none'}}>Regenerate Response</Button>*/}
      {/*	</Box>*/}
      {/*}*/}
    </Box>
  )
}
