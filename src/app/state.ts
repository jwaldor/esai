import { create } from "zustand";

export const questions = [
  {
    cardNumber: 0,
    list: [
      {
        title: "Tell us about your values",
        description:
          "A value is something that you believe is really important in life. Share three values that matter most to you — such as courage, belonging, or your connection to nature.",
        exampleAnswer:
          "I've always cared deeply about animal rights and caring for all creatures big and small",
        id: 0,
      },
      {
        title: "Tell us about a hardship or challenge",
        description:
          "Remember, this doesn't have to be your most traumatic experience. For instance, some students share stories about living in rural areas where accessing resources can be tough, or challenges they've faced navigating certain school subjects. The key here is to focus on you!",
        exampleAnswer:
          "Growing up with a learning disability made it hard for me to comprehend what I was reading, which put me behind in school before I found specialized help",
        id: 1,
      },
      {
        title: "Tell us about your goals",
        description:
          "What do you want to achieve in your life? Share three goals that matter most to you — such as becoming a doctor, finding a partner, or learning a new skill.",
        exampleAnswer:
          "I want to become a doctor because I want to help people and make a difference in the world",
        id: 2,
      },
    ],
  },
  {
    cardNumber: 1,
    list: [
      {
        title: "Describe a memorable experience",
        description:
          "Think of a moment in your life that left a lasting impression on you. It could be a joyful occasion, a lesson learned, or a turning point in your journey.",
        exampleAnswer:
          "One of my most memorable experiences was when I traveled to a new country and immersed myself in a different culture, which opened my eyes to new perspectives.",
        id: 3,
      },
      {
        title: "What inspires you?",
        description:
          "Consider the people, events, or ideas that motivate you to pursue your passions. Share what drives you to be the best version of yourself.",
        exampleAnswer:
          "I am inspired by my grandmother, who overcame numerous obstacles in her life and taught me the value of resilience and hard work.",
        id: 4,
      },
      {
        title: "Share a personal achievement",
        description:
          "Reflect on an accomplishment that you are particularly proud of. It could be academic, personal, or professional.",
        exampleAnswer:
          "I am proud of completing my first marathon, as it required dedication, training, and perseverance to reach the finish line.",
        id: 5,
      },
    ],
  },
  {
    cardNumber: 2,
    list: [
      {
        title: "Describe a memorable experience",
        description:
          "Think of a moment in your life that left a lasting impression on you. It could be a joyful occasion, a lesson learned, or a turning point in your journey.",
        exampleAnswer:
          "One of my most memorable experiences was when I traveled to a new country and immersed myself in a different culture, which opened my eyes to new perspectives.",
        id: 6,
      },
      {
        title: "What inspires you?",
        description:
          "Consider the people, events, or ideas that motivate you to pursue your passions. Share what drives you to be the best version of yourself.",
        exampleAnswer:
          "I am inspired by my grandmother, who overcame numerous obstacles in her life and taught me the value of resilience and hard work.",
        id: 7,
      },
      {
        title: "Share a personal achievement",
        description:
          "Reflect on an accomplishment that you are particularly proud of. It could be academic, personal, or professional.",
        exampleAnswer:
          "I am proud of completing my first marathon, as it required dedication, training, and perseverance to reach the finish line.",
        id: 8,
      },
    ],
  },
];

interface State {
  numberDisplayed: number;
  setInput: (input: Input) => void;
  input: Array<Input>;
  incrementDisplayed: () => void;
}

interface Input {
  text: string;
  id: number;
}
const useStore = create<State>((set) => ({
  numberDisplayed: 0,
  incrementDisplayed: () =>
    set((state) => ({ numberDisplayed: state.numberDisplayed + 1 })),
  input: questions
    .map((question) => question.list.map((q) => ({ text: "", id: q.id })))
    .flat(),
  setInput: (input: Input) =>
    set((state) => ({
      input: [
        ...structuredClone(state.input).filter((i) => i.id !== input.id),
        input,
      ],
    })),
}));

export default useStore;
