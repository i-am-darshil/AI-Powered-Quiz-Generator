"use client";

import { useState, useEffect } from "react";

const FillInTheBlankCard = ({
  questionNumber,
  question,
  submitting,
  showAnswers,
  userChoice,
  isEditModeOn,
}) => {
  const [quizInput, setQuizInput] = useState({
    question: question.question,
    answer: question.answer,
  });

  useEffect(() => {
    async function updateQuestion() {
      setQuizInput({
        question: question.question,
        answer: question.answer,
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
      <div className="flex black flex-row font-bold text-sm w-full pr-2">
        <textarea
          rows={"2"}
          name={`Q${questionNumber}`}
          placeholder={userChoice ? userChoice : "Fill in the blank"}
          className="mr-2 w-full font-normal black py-2"
          required={true}
          disabled={userChoice}
        />
      </div>
      {/* {userChoice ? (
        <h4 className="mt-2">{`Response - ${userChoice}`}</h4>
      ) : (
        <></>
      )} */}
      {!submitting && showAnswers ? (
        <div className="w-full">
          <h4 className="mt-2 font-extralight">Possible Answer</h4>
          {isEditModeOn ? (
            <textarea
              type="text"
              className="mt-1 text-sm font-extralight w-full border pl-2 border-gray-300"
              rows={6}
              autoFocus
              value={quizInput.answer}
              onChange={(e) => {
                question["answer"] = e.target.value;
                setQuizInput({
                  ...quizInput,
                  answer: e.target.value,
                });
              }}
            ></textarea>
          ) : (
            <h4 className="mt-1 text-sm font-light">{question.answer}</h4>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FillInTheBlankCard;
