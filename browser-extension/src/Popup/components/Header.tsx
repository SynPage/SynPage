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
import HelpCenterIcon from '@mui/icons-material/HelpCenter'
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
      }}
      elevation={5}
    >
      <Toolbar>
        <img src={logoFull} alt={'SynPage'} height={30} />
        <Box flexGrow={1} />
        <IconButton size='large' color='inherit'>
          <HelpCenterIcon />
        </IconButton>
        <IconButton size='large' color='inherit' onClick={() => window.close()}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </Paper>
  )
}
