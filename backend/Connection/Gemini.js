import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY });

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    // contents: "Explain how AI works in a few words",
    // NOW   we are   wants that  to use  our own  Prompt    which  can  use  for the  blog  content    creation     so here   we  can pass prompt is  a props
     contents :prompt ,
  });
   
  //  Now  want  to send  this  test  is  response  to  Frontend    instead   of Console
  return response.text;
  // console.log(response.text);
}

// main();
//  Now  export  this  main function

export default main;