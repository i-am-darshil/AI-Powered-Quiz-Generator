"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import QuestionCard from "@components/QuestionCards/QuestionCard";
import QuizOptions from "@components/QuizOptions";
import constants from "@utils/constants";
import { useUser } from "@context/UserContext";

const Playground = () => {
  const { user } = useUser();

  const [submitting, setIsSubmitting] = useState(false);
  const [quizInput, setQuizInput] = useState({
    type: constants.TEXT_QUIZ_INPUT,
    value: "",
  });
  const [quizQuestionConfig, setquizQuestionConfig] = useState({
    questionType: constants.questionTypeMapping[constants.MCQ_TYPE].type,
    questions:
      constants.questionTypeMapping[constants.MCQ_TYPE].initialQuestionSet,
  });

  const getQuizGuestions = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target;
    const formData = new FormData(form);
    console.log(
      `Submitting Request to get quiz of input type ${quizInput.type}`
    );
    const formOptionEntries = Object.fromEntries(formData.entries());
    if (!formOptionEntries.numberOfQuestions || !user)
      formOptionEntries["numberOfQuestions"] =
        constants.WIHTOUT_SIGNED_INT_USER_DEFAULT_PROPS.numberOfQuestions;

    console.log("formOptionEntries", formOptionEntries);

    try {
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        body: JSON.stringify({
          quizInput: {
            type: quizInput.type,
          },
          quizOptions: formOptionEntries,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`Recieved response from server : ${JSON.stringify(data)}`);
        setquizQuestionConfig(data);
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
            sessionUser={user}
            quizInput={quizInput}
            setQuizInput={setQuizInput}
            setquizQuestionConfig={setquizQuestionConfig}
            submitting={submitting}
            handleSubmit={getQuizGuestions}
          />
        </div>

        {/* Right box with  */}
        <div className="w-full mb-12 space-y-3 flex flex-col items-start justify-start overflow-auto lg:w-1/2">
          {quizQuestionConfig.questions.map((question, i) => {
            return (
              <QuestionCard
                key={i}
                question={question}
                questionType={quizQuestionConfig.questionType}
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
