import { create } from "zustand";
import { persist } from "zustand/middleware";
import { QuestionSet } from "@/types/questions";
import { questions } from "@/content/questions";
import { Suggestion } from "@/types/suggestions";

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
}

const useStore = create<State>()(
  persist(
    (set) => ({
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
      setBookmarked: (id: string, bookmarked: boolean) =>
        set((state) => ({
          suggestions: structuredClone(state.suggestions).map((suggestion) =>
            suggestion.id === id
              ? { ...suggestion, isBookmarked: bookmarked }
              : suggestion
          ),
        })),
    }),
    {
      name: "esai-storage",
    }
  )
);

export default useStore;
