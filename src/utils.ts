import { GoogleGenAI, Type } from "@google/genai";
import {prompt} from "./prompt"
import markdownit from "markdown-it"


const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const config = {
    responseMimeType: 'application/json',
    systemInstruction: [{text: prompt}],
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        entries: { // Added key "entries"
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            required: ["day", "date", "activities"],
            properties: {
              day: {
                type: Type.STRING,
              },
              date: {
                type: Type.STRING,
              },
              activities: {
                type: Type.STRING,
              },
            },
          },
        },
      },
    },
};

export async function generateContent(text: string) {
    const contents =[{text}]

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: contents,
        config
    });

    return response.text
}
export function parse(text: string): string {
    const parser = markdownit();
    return parser.render(text);
}