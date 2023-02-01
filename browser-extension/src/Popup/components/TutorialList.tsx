import {Box, Grid} from "@mui/material";
import {TutorialInfo, Tutorial} from "../../client/generated";
import React from "react";
import {TutorialNameCard} from "./TutorialNameCard";

export interface TutorialListProps {
  tutorials: Tutorial[],
  onTutorialSelection: (tut: Tutorial) => void
}

export const TutorialList = (props: TutorialListProps) => {
  const {tutorials, onTutorialSelection} = props;

  const handleListItemClick = (tut: Tutorial) => {
    onTutorialSelection(tut)
  }

  const createList = () => {
    return tutorials && tutorials.map(tut => {
      return (
        <Grid item>
          <TutorialNameCard tutorial={tut} onClick={() => {
            handleListItemClick(tut);
          }}/>
        </Grid>
      );
    });
  };

  return (
    <Box sx={{flexGrow: 1}} padding={1}>
      <Grid container spacing={1} direction={"column"}>
        {createList()}
      </Grid>
    </Box>
  )
};
