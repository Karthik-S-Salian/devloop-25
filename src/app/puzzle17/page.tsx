// DISTRACTION PUZZLE - infinite captcha solving
'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { useToast } from "~/hooks/use-toast"
import { AlertCircle, CheckCircle, Timer } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { Progress } from "~/components/ui/progress"

type ProblemType = 'math' | 'sequence' | 'word'
type Status = 'idle' | 'success' | 'error'

interface Problem {
  type: ProblemType
  question: string
  answer: string
}

interface MathProblem extends Problem {
  type: 'math'
}

interface SequenceProblem extends Problem {
  type: 'sequence'
}

interface WordProblem extends Problem {
  type: 'word'
}

type Difficulty = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

const generateMathProblem = (level: Difficulty): MathProblem => {
  const operators = ['+', '-', '*'] as const
  const num1 = Math.floor(Math.random() * (10 * level)) + 1
  const num2 = Math.floor(Math.random() * (10 * level)) + 1
  const operator = operators[Math.floor(Math.random() * operators.length)]
  const question = `${num1} ${operator} ${num2}`
  const answer = eval(question).toString()
  return { type: 'math', question, answer }
}

const generateSequenceProblem = (level: Difficulty): SequenceProblem => {
  const length = 3 + level
  const sequence = Array.from({ length }, () => Math.floor(Math.random() * 10))
  const pattern = Math.floor(Math.random() * 3) // 0: +, 1: *, 2: alternating +/*
  const nextNumber = sequence[length - 1]
  switch (pattern) {
    case 0:
      sequence.push(nextNumber! + level)
      break
    case 1:
      sequence.push(nextNumber! * level)
      break
    case 2:
      sequence.push(length % 2 === 0 ? nextNumber! + level : nextNumber! * level)
      break
  }
  return {
    type: 'sequence',
    question: `What's the next number in the sequence: ${sequence.slice(0, -1).join(', ')}`,
    answer: sequence[length]!.toString()
  }
}

const generateWordProblem = (level: Difficulty): WordProblem => {
  const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew'] as const
  const selectedWords = [...words].sort(() => 0.5 - Math.random()).slice(0, 3 + level)
  const operation = Math.random() > 0.5 ? 'longest' : 'shortest'
  return {
    type: 'word',
    question: `What's the ${operation} word: ${selectedWords.join(', ')}`,
    answer: selectedWords.reduce((a, b) => operation === 'longest' ? (a.length > b.length ? a : b) : (a.length < b.length ? a : b))
  }
}

export default function AdvancedInfiniteCaptcha(): JSX.Element {
  const [problem, setProblem] = useState<Problem>({ type: 'math', question: '', answer: '' })
  const [userAnswer, setUserAnswer] = useState<string>('')
  const [attempts, setAttempts] = useState<number>(0)
  const [status, setStatus] = useState<Status>('idle')
  const [timeLeft, setTimeLeft] = useState<number>(30)
  const [difficulty, setDifficulty] = useState<Difficulty>(1)
  const { toast } = useToast()

  const generateProblem = useCallback(() => {
    const problemTypes: ProblemType[] = ['math', 'sequence', 'word']
    const type = problemTypes[Math.floor(Math.random() * problemTypes.length)]
    let newProblem: Problem

    switch (type) {
      case 'math':
        newProblem = generateMathProblem(difficulty)
        break
      case 'sequence':
        newProblem = generateSequenceProblem(difficulty)
        break
      case 'word':
        newProblem = generateWordProblem(difficulty)
        break
      default:
        newProblem = generateMathProblem(difficulty)
    }

    setProblem(newProblem)
    setUserAnswer('')
    setStatus('idle')
    setTimeLeft(30)
  }, [difficulty])

  useEffect(() => {
    generateProblem()
  }, [generateProblem])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          setStatus('error')
          toast({
            title: "Time's up!",
            description: "You ran out of time. Try again!",
            variant: "destructive",
          })
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [problem, toast])

  const handleSubmit = (): void => {
    if (userAnswer.toLowerCase() === problem.answer.toLowerCase()) {
      setStatus('success')
      setAttempts((prev) => prev + 1)
      setDifficulty((prev) => Math.min(prev + 1, 10) as Difficulty)
      toast({
        title: "Success",
        description: `Correct! Moving to next challenge. Total solved: ${attempts + 1}`,
        variant: "default",
      })
      setTimeout(generateProblem, 2000)
    } else {
      setStatus('error')
      toast({
        title: "Error",
        description: "Incorrect answer. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Advanced Captcha Challenge</CardTitle>
          <CardDescription>Solve the problem to proceed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-2xl font-bold text-center">
            {problem.question}
          </div>
          <Input
            type="text"
            value={userAnswer}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer"
            className={status === 'error' ? "border-red-500" : ""}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Timer className="mr-2 h-4 w-4" />
              <span>{timeLeft}s</span>
            </div>
            <div>Difficulty: {difficulty}</div>
          </div>
          <Progress value={(timeLeft / 30) * 100} />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button onClick={handleSubmit} className="w-full">
            Submit
          </Button>
          {status === 'success' && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Correct! Preparing next challenge...
              </AlertDescription>
            </Alert>
          )}
          {status === 'error' && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Incorrect. Please try again.
              </AlertDescription>
            </Alert>
          )}
          <div className="text-sm text-gray-500 text-center">
            Total challenges solved: {attempts}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}