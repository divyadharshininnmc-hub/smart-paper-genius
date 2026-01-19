import type { GeneratorConfig, QuestionPaper, Question, QuestionType, DifficultyLevel } from '@/types/question';

// This is a mock generator - in production, this would call an AI API
export function generateQuestionPaper(config: GeneratorConfig): QuestionPaper {
  const { syllabus, subject, difficulty, questionTypes, questionCount } = config;
  
  const questions: Question[] = [];
  const marksMap = {
    mcq: { easy: 1, medium: 2, hard: 2 },
    short: { easy: 2, medium: 3, hard: 4 },
    long: { easy: 5, medium: 8, hard: 10 },
  };

  // Distribute questions across selected types
  const questionsPerType = Math.ceil(questionCount / questionTypes.length);
  
  // Sample questions based on syllabus keywords
  const topics = syllabus.split(/[,.\n]/).filter(t => t.trim().length > 3).slice(0, 10);
  
  const mcqTemplates = [
    { q: "Which of the following best describes {topic}?", opts: ["Correct definition", "Related but incorrect", "Common misconception", "Unrelated concept"] },
    { q: "What is the primary purpose of {topic}?", opts: ["Main purpose (correct)", "Secondary purpose", "Related function", "Common misunderstanding"] },
    { q: "In the context of {topic}, which statement is TRUE?", opts: ["True statement", "Partially true", "Common error", "Opposite statement"] },
    { q: "The concept of {topic} is most closely associated with:", opts: ["Correct association", "Tangential relation", "Superficial similarity", "No relation"] },
  ];

  const shortTemplates = [
    { q: "Define {topic} and explain its significance.", a: "A comprehensive definition of {topic} includes its key characteristics and importance in the broader context of {subject}. It plays a crucial role in understanding the fundamentals." },
    { q: "List and briefly explain the key components of {topic}.", a: "The key components of {topic} include: 1) Primary element - the foundational aspect, 2) Secondary element - supporting structures, 3) Tertiary element - connecting mechanisms. Each contributes to the overall function." },
    { q: "How does {topic} relate to the broader concepts in {subject}?", a: "{topic} connects to {subject} through fundamental principles that govern both areas. This relationship is evident in how concepts from one area inform and enhance understanding of the other." },
  ];

  const longTemplates = [
    { q: "Analyze the importance of {topic} in {subject}. Discuss its applications and limitations.", a: "An in-depth analysis of {topic} reveals its multifaceted importance in {subject}. Key applications include practical implementations in real-world scenarios, theoretical frameworks for understanding complex systems, and methodological approaches for solving problems.\n\nThe significance extends to: educational contexts where it forms the foundation of curriculum, professional applications where practitioners rely on these concepts, and research domains where it drives innovation.\n\nHowever, limitations exist including scope restrictions, applicability constraints, and evolving understanding that requires continuous revision of established principles." },
    { q: "Compare and contrast different approaches to {topic}. Which approach do you find most effective and why?", a: "Different approaches to {topic} include: the traditional method focusing on established principles, the modern approach incorporating recent developments, and the integrated method combining multiple perspectives.\n\nThe traditional approach offers stability and proven results but may lack flexibility. The modern approach provides innovation but may not have extensive validation. The integrated method attempts to leverage strengths of both.\n\nThe most effective approach depends on context, resources, and objectives. For foundational understanding, traditional methods excel. For cutting-edge applications, modern approaches are preferable. For comprehensive understanding, integrated methods prove most valuable." },
  ];

  questionTypes.forEach((type, typeIndex) => {
    const count = typeIndex === questionTypes.length - 1 
      ? questionCount - questions.length 
      : Math.min(questionsPerType, questionCount - questions.length);
    
    for (let i = 0; i < count && questions.length < questionCount; i++) {
      const topic = topics[i % topics.length] || subject;
      const questionDifficulty = getQuestionDifficulty(difficulty, i, count);
      
      if (type === 'mcq') {
        const template = mcqTemplates[i % mcqTemplates.length];
        questions.push({
          id: `q-${questions.length + 1}`,
          type: 'mcq',
          question: template.q.replace('{topic}', topic.trim()),
          options: shuffleArray(template.opts.map((o, idx) => 
            o.replace('{topic}', topic.trim())
          )),
          answer: template.opts[0].replace('{topic}', topic.trim()),
          marks: marksMap.mcq[questionDifficulty],
          difficulty: questionDifficulty,
        });
      } else if (type === 'short') {
        const template = shortTemplates[i % shortTemplates.length];
        questions.push({
          id: `q-${questions.length + 1}`,
          type: 'short',
          question: template.q.replace('{topic}', topic.trim()).replace('{subject}', subject),
          answer: template.a.replace('{topic}', topic.trim()).replace('{subject}', subject),
          marks: marksMap.short[questionDifficulty],
          difficulty: questionDifficulty,
        });
      } else {
        const template = longTemplates[i % longTemplates.length];
        questions.push({
          id: `q-${questions.length + 1}`,
          type: 'long',
          question: template.q.replace('{topic}', topic.trim()).replace('{subject}', subject),
          answer: template.a.replace('{topic}', topic.trim()).replace('{subject}', subject),
          marks: marksMap.long[questionDifficulty],
          difficulty: questionDifficulty,
        });
      }
    }
  });

  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
  const duration = `${Math.max(60, Math.ceil(totalMarks * 1.5))} minutes`;

  return {
    id: `paper-${Date.now()}`,
    title: `${subject} Question Paper`,
    subject,
    totalMarks,
    duration,
    questions,
    createdAt: new Date(),
  };
}

function getQuestionDifficulty(baseDifficulty: DifficultyLevel, index: number, total: number): DifficultyLevel {
  // Add some variety while keeping the overall difficulty level
  const variance = Math.random();
  if (baseDifficulty === 'easy') {
    return variance < 0.7 ? 'easy' : 'medium';
  } else if (baseDifficulty === 'hard') {
    return variance < 0.3 ? 'medium' : 'hard';
  }
  // Medium difficulty - most varied
  if (variance < 0.25) return 'easy';
  if (variance > 0.75) return 'hard';
  return 'medium';
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
