import { create } from "zustand";
import { persist } from "zustand/middleware";
import { QuestionSet } from "@/types/questions";
import { questions } from "@/content/questions";
import { Suggestion } from "@/types/suggestions";
import { v4 as uuidv4 } from "uuid";

export interface HistoryEntry {
  id: string;
  questionSet: QuestionSet[];
  suggestions: Suggestion[];
  createdAt: Date;
}

interface State {
  numberDisplayed: number;
  setInput: (id: number, text: string) => void;
  incrementDisplayed: () => void;
  questions: QuestionSet[];
  suggestions: Suggestion[];
  submitted: boolean;
  setSubmitted: (submitted: boolean) => void;
  setSuggestions: (suggestions: Suggestion[]) => void;
  setBookmarked: (id: string, bookmarked: boolean) => void;
  history: HistoryEntry[];
  addToHistory: () => void;
  resetQuestions: () => void;
  getHistoryItem: (id: string) => HistoryEntry | undefined;
  updateHistoryItem: (id: string, suggestion: Suggestion) => void;
  getSuggestionsFromHistory: () => Suggestion[];
}

const useStore = create<State>()(
  persist(
    (set, get) => ({
      numberDisplayed: 0,
      incrementDisplayed: () =>
        set((state) => ({ numberDisplayed: state.numberDisplayed + 1 })),
      setInput: (id: number, text: string) =>
        set((state) => ({
          questions: structuredClone(state.questions).map((questionSet) => ({
            ...questionSet,
            list: questionSet.list.map((question) =>
              question.id === id ? { ...question, input: text } : question
            ),
          })),
        })),
      questions: questions,
      suggestions: [],
      submitted: false,
      setSubmitted: (submitted: boolean) => set({ submitted }),
      setSuggestions: (suggestions: Suggestion[]) => set({ suggestions }),
      setBookmarked: (id: string, bookmarked: boolean) => {
        set((state) => ({
          suggestions: structuredClone(state.suggestions).map((suggestion) =>
            suggestion.id === id
              ? { ...suggestion, isBookmarked: bookmarked }
              : suggestion
          ),
        }));
        set((state) => ({
          history: structuredClone(state.history).map((historyItem) => {
            const suggestion = historyItem.suggestions.find(
              (suggestion) => suggestion.id === id
            );
            return suggestion
              ? {
                  ...historyItem,
                  suggestions: [
                    ...historyItem.suggestions.filter(
                      (suggestion) => suggestion.id !== id
                    ),
                    { ...suggestion, isBookmarked: bookmarked },
                  ],
                }
              : historyItem;
          }),
        }));
      },
      history: [],
      addToHistory: () =>
        set((state) => ({
          history: [
            ...state.history,
            {
              id: uuidv4(),
              questionSet: structuredClone(state.questions),
              suggestions: structuredClone(state.suggestions),
              createdAt: new Date(),
            },
          ],
        })),
      resetQuestions: () => {
        set({ submitted: false });
        set({ suggestions: [] });
        set({ numberDisplayed: 0 });
        set({ questions });
      },
      getHistoryItem: (id: string) => {
        const state = get();
        return state.history.find((entry) => entry.id === id);
      },
      updateHistoryItem: (id: string, suggestion: Suggestion) => {
        console.log("updateHistoryItem", id, suggestion);
        set((state) => {
          console.log(
            "historySuggestions",
            structuredClone(state.history).map((historyItem) =>
              historyItem.suggestions.find((suggestion) => suggestion.id === id)
                ? {
                    ...historyItem,
                    suggestions: [
                      ...historyItem.suggestions.filter(
                        (suggestion) => suggestion.id !== id
                      ),
                      { ...suggestion },
                    ],
                  }
                : historyItem
            )
          );
          console.log(
            "suggestions",
            structuredClone(state.suggestions).map((originalSuggestion) =>
              originalSuggestion.id === id ? suggestion : originalSuggestion
            )
          );
          return {
            history: structuredClone(state.history).map((historyItem) =>
              historyItem.suggestions.find((suggestion) => suggestion.id === id)
                ? {
                    ...historyItem,
                    suggestions: [
                      ...historyItem.suggestions.filter(
                        (suggestion) => suggestion.id !== id
                      ),
                      { ...suggestion },
                    ],
                  }
                : historyItem
            ),
            suggestions: structuredClone(state.suggestions).map(
              (originalSuggestion) =>
                originalSuggestion.id === id ? suggestion : originalSuggestion
            ),
          };
        });
      },
      getSuggestionsFromHistory: () => {
        const state = get();
        return state.history
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .map((entry) => entry.suggestions)
          .flat();
      },
    }),
    {
      name: "esai-storage",
    }
  )
);

export default useStore;
