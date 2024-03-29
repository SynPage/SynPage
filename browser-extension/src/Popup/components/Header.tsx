import {
  AppBar,
  Box,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { Menu } from '@mui/icons-material'
import { useState } from 'react'
import { SearchBar } from './SearchBar'
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag'
import CloseIcon from '@mui/icons-material/Close'
import logoFull from '../../assets/logo-full.svg'

export interface HeaderProps {}

export const Header = (props: HeaderProps) => {
  return (
    <Paper
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        boxShadow: 0,
        borderRadius: 0,
        borderBottom: 1,
        borderColor: '#dddddd',
      }}
      elevation={5}
    >
      <Toolbar>
        <img src={logoFull} alt="SynPage" height={30} />
        <Box flexGrow={1} />
        <a
          href="https://airtable.com/shrR7ueO0F96lWYRV"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton
            size="large"
            color="inherit"
            sx={{ padding: 0, color: 'rgba(0, 0, 0, 0.6)' }}
          >
            <OutlinedFlagIcon />
          </IconButton>
        </a>
        <IconButton
          size="large"
          color="inherit"
          onClick={() => window.close()}
          sx={{ padding: 0, color: 'rgba(0, 0, 0, 0.6)' }}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </Paper>
  )
}
