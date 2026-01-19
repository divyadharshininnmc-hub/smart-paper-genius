import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Question } from '@/types/question';
import { ChevronDown, CircleDot, AlignLeft, FileText, CheckCircle2, Award } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  index: number;
  showAnswer?: boolean;
}

const typeIcons = {
  mcq: CircleDot,
  short: AlignLeft,
  long: FileText,
};

const typeLabels = {
  mcq: 'MCQ',
  short: 'Short Answer',
  long: 'Long Answer',
};

const difficultyColors = {
  easy: 'bg-success/10 text-success border-success/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  hard: 'bg-destructive/10 text-destructive border-destructive/20',
};

export function QuestionCard({ question, index, showAnswer: initialShow = false }: QuestionCardProps) {
  const [showAnswer, setShowAnswer] = useState(initialShow);
  const Icon = typeIcons[question.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      {/* Header */}
      <div className="p-5 border-b border-border/50">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm shrink-0">
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-foreground font-medium leading-relaxed">{question.question}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className={cn(
              "px-2 py-1 rounded-md border text-xs font-medium",
              difficultyColors[question.difficulty]
            )}>
              {question.difficulty}
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
              <Award className="w-3 h-3" />
              {question.marks} marks
            </span>
          </div>
        </div>
        
        {/* MCQ Options */}
        {question.type === 'mcq' && question.options && (
          <div className="mt-4 ml-11 space-y-2">
            {question.options.map((option, i) => (
              <div 
                key={i}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border transition-colors",
                  showAnswer && option === question.answer
                    ? "bg-success/10 border-success/30"
                    : "bg-secondary/30 border-transparent"
                )}
              >
                <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm text-foreground">{option}</span>
                {showAnswer && option === question.answer && (
                  <CheckCircle2 className="w-4 h-4 text-success ml-auto" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Type Badge */}
        <div className="flex items-center gap-2 mt-4 ml-11">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon className="w-3.5 h-3.5" />
            {typeLabels[question.type]}
          </div>
        </div>
      </div>

      {/* Answer Toggle */}
      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className="w-full p-3 flex items-center justify-between bg-secondary/30 hover:bg-secondary/50 transition-colors"
      >
        <span className="text-sm font-medium text-muted-foreground">
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </span>
        <motion.div
          animate={{ rotate: showAnswer ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </button>

      {/* Answer Content */}
      <AnimatePresence>
        {showAnswer && question.type !== 'mcq' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-5 bg-success/5 border-t border-success/20">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-success uppercase tracking-wide mb-2">Answer</p>
                  <p className="text-sm text-foreground leading-relaxed">{question.answer}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
