import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import "./SearchBar.css"; // Import the CSS file for styling

export const SearchBar = (props: { onSearchFor: (query: string) => void }) => {
  const { onSearchFor, ...others } = props;
  const [text, setText] = useState("");

  return (
    <form
      className="search-bar" // Add a CSS class to the form element
      onSubmit={(e) => {
        e.preventDefault();
        onSearchFor(text);
      }}
      onReset={(e) => {
        setText("");
        onSearchFor("");
      }}
    >
      <TextField
        {...others}
        id="search-bar"
        autoFocus={true}
        fullWidth={true}
        value={text}
        variant={"standard"}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="Search for TUT"
        InputProps={{
          startAdornment: (
            <InputAdornment position={"start"}>
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position={"end"}>
              <IconButton type="reset" aria-label="close">
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};
