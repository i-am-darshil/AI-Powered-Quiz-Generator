"use client";

import { useState, useEffect } from "react";

import constants from "@utils/constants";
import QuestionCard from "@components/QuestionCards/QuestionCard";
import { useUser } from "@context/UserContext";

const page = ({ params }) => {
  const { user, isUserSessionLoading } = useUser();

  const [isQuizLoading, setIsQuizLoading] = useState(true);
  const [quizQuestionConfig, setquizQuestionConfig] = useState({
    questionType: constants.questionTypeMapping.mcq.type,
    questions: [],
    title: "",
    options: {},
    quizFound: false,
  });

  useEffect(() => {
    (async () => {
      try {
        if (!user) return;
        const response = await fetch(`/api/get-quiz/${params.quizId}`);

        if (response.ok) {
          const data = await response.json();
          console.log(
            `Recieved response from server : ${JSON.stringify(data)}`
          );
          setquizQuestionConfig(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsQuizLoading(false);
      }
    })();
  }, [user]);
  return (
    <div className="w-full h-screen justify-start items-center flex flex-col">
      {user ? (
        <h2
          className={`${
            quizQuestionConfig.quizFound
              ? "text-2xl font-bold tracking-wide break-normal"
              : "black font-extralight bg-brightRedLight border border-gray-200 px-4 rounded-lg break-normal"
          } `}
        >
          {quizQuestionConfig.title}
        </h2>
      ) : (
        <></>
      )}
      <div className="black font-extralight bg-brightRedLight border border-gray-200 px-4 rounded-lg break-normal">
        {/* TODO : 'Loading Your Quiz' does not stay until quiz has loaded. isQuizLoading is somehow not coming into effect */}
        {isUserSessionLoading || isQuizLoading ? (
          <h3>Loading Your Quiz</h3>
        ) : !user ? (
          <h3>
            Please <span className="font-normal">sign in</span> to enter the
            quiz
          </h3>
        ) : (
          <></>
        )}
      </div>

      {/* Middle box with Questions */}
      <div className="m-4 w-full space-y-3 px-4 flex flex-col items-start justify-start overflow-auto mx-auto md:px-32 lg:px-64">
        {/* Question List */}
        {user &&
          quizQuestionConfig.questions.map((question, i) => {
            return (
              <QuestionCard
                key={i}
                question={question}
                questionType={quizQuestionConfig.questionType}
                questionNumber={i}
                submitting={isQuizLoading}
              />
            );
          })}
      </div>
      {user && quizQuestionConfig.quizFound ? (
        <button
          type="submit"
          className="cursor-pointer p-1 px-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight text-center mx-auto"
        >
          Submit Responses
        </button>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default page;
