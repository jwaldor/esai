export interface Question {
  title: string;
  description: string;
  exampleAnswer: string;
  id: number;
  input: string;
  rating: number;
}

export interface QuestionSet {
  cardNumber: number;
  list: Question[];
}

export interface SuggestionsRequestBody {
  questions: QuestionSet[];
}
