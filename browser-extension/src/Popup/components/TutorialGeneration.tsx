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
            '[Popup]: Error occurred when trying to reach background.'
          )
          setLoading(undefined)
          setError(reason.message ?? 'Unknown error.')
        }
      )
  }

  const handleClickGenerated = () => {
    generated && onTutorialSelection(generated)
  }

  return (
    <Box sx={{ flexGrow: 1, textAlign: 'center' }} padding={1}>
      <Typography
        variant='h5'
        sx={{
          marginBottom: '16px',
          fontSize: '1.4rem',
          color: 'rgba(0, 0, 0, 0.6)',
        }}
      >
        Tutorial Generator
      </Typography>
      {/*<ToggleButtonGroup*/}
      {/*	color="primary"*/}
      {/*	value={mode}*/}
      {/*	exclusive*/}
      {/*	onChange={(e, value) => setMode(value as GenerationMode)}*/}
      {/*>*/}
      {/*	{Object.entries(GenerationMode).map(([key, value]) => {*/}
      {/*		return <ToggleButton value={key}>{value}</ToggleButton>;*/}
      {/*	})}*/}
      {/*</ToggleButtonGroup>*/}

      {/*<Paper*/}
      {/*	component="form"*/}
      {/*	sx={{p: '2px 4px', display: 'flex', alignItems: 'center', marginY: 2}}*/}
      {/*	elevation={3}*/}
      {/*	onSubmit={(e) => {*/}
      {/*		setError(undefined);*/}
      {/*		setError(undefined);*/}
      {/*		e.preventDefault();*/}
      {/*		const question = e.currentTarget.querySelector("input")?.value;*/}
      {/*		if (!question) {*/}
      {/*			setError("Please enter a question.");*/}
      {/*			return;*/}
      {/*		}*/}
      {/*		handleGenerate(question);*/}
      {/*	}}*/}
      {/*>*/}
      {/*	<InputBase*/}
      {/*		sx={{ml: 1, flex: 1}}*/}
      {/*		placeholder="How to setup..."*/}
      {/*		inputProps={{'aria-label': 'ask ai'}}*/}
      {/*		disabled={!!loading}*/}
      {/*	/>*/}
      {/*	{*/}
      {/*		loading ?*/}
      {/*			<CircularProgress/> :*/}
      {/*			<IconButton type="submit" sx={{p: '10px'}} aria-label="search">*/}
      {/*				<ArrowForwardIosIcon/>*/}
      {/*			</IconButton>*/}
      {/*	}*/}
      {/*</Paper>*/}

      <Box
        component='form'
        noValidate
        autoComplete='off'
        onSubmit={(e) => {
          e.preventDefault()
          handleGenerate()
        }}
      >
        {error && <Alert severity={'error'}>{error}</Alert>}
        <Grid container direction={'column'} spacing={2}>
          <Grid item>
            <TextField
              value={context}
              onChange={(e) => setContext(e.target.value)}
              fullWidth
              label='Context'
            />
          </Grid>
          <Grid item>
            <TextField
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              fullWidth
              multiline
              maxRows={4}
              label='Question'
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
          <Grid item display='flex' justifyContent='center'>
            <Button
              type={'submit'}
              variant='contained'
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
