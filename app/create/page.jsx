"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import QuestionCard from "@components/QuestionCard";
import QuizOptions from "@components/QuizOptions";
import constants from "@utils/constants";

const page = () => {
  const [submitting, setIsSubmitting] = useState(false);
  const [quizInput, setQuizInput] = useState({
    type: "text",
    value: "",
  });
  const [quizQuestions, setquizQuestions] = useState(
    constants.questionTypeMapping.mcq.initialQuestionSet
  );

  const { data: session } = useSession();
  const sessionUser = session?.user;

  const getQuizGuestions = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target;
    const formData = new FormData(form);
    console.log(
      `Submitting Request to get quiz of input type ${quizInput.type} and value ${quizInput.value}}`
    );
    const formJson = Object.fromEntries(formData.entries());
    if (!formJson.numberOfQuestions)
      formJson["numberOfQuestions"] = quizQuestions.length.toString();

    console.log("formJson", formJson);

    try {
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        body: JSON.stringify({
          quizInput: quizInput,
          quizOptions: formJson,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`Recieved response from server : ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-screen">
      <div className="flex w-full flex-col items-center px-4 mx-auto mt-4 space-y-0 lg:flex-row lg:items-start lg:mt-8">
        <div className="w-full flex flex-col lg:px-4 lg:w-2/5">
          {/* Left Input Text Box */}
          <QuizOptions
            source="Create"
            sessionUser={sessionUser}
            quizInput={quizInput}
            setQuizInput={setQuizInput}
            submitting={submitting}
            handleSubmit={getQuizGuestions}
          />
          <div className="flex justify-center w-full my-4"></div>
          <div className="black w-full border rounded-lg flex flex-col justify-between mt-4 p-6">
            <h4 className="font-light">
              Your quiz Link :{" "}
              <span className="orange_gradient">
                https://link-to-be-generated-when-quiz-is-created
              </span>
            </h4>
            <p className="font-extralight text-xs break-all">
              Share & Spread Quizopia
            </p>
          </div>
        </div>

        {/* Left Box with Prefences */}
        <div className="w-full mb-12 space-y-2 flex flex-col items-start justify-start lg:w-1/5 lg:px-4">
          <h3 className="bg-transparent w-full rounded-lg shadow text-center p-4">
            Preferences
          </h3>
          <div className="flex items-center pl-3">
            <input
              id="show_answers"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="show_answers"
              className="w-full py-2 ml-2 text-sm font-medium "
            >
              Show Answers
            </label>
          </div>
          <div className="flex items-center pl-3">
            <input
              id="auto_grade"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="auto_grade"
              className="w-full py-2 ml-2 text-sm font-medium "
            >
              Auto Grade Quiz
            </label>
          </div>
          <div className="flex items-center pl-3">
            <input
              id="allow_retry"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="allow_retry"
              className="w-full py-2 ml-2 text-sm font-medium "
            >
              Allow Quiz retries
            </label>
          </div>
        </div>

        {/* Right box with Questions */}
        <div className="w-full mb-12 space-y-3 px-4 flex flex-col items-start justify-start lg:w-2/5 lg:overflow-auto lg:h-screen">
          {/* Question List */}
          {quizQuestions.map((obj, i) => {
            return (
              <QuestionCard
                key={i}
                data={obj}
                questionNumber={i}
                submitting={submitting}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default page;