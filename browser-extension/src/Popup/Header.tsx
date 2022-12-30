import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {Menu} from "@mui/icons-material";
import {useState} from "react";
import {SearchBar} from "./SearchBar";

export const Header = () => {
  const [searching, setSearching] = useState(false);

  const handleSearch = (query: string) => {
    if (query) {

    }
    setSearching(false);
  }

  const handleOpenSearch = () => {
    setSearching(true);
  }

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <Menu/>
          </IconButton>
          {searching ?
            (<>
              <SearchBar onSearchFor={handleSearch}/>
            </>) :
            (<>
              <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                SynPage
              </Typography>
              <IconButton
                data-testid="open-search"
                size="large"
                color="inherit"
                aria-label="search"
                onClick={() => handleOpenSearch()}
              >
                <SearchIcon/>
              </IconButton>
            </>)
          }

        </Toolbar>
      </AppBar>
    </Box>
  )
}