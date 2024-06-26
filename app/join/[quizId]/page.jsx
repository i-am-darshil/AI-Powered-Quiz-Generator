"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import constants from "@utils/constants";
import QuestionCard from "@components/QuestionCards/QuestionCard";
import { useUser } from "@context/UserContext";

const page = ({ params }) => {
  const { user, isUserSessionLoading } = useUser();
  const { push } = useRouter();

  const [isQuizLoading, setIsQuizLoading] = useState(false);
  const [quizQuestionConfig, setquizQuestionConfig] = useState({
    questionType: constants.questionTypeMapping.mcq.type,
    questions: [],
    title: "",
    options: {},
    quizFound: true,
    quizStarted: false,
    responseId: "",
    hasAlreadySubmitted: false,
    quizStartedAt: "",
  });
  const [quizSubmitResponse, setQuizSubmitResponse] = useState({
    response: "",
    responseLink: "",
    isGrading: false,
  });

  const enterQuiz = async () => {
    if (!user) {
      setquizQuestionConfig({
        ...quizQuestionConfig,
        title: "You need to sign in first",
      });
      return;
    }

    setIsQuizLoading(true);
    const response = await fetch(`/api/get-quiz/${params.quizId}`);

    if (response.ok) {
      const data = await response.json();
      console.log(`Recieved response from server : ${JSON.stringify(data)}`);
      setquizQuestionConfig(data);
      setIsQuizLoading(false);
    }
  };

  const submitResponse = async (e) => {
    e.preventDefault();

    if (!user) {
      setQuizSubmitResponse({
        ...quizSubmitResponse,
        response: "You need to sign in first",
      });
      return;
    }

    setQuizSubmitResponse({
      ...quizSubmitResponse,
      isGrading: true,
    });

    let quizStartDateTime = new Date(quizQuestionConfig.quizStartedAt);
    let quizEndDateTime = new Date(new Date().toUTCString());

    let timeInMinutes =
      Math.abs(quizEndDateTime - quizStartDateTime) / (1000 * 60);

    const form = e.target;
    const formData = new FormData(form);
    console.log(`Submitting Request to grade quiz of id ${params.quizId}`);
    const formOptionEntries = Object.fromEntries(formData.entries());

    console.log("formOptionEntries", formOptionEntries);
    let responses = [];
    for (let i = 0; i < quizQuestionConfig.questions.length; i++) {
      responses.push(formOptionEntries[`Q${i}`]);
    }

    console.log(
      `Quiz responses : ${responses}, timeInMinutes : ${timeInMinutes}`
    );

    try {
      const response = await fetch("/api/grade-quiz", {
        method: "POST",
        body: JSON.stringify({
          quizId: params.quizId,
          userResponses: responses,
          timeToComplete: timeInMinutes,
          responseId: quizQuestionConfig.responseId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`Recieved response from server : ${JSON.stringify(data)}`);
        push(data.responseLink);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="w-full h-screen justify-start items-center flex flex-col"
      onSubmit={submitResponse}
    >
      {user ? (
        <h2
          className={`${
            quizQuestionConfig.quizFound
              ? "text-2xl font-bold tracking-wide break-normal"
              : "black font-extralight bg-brightRedLight border border-gray-200 px-4 mx-4 rounded-lg break-normal"
          } `}
        >
          {quizQuestionConfig.title}
        </h2>
      ) : (
        <></>
      )}
      <div className="black font-extralight bg-brightRedLight border border-gray-200 px-4 rounded-lg break-normal">
        {/* TODO : 'Loading Your Quiz' does not stay until quiz has loaded. isQuizLoading is somehow not coming into effect */}
        {isQuizLoading ? (
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

      {quizSubmitResponse.isGrading ? (
        <div className="black font-extralight m-4 bg-brightRedLight border border-gray-200 px-4 rounded-lg break-normal">
          <h3>
            Grading your quiz. You will be redirected to your response page
            after graded.
          </h3>
        </div>
      ) : (
        <></>
      )}

      {!isUserSessionLoading &&
      user &&
      quizQuestionConfig.quizFound &&
      !quizQuestionConfig.quizStarted &&
      !isQuizLoading &&
      !quizQuestionConfig.hasAlreadySubmitted ? (
        <button
          className="cursor-pointer w-96 mt-4 p-1 px-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight text-center mx-auto"
          onClick={enterQuiz}
        >
          Enter The Quiz
        </button>
      ) : (
        <></>
      )}

      {/* Middle box with Questions */}
      <div className="m-4 w-full space-y-3 px-4 flex flex-col items-start justify-start overflow-auto mx-auto md:px-32 lg:px-64">
        {user &&
          quizQuestionConfig.quizStarted &&
          !quizQuestionConfig.hasAlreadySubmitted &&
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
      {user &&
      quizQuestionConfig.quizStarted &&
      quizQuestionConfig.quizFound &&
      !quizQuestionConfig.hasAlreadySubmitted ? (
        <button
          type="submit"
          className="cursor-pointer p-1 px-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight text-center mx-auto"
        >
          Submit Responses
        </button>
      ) : (
        <span></span>
      )}
    </form>
  );
};

export default page;
