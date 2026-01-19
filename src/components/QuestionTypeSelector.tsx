import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { QuestionType } from '@/types/question';
import { CircleDot, AlignLeft, FileText, Check } from 'lucide-react';

interface QuestionTypeSelectorProps {
  value: QuestionType[];
  onChange: (value: QuestionType[]) => void;
}

const questionTypes: { value: QuestionType; label: string; icon: typeof CircleDot; description: string }[] = [
  { value: 'mcq', label: 'Multiple Choice', icon: CircleDot, description: '4 options with 1 correct' },
  { value: 'short', label: 'Short Answer', icon: AlignLeft, description: '1-2 sentence response' },
  { value: 'long', label: 'Long Answer', icon: FileText, description: 'Detailed explanation' },
];

export function QuestionTypeSelector({ value, onChange }: QuestionTypeSelectorProps) {
  const toggleType = (type: QuestionType) => {
    if (value.includes(type)) {
      if (value.length > 1) {
        onChange(value.filter(t => t !== type));
      }
    } else {
      onChange([...value, type]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">Question Types</label>
      <div className="space-y-2">
        {questionTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = value.includes(type.value);
          
          return (
            <motion.button
              key={type.value}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => toggleType(type.value)}
              className={cn(
                "w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              )}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">{type.label}</p>
                <p className="text-xs text-muted-foreground">{type.description}</p>
              </div>
              <div className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                isSelected 
                  ? "border-primary bg-primary" 
                  : "border-border"
              )}>
                {isSelected && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
