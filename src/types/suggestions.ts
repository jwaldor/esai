export interface Suggestion {
  id: string;
  suggestionSummary: string;
  suggestionText: string;
  tags: string[];
  intendedAudience: string;
  isBookmarked: boolean;
}
