export interface QuestionOption {
  id: string;
  label: string;
  value: string;
}

export interface Question {
  id: string;
  type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'select' | 'scale' | 'yes_no';
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
  createdAt: string;
}

export interface Answer {
  questionId: string;
  value: any;
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  answers: Answer[];
  submittedAt: string;
  userId?: string;
}

export interface QuestionMetrics {
  questionId: string;
  questionText: string;
  questionType: string;
  totalResponses: number;
  responseDistribution: Record<string, number>;
}