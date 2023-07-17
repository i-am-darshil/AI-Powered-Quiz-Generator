"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import QuestionCard from "@components/QuestionCards/QuestionCard";
import QuizOptions from "@components/QuizOptions";
import constants from "@utils/constants";
import util from "@utils/util";

const page = () => {
  const [submitting, setIsSubmitting] = useState(false);
  const [quizInput, setQuizInput] = useState({
    type: constants.TEXT_QUIZ_INPUT,
    value: "",
  });
  const [quizQuestionConfig, setquizQuestionConfig] = useState({
    questionType: constants.questionTypeMapping.mcq.type,
    questions: constants.questionTypeMapping.mcq.initialQuestionSet,
  });

  const [quizLinkConfig, setQuizLinkConfig] = useState({
    quizLink: "https://your-awesome-quiz-link-to-be-generated",
    allowRetry: false,
    autoGrade: false,
  });

  const { data: session } = useSession();
  const sessionUser = session?.user;

  const getQuizGuestions = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target;
    const formData = new FormData(form);
    console.log(
      `Submitting Request to get quiz of input type ${quizInput.type}`
    );
    const formOptionEntries = Object.fromEntries(formData.entries());
    if (!formOptionEntries.numberOfQuestions || !sessionUser)
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

  const getQuizLink = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    console.log(`Generating quiz link`);
    const formOptionEntries = Object.fromEntries(formData.entries());

    console.log("getQuizLink formOptionEntries", formOptionEntries);

    try {
      const response = await fetch("/api/generate-quiz-link", {
        method: "POST",
        body: JSON.stringify({
          quizTitle: formOptionEntries.quizTitle,
          allowRetry: formOptionEntries.allowRetry == "on" ? true : false,
          autoGrade: formOptionEntries.autoGrade == "on" ? true : false,
          creatorId: sessionUser.id,
          quizType: quizQuestionConfig.questionType,
          questions: quizQuestionConfig.questions,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`Recieved response from server : ${JSON.stringify(data)}`);
        setQuizLinkConfig(data);
      }
    } catch (error) {
      console.error(error);
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
            setquizQuestionConfig={setquizQuestionConfig}
            submitting={submitting}
            handleSubmit={getQuizGuestions}
          />
          <div className="black w-full border rounded-lg flex flex-col justify-between mt-8 p-6 text-sm space-y-4">
            <h4 className="font-extralight">
              Our platform uses cutting-edge AI technology to craft a wide range
              of questions that cover different areas of interest.
            </h4>

            <h4 className="font-extralight">
              It intelligently extracts relevant information from a diverse
              range of texts, articles, and data, enabling us to create
              well-crafted questions with multiple-choice, true or false, fill
              in the blanks, or short answer formats.
            </h4>
            <h4 className="font-extralight">
              The difficulty of each question is meticulously defined through
              factors like distractors, ambiguity, specificity of answers,
              context, and use of terminology. We aim to strike the perfect
              balance between challenging and accessible questions to keep you
              engaged and learn.
            </h4>
          </div>
        </div>

        {/* Middle box with Questions */}
        <div className="w-full mb-12 space-y-3 px-4 flex flex-col items-start justify-start lg:w-2/5 lg:overflow-auto lg:h-screen">
          {/* Question List */}
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

        {/* Right Box with Prefences */}
        <div className="w-full mb-12 space-y-4 flex flex-col items-start justify-start lg:w-1/5 lg:px-4">
          <div className="w-full">
            <h3 className="bg-transparent w-full rounded-lg shadow text-center p-4 font-bold">
              View Preferences
            </h3>
            <div className="flex items-center pl-3">
              <input
                id="showAnswers"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                name="showAnswers"
              />
              <label
                htmlFor="showAnswers"
                className="w-full py-2 ml-2 text-sm font-medium "
              >
                Show Answers
              </label>
            </div>
          </div>

          <form className="w-full" onSubmit={getQuizLink}>
            <div className="w-full">
              <h3 className="bg-transparent w-full rounded-lg shadow text-center p-4 font-bold">
                Quiz Preferences
              </h3>
              <div className="flex items-center pl-3">
                <input
                  id="autoGrade"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  name="autoGrade"
                />
                <label
                  htmlFor="autoGrade"
                  className="w-full py-2 ml-2 text-sm font-medium "
                >
                  Auto Grade Quiz
                </label>
              </div>
            </div>
            <div className="flex items-center pl-3">
              <input
                id="allowRetry"
                type="checkbox"
                name="allowRetry"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="allowRetry"
                className="w-full py-2 ml-2 text-sm font-medium "
              >
                Allow Quiz retries
              </label>
            </div>
            <div className="w-full">
              <h3 className="bg-transparent w-full rounded-lg shadow text-center p-4 font-bold mt-2">
                Quiz Title
              </h3>
              <textarea
                id="quizTitle"
                required
                rows="1"
                className="block p-2.5 w-full text-sm text-gray-900 black rounded border border-brightRedLight mt-4"
                name="quizTitle"
                // value={quizInput.value}
                // onChange={(e) =>
                //   setQuizInput({ ...quizInput, value: e.target.value })
                // }
                placeholder={`You can name your quizzes here..`}
              ></textarea>
            </div>

            <button
              type="submit"
              className="cursor-pointer p-1 px-2 text-white w-full bg-brightRed rounded-full baseline hover:bg-brightRedLight text-center mx-auto mt-8"
            >
              Generate Quiz Link
            </button>
          </form>

          <div className="black w-full border rounded-lg flex flex-col justify-between mt-4 p-6">
            <h4 className="font-light break-all">
              Your quiz Link :{" "}
              <a className="orange_gradient" href={quizLinkConfig.quizLink}>
                {quizLinkConfig.quizLink}
              </a>
            </h4>
            <p className="font-extralight text-xs break-all mt-2">
              Share & Spread Quizopia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
