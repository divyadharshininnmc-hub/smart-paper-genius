export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type QuestionType = 'mcq' | 'short' | 'long';

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  answer: string;
  marks: number;
  difficulty: DifficultyLevel;
}

export interface QuestionPaper {
  id: string;
  title: string;
  subject: string;
  totalMarks: number;
  duration: string;
  questions: Question[];
  createdAt: Date;
}

export interface GeneratorConfig {
  syllabus: string;
  subject: string;
  difficulty: DifficultyLevel;
  questionTypes: QuestionType[];
  questionCount: number;
}
