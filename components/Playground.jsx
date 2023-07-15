"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import QuestionCard from "./QuestionCard";
import QuizOptions from "./QuizOptions";
import constants from "@utils/constants";

const Playground = () => {
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
          options: formData,
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
    <section>
      <h1 className="text-center mt-8 text-3xl font-thin md:text-4xl md:mt-16">
        - LET'S TRY IT OUT -
      </h1>
      <div className="container flex w-full flex-col items-center px-6 mx-auto mt-4 space-y-0 lg:flex-row lg:items-start lg:mt-8">
        <div className="w-full flex flex-col lg:mr-8 lg:w-1/2">
          {/* Left Input Text Box */}
          <QuizOptions
            source="Playground"
            sessionUser={sessionUser}
            quizInput={quizInput}
            setQuizInput={setQuizInput}
            submitting={submitting}
            handleSubmit={getQuizGuestions}
          />
        </div>

        {/* Right box with  */}
        <div className="w-full mb-12 space-y-3 flex flex-col items-start justify-start overflow-auto lg:w-1/2">
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

export default Playground;
