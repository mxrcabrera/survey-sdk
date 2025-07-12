export type QuestionType = 
  | 'text' 
  | 'textarea' 
  | 'radio' 
  | 'checkbox' 
  | 'select' 
  | 'scale' 
  | 'yes_no';

export interface QuestionOption {
  id: string;
  label: string;
  value: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: QuestionOption[];
  required?: boolean;
  order: number;
}

export interface Survey {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface Answer {
  questionId: string;
  value: string | string[] | number | boolean;
}

export interface SurveyResponse {
  surveyId: string;
  answers: Answer[];
  userId?: string;
}

export interface SurveyWidgetProps {
  surveyId: string;
  apiUrl: string;
  onComplete?: (response: SurveyResponse) => void;
  onError?: (error: string) => void;
  className?: string;
}