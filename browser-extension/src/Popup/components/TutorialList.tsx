import {
  Alert,
  alpha,
  Box,
  Card,
  CardActionArea,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  styled,
} from '@mui/material'
import { Tutorial, TutorialInfo } from '../../client/generated'
import React from 'react'
import { TutorialNameCard } from './TutorialNameCard'
import SearchIcon from '@mui/icons-material/Search'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

export interface TutorialListProps {
  tutorials: TutorialInfo[]
  onTutorialSelection: (tut: TutorialInfo) => void
}

export const TutorialList = (props: TutorialListProps) => {
  const { tutorials, onTutorialSelection } = props

  const handleListItemClick = (tut: TutorialInfo) => {
    onTutorialSelection(tut)
  }

  const createList = () => {
    return (
      tutorials &&
      tutorials.map((tut) => {
        return (
          <Grid item>
            <TutorialNameCard
              tutorial={tut}
              onClick={() => {
                handleListItemClick(tut)
              }}
            />
          </Grid>
        )
      })
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} gap={2} direction={'column'}>
        {createList()}
      </Grid>
    </Box>
  )
}
