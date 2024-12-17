export interface Suggestion {
  id: string;
  suggestionSummary: string;
  suggestionText: string;
  intendedAudience: string;
  isBookmarked?: boolean;
  createdAt?: Date;
}
