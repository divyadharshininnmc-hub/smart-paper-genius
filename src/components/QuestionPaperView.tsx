import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { QuestionCard } from './QuestionCard';
import type { QuestionPaper } from '@/types/question';
import { Printer, Download, ArrowLeft, Clock, Award, FileText } from 'lucide-react';

interface QuestionPaperViewProps {
  paper: QuestionPaper;
  onBack: () => void;
}

export function QuestionPaperView({ paper, onBack }: QuestionPaperViewProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Actions Bar */}
      <div className="flex items-center justify-between print:hidden">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Create New Paper
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handlePrint} className="gap-2">
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button variant="default" className="gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Paper Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-card rounded-2xl border border-border p-8 text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <FileText className="w-4 h-4" />
          Question Paper
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground">{paper.title}</h1>
        <p className="text-lg text-muted-foreground">{paper.subject}</p>
        
        <div className="flex items-center justify-center gap-6 pt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>Duration: {paper.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Award className="w-4 h-4 text-primary" />
            <span>Total Marks: {paper.totalMarks}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="w-4 h-4 text-primary" />
            <span>{paper.questions.length} Questions</span>
          </div>
        </div>
      </motion.div>

      {/* Questions */}
      <div className="space-y-4">
        {paper.questions.map((question, index) => (
          <QuestionCard key={question.id} question={question} index={index} />
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-primary/5 rounded-2xl border border-primary/20 p-6"
      >
        <h3 className="font-semibold text-foreground mb-4">Marks Distribution</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-2xl font-bold text-primary">
              {paper.questions.filter(q => q.type === 'mcq').reduce((a, b) => a + b.marks, 0)}
            </p>
            <p className="text-sm text-muted-foreground">MCQ Marks</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-2xl font-bold text-primary">
              {paper.questions.filter(q => q.type === 'short').reduce((a, b) => a + b.marks, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Short Answer Marks</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-2xl font-bold text-primary">
              {paper.questions.filter(q => q.type === 'long').reduce((a, b) => a + b.marks, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Long Answer Marks</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
