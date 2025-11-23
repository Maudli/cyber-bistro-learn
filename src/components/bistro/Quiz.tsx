import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle2, XCircle, Trophy } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    question: 'What does HTTP stand for?',
    options: ['HyperText Transfer Protocol', 'High Transfer Text Protocol', 'HyperText Transmission Process', 'Hosted Text Transfer Protocol'],
    correct: 0,
    explanation: 'HTTP stands for HyperText Transfer Protocol, the foundation of data communication on the Web.',
  },
  {
    question: 'Which HTTP method is used to retrieve data from a server?',
    options: ['POST', 'DELETE', 'GET', 'PUT'],
    correct: 2,
    explanation: 'GET is used to request data from a specified resource without modifying it.',
  },
  {
    question: 'What type of document is generated on-the-fly by server-side scripts?',
    options: ['Static', 'Dynamic', 'Active', 'Passive'],
    correct: 1,
    explanation: 'Dynamic documents are created in real-time by server-side scripts based on the request.',
  },
  {
    question: 'What does a 404 status code indicate?',
    options: ['Success', 'Server Error', 'Not Found', 'Redirect'],
    correct: 2,
    explanation: '404 means the requested resource could not be found on the server.',
  },
  {
    question: 'What makes HTTP 1.1 faster than HTTP 1.0?',
    options: ['Bigger packets', 'Persistent connections', 'Faster servers', 'Smaller files'],
    correct: 1,
    explanation: 'HTTP 1.1 uses persistent connections, keeping the connection open for multiple requests instead of opening/closing for each one.',
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = () => {
    if (selectedAnswer === null) return;
    
    setAnswered(true);
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(false);
  };

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    return (
      <section className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="glass-card p-12 text-center space-y-6 neon-glow">
            <Trophy className="w-20 h-20 mx-auto text-primary animate-float" />
            <h2 className="text-4xl font-bold gradient-text">Quiz Complete!</h2>
            <div className="space-y-2">
              <p className="text-6xl font-bold text-primary">{score}/{questions.length}</p>
              <p className="text-xl text-muted-foreground">{percentage}% Correct</p>
            </div>
            <div className="glass-card p-6 bg-primary/10">
              <p className="text-foreground">
                {percentage >= 80
                  ? '🎉 Outstanding! You mastered HTTP basics!'
                  : percentage >= 60
                  ? '👍 Good job! Review the material to improve further.'
                  : '📚 Keep learning! Try reviewing the sections above.'}
              </p>
            </div>
            <Button onClick={resetQuiz} size="lg" className="neon-glow bg-primary hover:bg-secondary">
              Try Again
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = answered && selectedAnswer === question.correct;
  const isWrong = answered && selectedAnswer !== question.correct;

  return (
    <section className="container mx-auto px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 space-y-4">
          <h2 className="text-5xl font-bold gradient-text">The Check</h2>
          <p className="text-lg text-muted-foreground">
            Test your knowledge - Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <Card className="glass-card p-8 space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground">{question.question}</h3>
            
            <RadioGroup value={selectedAnswer?.toString()} onValueChange={(v) => setSelectedAnswer(parseInt(v))}>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className={`glass-card p-4 cursor-pointer transition-all ${
                      answered
                        ? index === question.correct
                          ? 'bg-green-500/20 border-green-500/50'
                          : selectedAnswer === index
                          ? 'bg-red-500/20 border-red-500/50'
                          : ''
                        : selectedAnswer === index
                        ? 'bg-primary/20 border-primary/50'
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={answered} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                      {answered && index === question.correct && (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      )}
                      {answered && selectedAnswer === index && index !== question.correct && (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {answered && (
            <div className={`glass-card p-4 animate-scale-in ${isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
              <p className="text-foreground">{question.explanation}</p>
            </div>
          )}

          <div className="flex gap-4">
            {!answered ? (
              <Button
                onClick={handleAnswer}
                disabled={selectedAnswer === null}
                className="flex-1 neon-glow bg-primary hover:bg-secondary"
              >
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNext} className="flex-1 neon-glow bg-primary hover:bg-secondary">
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Quiz;
