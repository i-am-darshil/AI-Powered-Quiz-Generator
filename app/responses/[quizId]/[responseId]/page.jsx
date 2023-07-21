"use client";

import { useState, useEffect } from "react";

import constants from "@utils/constants";
import QuestionCard from "@components/QuestionCards/QuestionCard";
import { useUser } from "@context/UserContext";

const page = ({ params }) => {
  const { user, isUserSessionLoading } = useUser();
  const [isQuizLoading, setIsQuizLoading] = useState(true);
  const [quizQuestionConfig, setquizQuestionConfig] = useState({
    title: "",
    error: "",
    questionsWithAnswers: [],
    userChoices: [],
    score: 0,
    timeToCompleteInMinutes: 0,
    quizType: "",
    isAllowed: true,
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `/api/get-quiz-response/${params.quizId}/${params.responseId}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(`Recieved response from server : ${JSON.stringify(data)}`);
        setquizQuestionConfig(data);
        setIsQuizLoading(false);
      }
    }
    fetchData();
  }, [user]);

  return (
    <div className="w-full h-screen justify-start items-center flex flex-col">
      <div className="black font-extralight bg-brightRedLight border border-gray-200 px-4 rounded-lg break-normal">
        {/* TODO : 'Loading Your Quiz' does not stay until quiz has loaded. isQuizLoading is somehow not coming into effect */}
        {isQuizLoading ? (
          <h3>Loading Your Responses</h3>
        ) : !user ? (
          <h3>
            Please <span className="font-normal">sign in</span> to view the quiz
            responses
          </h3>
        ) : !quizQuestionConfig.isAllowed ? (
          <h3>{quizQuestionConfig.error}</h3>
        ) : (
          <></>
        )}
      </div>

      {user && quizQuestionConfig.title ? (
        <h2 className="text-2xl font-bold tracking-wide break-normal">
          {quizQuestionConfig.title}
        </h2>
      ) : (
        <></>
      )}

      {user && !isQuizLoading && quizQuestionConfig.isAllowed ? (
        <div className="black w-full space-y-4 m-4 p-4  rounded-lg break-normal flex flex-col items-center md:flex-row md:justify-around font-light">
          {[
            constants.questionTypeMapping[constants.MCQ_TYPE].type,
            constants.questionTypeMapping[constants.BOOLEAN_TYPE].type,
          ].includes(quizQuestionConfig.quizType) ? (
            <div>
              <h3 className="">
                Score -{" "}
                <span className="font-bold">{`${quizQuestionConfig.score} out of ${quizQuestionConfig.questionsWithAnswers.length}`}</span>
              </h3>
            </div>
          ) : (
            <></>
          )}

          <h3 className="">
            Completion Time -{" "}
            <span className="font-bold">{`${quizQuestionConfig.timeToCompleteInMinutes} mins`}</span>
          </h3>
        </div>
      ) : (
        <></>
      )}

      <div className="m-4 w-full space-y-3 px-4 flex flex-col items-start justify-start overflow-auto mx-auto md:px-32 lg:px-64">
        {user &&
          quizQuestionConfig.questionsWithAnswers.map((question, i) => {
            return (
              <QuestionCard
                key={i}
                question={question}
                questionType={quizQuestionConfig.quizType}
                questionNumber={i}
                submitting={false}
                showAnswers={true}
                userChoice={quizQuestionConfig.userChoices[i]}
              />
            );
          })}
      </div>
    </div>
  );
};

export default page;
