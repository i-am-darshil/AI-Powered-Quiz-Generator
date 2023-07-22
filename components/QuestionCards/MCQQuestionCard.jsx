"use client";

import { useState, useEffect } from "react";

const MCQQuestionCard = ({
  questionNumber,
  question,
  submitting,
  showAnswers,
  userChoice,
  isEditModeOn,
}) => {
  const [quizInput, setQuizInput] = useState({
    question: question.question,
    A: question.allOptions[0],
    B: question.allOptions[1],
    C: question.allOptions[2],
    D: question.allOptions[3],
  });

  useEffect(() => {
    async function updateQuestion() {
      setQuizInput({
        question: question.question,
        A: question.allOptions[0],
        B: question.allOptions[1],
        C: question.allOptions[2],
        D: question.allOptions[3],
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

      {question.allOptions.map((option, i) => {
        let char = String.fromCharCode("A".charCodeAt(0) + i);
        return (
          <div
            className="flex orange_gradient flex-row font-bold text-sm pr-2 tracking-wide w-full mt-2"
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
            {isEditModeOn ? (
              <textarea
                type="text"
                className="orange_gradient w-full border pl-2 border-gray-300"
                autoFocus
                value={quizInput[char]}
                onChange={(e) => {
                  question.allOptions[i] = e.target.value;
                  setQuizInput({
                    ...quizInput,
                    [char]: e.target.value,
                  });
                }}
              ></textarea>
            ) : (
              <>
                {submitting
                  ? "Generating your Option..."
                  : question.allOptions[i]}
              </>
            )}
          </div>
        );
      })}

      {!submitting && showAnswers ? (
        <h4 className="mt-4">{`Correct Answer - ${question.correctOption}`}</h4>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MCQQuestionCard;
