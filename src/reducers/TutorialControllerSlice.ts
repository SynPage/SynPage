import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Tutorial} from "../generated";
import {AppDispatch, RootState} from "./store";

interface TutorialControllerState {
  tutorial?: Tutorial
  loading?: string,
  error?: string
}

const initialState: TutorialControllerState = {
  tutorial: {
    name: "Hello World!",
    targetSite: "https://google.ca"
  }
}

export const LoadTutorialListForSite = createAsyncThunk<Tutorial[], string, { state: RootState, dispatch: AppDispatch }>(
  'Controller/LoadTutorialListForSite',
  async (url, {getState}) => {
    // TODO: Implement API call to fetch tutorials for given website.
    return [{name: "Hello Alex!", targetSite: "https://google.ca"}];
  }
)

export const SendTutorialToSite = createAsyncThunk<void, Tutorial, { state: RootState, dispatch: AppDispatch }>(
  'Controller/SendTutorialToSite',
  async (tutorial, {getState}) => {
    await chrome.runtime.sendMessage(tutorial);
  }
)

export const TutorialControllerSlice = createSlice({
  name: 'Controller',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(LoadTutorialListForSite.pending, (state, action) => {

      })
      .addCase(LoadTutorialListForSite.fulfilled, (state, action) => {
        state.tutorial = action.payload[0];
      })
      .addCase(LoadTutorialListForSite.rejected, (state, action) => {

      })
  }
})

export const {} = TutorialControllerSlice.actions;

export default TutorialControllerSlice.reducer;