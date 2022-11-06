import {Tutorial} from "./core/models/Tutorial";

export const postPublishTutorial = async (tutorial: Tutorial) => {
    const body = JSON.stringify(tutorial);
    const response = await fetch('https://localhost:7212/api/Tutorials', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: body
    });
    return await response.json();
}