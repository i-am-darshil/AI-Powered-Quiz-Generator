"use client";

import { useState, useEffect } from "react";
import constants from "@utils/constants";
import QuestionCard from "@components/QuestionCards/QuestionCard";
import { useUser } from "@context/UserContext";

const page = ({ params }) => {
  const { user, isUserSessionLoading } = useUser();

  const [isQuizLoading, setIsQuizLoading] = useState(false);
  const [quizQuestionConfig, setquizQuestionConfig] = useState({
    questionType: constants.questionTypeMapping.mcq.type,
    questions: constants.questionTypeMapping.mcq.initialQuestionSet,
    title: "",
    options: {},
    quizFound: false,
  });
  return (
    <div className="w-full h-screen justify-start items-center flex flex-col">
      <div className="m-4 w-full space-y-3 px-4 flex flex-col items-start justify-start overflow-auto mx-auto md:px-32 lg:px-64">
        {/* Question List */}
        {true &&
          quizQuestionConfig.questions.map((question, i) => {
            return (
              <QuestionCard
                key={i}
                question={question}
                questionType={quizQuestionConfig.questionType}
                questionNumber={i}
                submitting={isQuizLoading}
                showAnswers={true}
              />
            );
          })}
      </div>
    </div>
  );
};

export default page;
