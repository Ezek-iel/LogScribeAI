import { GoogleGenAI, Type } from "@google/genai";
import { prompt } from "./prompt"
import markdownit from "markdown-it"


const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const config = {
  responseMimeType: 'application/json',
  systemInstruction: [{ text: prompt }],
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

/**
 * Generates content using Google's Generative AI based on the provided text input.
 * Uses the Gemini 2.0 Flash model with a predefined configuration for structured JSON output.
 * 
 * @param text - The input text to be processed by the AI model
 * @returns A promise that resolves to the generated text response from the AI
 * 
 * @example
 * ```typescript
 * const result = await generateContent("Generate a log entry for today");
 * console.log(result);
 * ```
 */
export async function generateContent(text: string) {
  const contents = [{ text }]

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: contents,
    config
  });

  return response.text
}

/**
 * Parses markdown text and converts it to HTML using the markdown-it parser.
 * 
 * @param text - The markdown text to be parsed and converted to HTML
 * @returns The HTML string representation of the markdown input
 * 
 * @example
 * ```typescript
 * const html = parse("# Hello World\n\nThis is **bold** text.");
 * // Returns: "<h1>Hello World</h1><p>This is <strong>bold</strong> text.</p>"
 * ```
 */
export function parse(text: string): string {
  const parser = markdownit();
  return parser.render(text);
}

/**
 * Interface representing the structure of form state parameters.
 * Used for saving and loading application state data.
 */
interface FormStateParams {
  /** The name of the business or organization */
  businessName: string;
  /** The name of the project */
  projectName: string;
  /** Additional context information for the project */
  additionalContext: string;
  /** The department of the student */
  studentDepartment: string;
  /** Response string in markdown format */
  response: string;
}

/**
 * Saves the current form state to localStorage.
 * Stores all form data as a JSON string for later retrieval.
 * 
 * @param formState - The form state parameters to save
 * @param formState.businessName - The name of the business or organization
 * @param formState.projectName - The name of the project
 * @param formState.additionalContext - Additional context information for the project
 * @param formState.studentDepartment - The department of the student
 * @param formState.response - Response string in markdown format
 * 
 * @example
 * ```typescript
 * saveCurrentFormState({
 *   businessName: "Tech Corp",
 *   projectName: "AI Assistant",
 *   additionalContext: "Web development project",
 *   studentDepartment: "Computer Science",
 *   response: "# Project completed successfully"
 * });
 * ```
 */
export function saveCurrentFormState({ businessName, projectName, additionalContext, studentDepartment, response }: FormStateParams): void {
  localStorage.setItem("formState", JSON.stringify({
    businessName,
    projectName,
    additionalContext,
    studentDepartment,
    response
  }))
}

/**
 * Loads the current form state from localStorage.
 * Retrieves and parses the saved form data.
 * 
 * @returns The saved form state parameters or null if no data exists
 * 
 * @example
 * ```typescript
 * const formState = loadCurrentFormState();
 * if (formState) {
 *   console.log(formState.businessName);
 * }
 * ```
 */
export function loadCurrentFormState(): FormStateParams | null {
  const formState = localStorage.getItem("formState");
  if (formState) {
    return JSON.parse(formState) as FormStateParams;
  }
  return null;
}

/**
 * Adds a form state entry to the history stored in localStorage.
 * Maintains a persistent history of all saved form states.
 * 
 * @param state - The form state parameters to add to history
 * 
 * @example
 * ```typescript
 * addToHistory({
 *   businessName: "Tech Corp",
 *   projectName: "AI Assistant",
 *   additionalContext: "Web development project",
 *   studentDepartment: "Computer Science",
 *   response: "# Project completed successfully"
 * });
 * ```
 */
export function addToHistory(state: FormStateParams) {
  const history = JSON.parse(localStorage.getItem("history") || "[]") as FormStateParams[];

  if (!history) {
    localStorage.setItem("history", JSON.stringify([state]));
    return;
  }

  history.push(state);
  localStorage.setItem("history", JSON.stringify(history));
}

/**
 * Retrieves the complete history of form states from localStorage.
 * Returns all previously saved form state entries.
 * 
 * @returns An array of form state parameters, or empty array if no history exists
 * 
 * @example
 * ```typescript
 * const history = getHistory();
 * console.log(`Total entries: ${history.length}`);
 * history.forEach((entry, index) => {
 *   console.log(`Entry ${index}: ${entry.projectName}`);
 * });
 * ```
 */
export function getHistory(): FormStateParams[] {
  const history = localStorage.getItem("history");
  if (history) {
    return JSON.parse(history) as FormStateParams[];
  }
  return [];
}

/**
 * Retrieves a specific entry from the history by its index.
 * Provides access to individual form state entries from the stored history.
 * 
 * @param index - The zero-based index of the history entry to retrieve
 * @returns The form state parameters at the specified index, or null if index is invalid
 * 
 * @example
 * ```typescript
 * const firstEntry = getHistoryEntry(0);
 * if (firstEntry) {
 *   console.log(`First project: ${firstEntry.projectName}`);
 * }
 * 
 * const lastEntry = getHistoryEntry(getHistory().length - 1);
 * if (lastEntry) {
 *   console.log(`Most recent project: ${lastEntry.projectName}`);
 * }
 * ```
 */
export function getHistoryEntry(index: number): FormStateParams | null {
  const history = getHistory();
  if (index >= 0 && index < history.length) {
    return history[index];
  }
  return null;
}