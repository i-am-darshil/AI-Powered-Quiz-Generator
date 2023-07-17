"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import constants from "@utils/constants";
import QuestionCard from "@components/QuestionCards/QuestionCard";

const page = ({ params }) => {
  const [loading, setIsloading] = useState(true);
  const [quizQuestionConfig, setquizQuestionConfig] = useState({
    questionType: constants.questionTypeMapping.mcq.type,
    questions: constants.questionTypeMapping.mcq.initialQuestionSet,
    title: "Loading the quiz title...",
    options: {},
    quizFound: true,
  });

  const { data: session } = useSession();
  const sessionUser = session?.user;

  useEffect(() => {
    (async () => {
      try {
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
        setIsloading(false);
      }
    })();
  }, []);
  return (
    <div className="w-full h-screen justify-start items-center flex flex-col">
      {quizQuestionConfig.quizFound ? (
        <h2 className="text-2xl font-bold tracking-wide break-normal">
          {quizQuestionConfig.title}
        </h2>
      ) : (
        <div className="black font-extralight bg-brightRedLight border border-gray-200 px-4 rounded-lg break-norma">
          <h3>{quizQuestionConfig.title}</h3>
        </div>
      )}

      {sessionUser ? (
        <span></span>
      ) : quizQuestionConfig.quizFound ? (
        <div className="black font-extralight bg-brightRedLight border border-gray-200 px-4 rounded-lg break-norma">
          <h3>
            You need to <span className="font-normal">sign in</span> to submit
            the quiz
          </h3>
        </div>
      ) : (
        <span></span>
      )}

      {/* Middle box with Questions */}
      <div className="m-4 w-full space-y-3 px-4 flex flex-col items-start justify-start overflow-auto mx-auto md:px-32 lg:px-64">
        {/* Question List */}
        {quizQuestionConfig.questions.map((question, i) => {
          return (
            <QuestionCard
              key={i}
              question={question}
              questionType={quizQuestionConfig.questionType}
              questionNumber={i}
              submitting={loading}
            />
          );
        })}
      </div>

      {sessionUser && quizQuestionConfig.quizFound ? (
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
