"use client";

import { useState, useEffect } from "react";

const BooleanQuestionCard = ({
  questionNumber,
  question,
  submitting,
  showAnswers,
  userChoice,
  isEditModeOn,
}) => {
  const [quizInput, setQuizInput] = useState({
    question: question.question,
    reason: question.reason,
  });

  useEffect(() => {
    async function updateQuestion() {
      setQuizInput({
        question: question.question,
        reason: question.reason,
      });
    }
    updateQuestion();
  }, [question]);

  return (
    <div className="flex w-full flex-col items-start my-4">
      {console.log("question", question, "quizInput", quizInput)}
      {isEditModeOn ? (
        <textarea
          type="text"
          className="black w-full border pl-2 border-gray-300"
          autoFocus
          value={quizInput["question"]}
          onChange={(e) => {
            question.question = e.target.value;
            setQuizInput({
              ...quizInput,
              question: e.target.value,
            });
          }}
        ></textarea>
      ) : (
        <h4 className="black font-bold mr-4">
          {submitting
            ? "Generating your Question..."
            : `${questionNumber + 1}) ${question.question}`}
        </h4>
      )}

      {["True", "False"].map((option, i) => {
        let char = i % 2 === 0 ? "True" : "False";
        return (
          <div
            className="flex orange_gradient flex-row font-bold text-sm pr-2 tracking-wide"
            key={`Q${questionNumber}Option${char}`}
          >
            <input
              type="radio"
              value={char}
              name={`Q${questionNumber}`}
              className="mr-2"
              required={true}
              checked={userChoice && userChoice === char}
              readOnly={userChoice}
            />
            {submitting ? `Generating your Option...` : option}
          </div>
        );
      })}

      {!submitting && showAnswers ? (
        <div className="w-full">
          <h4 className="mt-2">{`Correct Answer - ${question.correctOption}`}</h4>
          {isEditModeOn ? (
            <textarea
              type="text"
              className="mt-1 text-sm font-extralight w-full border pl-2 border-gray-300"
              rows={2}
              autoFocus
              value={quizInput.reason}
              onChange={(e) => {
                question["reason"] = e.target.value;
                setQuizInput({
                  ...quizInput,
                  reason: e.target.value,
                });
              }}
            ></textarea>
          ) : (
            <h4 className="mt-1 text-sm font-extralight">{`Reason - ${question.reason}`}</h4>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BooleanQuestionCard;
