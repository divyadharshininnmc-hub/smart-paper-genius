import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { DifficultyLevel } from '@/types/question';
import { Gauge, Zap, Flame } from 'lucide-react';

interface DifficultySelectorProps {
  value: DifficultyLevel;
  onChange: (value: DifficultyLevel) => void;
}

const difficulties: { value: DifficultyLevel; label: string; icon: typeof Gauge; description: string }[] = [
  { value: 'easy', label: 'Easy', icon: Gauge, description: 'Basic concepts' },
  { value: 'medium', label: 'Medium', icon: Zap, description: 'Applied knowledge' },
  { value: 'hard', label: 'Hard', icon: Flame, description: 'Advanced problems' },
];

export function DifficultySelector({ value, onChange }: DifficultySelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">Difficulty Level</label>
      <div className="grid grid-cols-3 gap-3">
        {difficulties.map((difficulty) => {
          const Icon = difficulty.icon;
          const isSelected = value === difficulty.value;
          
          return (
            <motion.button
              key={difficulty.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange(difficulty.value)}
              className={cn(
                "relative p-4 rounded-xl border-2 transition-all duration-200 text-left",
                isSelected
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-card hover:border-primary/50 hover:bg-secondary/50"
              )}
            >
              {isSelected && (
                <motion.div
                  layoutId="difficulty-indicator"
                  className="absolute inset-0 border-2 border-primary rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className="relative z-10">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center mb-2",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                )}>
                  <Icon className="w-4 h-4" />
                </div>
                <p className="font-medium text-foreground">{difficulty.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{difficulty.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
