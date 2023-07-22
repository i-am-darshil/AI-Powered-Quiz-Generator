"use client";

import { useState } from "react";

import MCQQuestionCard from "@components/QuestionCards/MCQQuestionCard";
import BooleanQuestionCard from "@components/QuestionCards/BooleanQuestionCard";
import ShortAnswerQuestionCard from "@components/QuestionCards/ShortAnswerQuestionCard";
import FillInTheBlankCard from "@components/QuestionCards/FillInTheBlankCard";
import constants from "@utils/constants";

const QuestionCard = ({
  questionNumber,
  question,
  questionType,
  submitting,
  showAnswers,
  userChoice,
  isEditable,
}) => {
  const [isEditModeOn, setIsEditModeOn] = useState(false);

  return (
    <div className="black w-full bg-white border border-gray-200 px-4 rounded-lg break-normal">
      {questionType ==
      constants.questionTypeMapping[constants.MCQ_TYPE].type ? (
        <MCQQuestionCard
          questionNumber={questionNumber}
          question={question}
          submitting={submitting}
          key={questionNumber}
          showAnswers={showAnswers}
          userChoice={userChoice}
          isEditModeOn={isEditModeOn}
        />
      ) : questionType ==
        constants.questionTypeMapping[constants.BOOLEAN_TYPE].type ? (
        <BooleanQuestionCard
          questionNumber={questionNumber}
          question={question}
          submitting={submitting}
          key={questionNumber}
          showAnswers={showAnswers}
          userChoice={userChoice}
          isEditModeOn={isEditModeOn}
        />
      ) : questionType ==
        constants.questionTypeMapping[constants.SHORT_ANSWER_TYPE].type ? (
        <ShortAnswerQuestionCard
          questionNumber={questionNumber}
          question={question}
          submitting={submitting}
          key={questionNumber}
          showAnswers={showAnswers}
          userChoice={userChoice}
          isEditModeOn={isEditModeOn}
        />
      ) : (
        <FillInTheBlankCard
          questionNumber={questionNumber}
          question={question}
          submitting={submitting}
          key={questionNumber}
          showAnswers={showAnswers}
          userChoice={userChoice}
          isEditModeOn={isEditModeOn}
        />
      )}

      {isEditable && !submitting ? (
        <div className="flex justify-end space-x-8 pb-4">
          <svg
            className="h-6 w-6 text-brightRedLight hover:text-brightRed hover:cursor-pointer"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => {
              setIsEditModeOn(true);
            }}
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
            <line x1="16" y1="5" x2="19" y2="8" />
          </svg>

          <svg
            className="h-6 w-6 text-brightRedLight hover:text-brightRed hover:cursor-pointer"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => {
              setIsEditModeOn(false);
            }}
          >
            {" "}
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />{" "}
            <polyline points="17 21 17 13 7 13 7 21" />{" "}
            <polyline points="7 3 7 8 15 8" />
          </svg>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default QuestionCard;
