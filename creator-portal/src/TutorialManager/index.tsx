import {useAppDispatch, useAppSelector} from "../hooks";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {loadTutorials, createTutorial} from "../reducers/tutorialManagerSlice";
import {Tutorial} from "../generated";
import {
    Backdrop,
    Box,
    Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl,
    TextField, Typography
} from "@mui/material";

export const TutorialManager = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const error = useAppSelector(s => s.tutorialManager.error);
    const loading = useAppSelector(s => s.tutorialManager.loading);

    const toEdit = useAppSelector(s => {
        return s.tutorialManager.toEdit;
    })

    useEffect(() => {
         toEdit && toEdit.id && navigate(`/editor/${toEdit.id}`);
    }, [toEdit])

    useEffect(() => {
        dispatch(loadTutorials(0));
    }, [])

    const [newTutorial, setNewTutorial] = useState<Tutorial>({name: "", targetSite: ""});
    const [tutorialPropEditor, setTutorialPropEditor] = useState(false);

    const handleCreateTutorial = () => {
        dispatch(createTutorial(newTutorial));
        setNewTutorial({name: "", targetSite: ""});
        setTutorialPropEditor(false);
    }

    return (
        <Box>
            <Button variant="outlined" onClick={() => setTutorialPropEditor(true)}>Create new tutorial</Button>
            <Dialog open={tutorialPropEditor}>
                <DialogTitle>Create a new tutorial</DialogTitle>
                <DialogContent>
                    <FormControl margin="normal">
                        <TextField
                            autoFocus
                            value={newTutorial.name}
                            label="Tutorial Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setNewTutorial(tut => {
                                return {...tut, name: e.target.value}
                            })}
                        />
                        <TextField
                            value={newTutorial.targetSite}
                            label="Target Website"
                            type="url"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setNewTutorial(tut => {
                                return {...tut, targetSite: e.target.value}
                            })}
                        />
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setTutorialPropEditor(false)}>Cancel</Button>
                    <Button onClick={handleCreateTutorial}>Submit</Button>
                </DialogActions>
            </Dialog>
            <Backdrop
                open={!!loading}
            >
                <CircularProgress color="inherit"/>
                <Typography variant="body1">{loading}</Typography>
            </Backdrop>
            <Dialog open={!!error}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {error}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => navigate("/")}>Back to main page</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}