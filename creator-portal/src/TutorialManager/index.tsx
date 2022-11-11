import {useAppDispatch, useAppSelector} from "../hooks";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {loadTutorials} from "../reducers/tutorialManagerSlice";
import {createTutorial} from "../reducers/tutorialEditorSlice";
import {Tutorial} from "../generated";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl,
    TextField
} from "@mui/material";

export const TutorialManager = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const editorActive = useAppSelector(s => {
        return !!s.tutorialEditor.loading;
    })

    useEffect(() => {
        editorActive && navigate('/creator');
    }, [editorActive])

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
        </Box>
    )
}