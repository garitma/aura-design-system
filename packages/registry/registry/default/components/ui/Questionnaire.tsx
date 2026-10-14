"use client";
import * as React from "react";

import { Button } from "@/components/ui/Button";
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperList,
  StepperNext,
  StepperPrev,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/Stepper";
import { cn } from "@/utils/class-names";

function Question({
  title,
  description,
  step,
  total,
  children,
  className,
}: {
  title: string;
  description?: string;
  step?: number;
  total?: number;
  children?: React.ReactNode;
  className?: string;
}) {
  const titleId = React.useId();

  return (
    <section
      aria-labelledby={titleId}
      data-slot="single-question"
      className={cn("grid gap-1", className)}
    >
      {step && total ? (
        <p className="text-sm text-gray-11">
          Question {step} of {total}
        </p>
      ) : null}
      <h2 id={titleId} className="h6">{title}</h2>
      {description ? <p className="text-gray-11">{description}</p> : null}
      <div className="grid gap-1">{children}</div>
    </section>
  );
}

type QuestionnaireQuestion = {
  value: string;
  title: string;
  description?: string;
  content?: React.ReactNode;
};

function Questionnaire({
  questions,
  className,
}: {
  questions: QuestionnaireQuestion[];
  className?: string;
}) {
  return (
    <Stepper
      defaultValue={questions[0]?.value}
      className={cn("grid w-full gap-2", className)}
    >
      <StepperList>
        {questions.map((question, index) => (
          <StepperItem key={question.value} value={question.value}>
            <StepperTrigger>
              <StepperIndicator />
              <StepperTitle>{question.title}</StepperTitle>
            </StepperTrigger>
            {index < questions.length - 1 ? <StepperSeparator /> : null}
          </StepperItem>
        ))}
      </StepperList>
      {questions.map((question, index) => (
        <StepperContent
          key={question.value}
          value={question.value}
          className="grid gap-1"
        >
          <Question
            title={question.title}
            description={question.description}
            step={index + 1}
            total={questions.length}
          >
            {question.content}
          </Question>
          <div className="flex items-center gap-1">
            <StepperPrev asChild>
              <Button type="button" variant="pill">
                Back
              </Button>
            </StepperPrev>
            <StepperNext asChild>
              <Button type="button">
                {index === questions.length - 1 ? "Finish" : "Continue"}
              </Button>
            </StepperNext>
          </div>
        </StepperContent>
      ))}
    </Stepper>
  );
}

export { Questionnaire, Question };
export type { QuestionnaireQuestion };
