import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
	organization: "org-VXyO9IDnJD9UmBJDadLzzTJo",
	apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);
