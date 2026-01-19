import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { GeneratorForm } from '@/components/GeneratorForm';
import { QuestionPaperView } from '@/components/QuestionPaperView';
import { generateQuestionPaper } from '@/lib/generateQuestions';
import type { GeneratorConfig, QuestionPaper } from '@/types/question';
import { FileQuestion, Sparkles, Target, Award, Clock, BookOpen } from 'lucide-react';
import heroImage from '@/assets/hero-illustration.jpg';

const features = [
  { icon: Sparkles, title: 'AI-Powered', description: 'Smart question generation based on your syllabus' },
  { icon: Target, title: 'Customizable', description: 'Set difficulty, types, and question count' },
  { icon: Award, title: 'Marks & Answers', description: 'Complete with marking scheme and solutions' },
  { icon: Clock, title: 'Instant', description: 'Generate comprehensive papers in seconds' },
];

export default function Index() {
  const [paper, setPaper] = useState<QuestionPaper | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (config: GeneratorConfig) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedPaper = generateQuestionPaper(config);
    setPaper(generatedPaper);
    setIsLoading(false);
  };

  const handleBack = () => {
    setPaper(null);
  };

  return (
    <div className="min-h-screen gradient-hero">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {paper ? (
            <motion.div
              key="paper"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <QuestionPaperView paper={paper} onBack={handleBack} />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto"
            >
              {/* Hero Section */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
                >
                  <Sparkles className="w-4 h-4" />
                  AI-Powered Question Generator
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
                >
                  Create Perfect
                  <span className="text-primary"> Question Papers</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance"
                >
                  Upload your syllabus, set the difficulty level, and let our AI generate 
                  comprehensive question papers with answers and marks distribution.
                </motion.p>
              </div>

              {/* Features */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
              >
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className="bg-card rounded-xl p-4 border border-border hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground text-sm mb-1">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Main Form */}
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                      <FileQuestion className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold text-foreground">Configure Paper</h2>
                      <p className="text-sm text-muted-foreground">Set up your question paper</p>
                    </div>
                  </div>
                  
                  <GeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
                </div>

                {/* Preview / Info Panel */}
                <div className="space-y-6">
                  {/* Hero Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="rounded-2xl overflow-hidden shadow-lg border border-border"
                  >
                    <img 
                      src={heroImage} 
                      alt="AI-powered question paper generation illustration" 
                      className="w-full h-48 object-cover"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="gradient-card rounded-2xl border border-border p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground">How It Works</h3>
                    </div>
                    <ol className="space-y-4">
                      {[
                        { step: '1', title: 'Enter Syllabus', desc: 'Paste your topics, chapters, or learning objectives' },
                        { step: '2', title: 'Configure Settings', desc: 'Choose difficulty, question types, and count' },
                        { step: '3', title: 'Generate Paper', desc: 'AI creates questions with answers and marks' },
                        { step: '4', title: 'Review & Export', desc: 'Print or download your question paper' },
                      ].map((item, index) => (
                        <motion.li
                          key={item.step}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                            {item.step}
                          </span>
                          <div>
                            <p className="font-medium text-foreground text-sm">{item.title}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        </motion.li>
                      ))}
                    </ol>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="bg-primary/5 rounded-2xl border border-primary/20 p-6"
                  >
                    <h3 className="font-semibold text-foreground mb-2">💡 Pro Tip</h3>
                    <p className="text-sm text-muted-foreground">
                      Be specific with your syllabus input. Include key concepts, chapter names, 
                      and learning objectives for more relevant and targeted questions.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
