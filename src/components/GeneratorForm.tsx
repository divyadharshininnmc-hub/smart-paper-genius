import { useState } from 'react';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { DifficultySelector } from './DifficultySelector';
import { QuestionTypeSelector } from './QuestionTypeSelector';
import type { GeneratorConfig, DifficultyLevel, QuestionType } from '@/types/question';
import { Sparkles, BookOpen, FileQuestion } from 'lucide-react';

interface GeneratorFormProps {
  onGenerate: (config: GeneratorConfig) => void;
  isLoading: boolean;
}

export function GeneratorForm({ onGenerate, isLoading }: GeneratorFormProps) {
  const [syllabus, setSyllabus] = useState('');
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>(['mcq', 'short']);
  const [questionCount, setQuestionCount] = useState(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      syllabus,
      subject,
      difficulty,
      questionTypes,
      questionCount,
    });
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="space-y-6"
    >
      {/* Subject */}
      <div className="space-y-2">
        <Label htmlFor="subject" className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" />
          Subject Name
        </Label>
        <Input
          id="subject"
          placeholder="e.g., Mathematics, Physics, History..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="h-12"
          required
        />
      </div>

      {/* Syllabus */}
      <div className="space-y-2">
        <Label htmlFor="syllabus" className="flex items-center gap-2">
          <FileQuestion className="w-4 h-4 text-primary" />
          Syllabus / Topics
        </Label>
        <Textarea
          id="syllabus"
          placeholder="Enter the topics or syllabus content. You can paste chapter outlines, learning objectives, or key concepts you want to test..."
          value={syllabus}
          onChange={(e) => setSyllabus(e.target.value)}
          className="min-h-[160px] resize-none"
          required
        />
        <p className="text-xs text-muted-foreground">
          Tip: Be specific about the topics and concepts you want to include in the question paper.
        </p>
      </div>

      {/* Difficulty */}
      <DifficultySelector value={difficulty} onChange={setDifficulty} />

      {/* Question Types */}
      <QuestionTypeSelector value={questionTypes} onChange={setQuestionTypes} />

      {/* Question Count */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Number of Questions</Label>
          <span className="text-2xl font-bold text-primary">{questionCount}</span>
        </div>
        <Slider
          value={[questionCount]}
          onValueChange={(v) => setQuestionCount(v[0])}
          min={5}
          max={30}
          step={1}
          className="py-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>5 questions</span>
          <span>30 questions</span>
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="gradient"
        size="xl"
        className="w-full"
        disabled={isLoading || !syllabus.trim() || !subject.trim()}
      >
        {isLoading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
            Generating Questions...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate Question Paper
          </>
        )}
      </Button>
    </motion.form>
  );
}
