import React from "react";
import constants from "@utils/constants";

const QuizOptions = ({
  source,
  sessionUser,
  quizInput,
  setQuizInput,
  quizQuestionConfig,
  setquizQuestionConfig,
  submitting,
  handleSubmit,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full mb-4 lg:mb-0 lg:mr-16 flex flex-col items-center"
    >
      <div className="bg-transparent w-full rounded-lg shadow text-center">
        <div className="w-full mx-auto max-w-screen-xl p-2 flex items-center justify-around">
          <span
            className={`text-sm black cursor-pointer ${
              quizInput.type == constants.TEXT_QUIZ_INPUT
                ? "border-b border-black font-extrabold"
                : ""
            } p-2 sm:text-center`}
            onClick={(e) => {
              setQuizInput({
                type: constants.TEXT_QUIZ_INPUT,
                value: "",
              });
            }}
          >
            Text
          </span>
          <span
            className={`text-sm black cursor-pointer ${
              quizInput.type == constants.TOPIC_QUIZ_INPUT
                ? "border-b border-black font-extrabold"
                : ""
            } p-2 sm:text-center`}
            onClick={(e) => {
              setQuizInput({
                type: constants.TOPIC_QUIZ_INPUT,
                value: "",
              });
            }}
          >
            Topic
          </span>
          <span
            className={`text-sm black cursor-pointer ${
              quizInput.type == constants.WEBSITE_QUIZ_INPUT
                ? "border-b border-black font-extrabold"
                : ""
            } p-2 sm:text-center`}
            onClick={(e) => {
              setQuizInput({
                type: constants.WEBSITE_QUIZ_INPUT,
                value: "",
              });
            }}
          >
            Website
          </span>
        </div>
      </div>

      {quizInput.type == constants.TEXT_QUIZ_INPUT ? (
        <textarea
          id="quiz-text"
          required
          rows="12"
          className="block p-2.5 w-full text-sm text-gray-900 black rounded border border-brightRedLight"
          name="quizInputValue"
          value={quizInput.value}
          onChange={(e) =>
            setQuizInput({ ...quizInput, value: e.target.value })
          }
          placeholder="Artificial intelligence (AI) is the technological wizardry that brings science fiction to life. Imagine a world where machines not only crunch numbers but also possess the ability to learn, reason, and even exhibit creativity. From autonomous cars navigating busy city streets to chatbots engaging in human-like conversations, AI is transforming our reality. This cutting-edge field encompasses mind-boggling technologies like machine learning, where computers teach themselves from vast amounts of data, and computer vision, enabling machines to see and understand the world around them. Whether it's the breathtaking capabilities of AI-powered robots or the mind-bending applications in healthcare, finance, and gaming, the potential of AI seems limitless. However, with great power comes great responsibility. Ensuring that AI remains unbiased, transparent, and aligned with human values is crucial to prevent unintended consequences. As AI continues to push the boundaries of what's possible, we find ourselves on the precipice of an awe-inspiring future where human ingenuity and machine intelligence coexist in an unprecedented dance of progress and innovation."
        ></textarea>
      ) : quizInput.type == constants.TOPIC_QUIZ_INPUT ? (
        <textarea
          id="quiz-text"
          required
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 black rounded border border-brightRedLight"
          name="quizInputValue"
          value={quizInput.value}
          onChange={(e) =>
            setQuizInput({ ...quizInput, value: e.target.value })
          }
          placeholder="Topics seperated by commas. E.g. Artificial intelligence, Machine Learning, ...."
        ></textarea>
      ) : (
        <textarea
          id="quiz-text"
          required
          rows="2"
          className="block p-2.5 w-full text-sm text-gray-900 black rounded border border-brightRedLight"
          name="quizInputValue"
          value={quizInput.value}
          onChange={(e) =>
            setQuizInput({ ...quizInput, value: e.target.value })
          }
          placeholder={`Generate quiz from a website!!!\nE.g. https://en.wikipedia.org/wiki/Artificial_intelligence`}
        ></textarea>
      )}

      <div className="black w-full border rounded-lg flex flex-col justify-between mt-4">
        <div className="flex justify-around">
          <div className="flex flex-col w-1/2 m-4">
            <label
              htmlFor="questionType"
              className="block mb-2 text-sm font-medium"
            >
              Question Type
            </label>
            <select
              id="questionType"
              className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              defaultValue={constants.MCQ_TYPE}
              onChange={(e) => {
                setquizQuestionConfig({
                  ...quizQuestionConfig,
                  questionType:
                    constants.questionTypeMapping[e.target.value].type,
                  questions:
                    constants.questionTypeMapping[[e.target.value]]
                      .initialQuestionSet,
                });
              }}
              name="questionType"
              disabled={submitting}
            >
              <option value={constants.MCQ_TYPE}>MCQ</option>
              <option value={constants.BOOLEAN_TYPE}>True/False</option>
              <option value={constants.SHORT_ANSWER_TYPE}>Short Answer</option>
              <option value={constants.FILL_IN_THE_BLANKS_TYPE}>
                Fill in the blank
              </option>
            </select>
          </div>
          <div className="w-1/2 m-4">
            <label
              htmlFor="language"
              className="block mb-2 text-sm font-medium"
            >
              Language
            </label>
            <select
              id="language"
              className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              defaultValue="english"
              name="language"
              disabled={submitting}
            >
              <option value="english">English</option>
              <option value="chinese">Mandarin Chinese</option>
              <option value="hindi">Hindi</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
            </select>
          </div>
        </div>
        <div className="flex justify-around">
          <div className="w-1/2 m-4">
            <label
              htmlFor="difficulty"
              className="block mb-2 text-sm font-medium"
            >
              Difficulty
            </label>
            <select
              id="difficulty"
              className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              defaultValue={constants.MIXBAG_DIFFICULTY}
              name="difficulty"
              disabled={submitting}
            >
              <option value={constants.MIXBAG_DIFFICULTY}>Mix Bag</option>
              <option value={constants.EASY_DIFFICULTY}>Easy</option>
              <option value={constants.MEDIUM_DIFFICULTY}>Medium</option>
              <option value={constants.HARD_DIFFICULTY}>Hard</option>
            </select>
          </div>
          <div className="w-1/2 m-4">
            <label
              htmlFor="numberOfQuestions"
              className="block mb-2 text-sm font-medium"
            >
              Max Questions
            </label>
            <select
              id="numberOfQuestions"
              className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              defaultValue="4"
              name="numberOfQuestions"
              disabled={!sessionUser || submitting}
            >
              <option value={4}>
                {sessionUser ? "4" : "4 (SignUp For More)"}
              </option>
              <option value="8">8</option>
              <option value="12">12</option>
              <option value="16">16</option>
              {/* 20 Questions is giving 503 error sometimes. Model used is default gpt-3.5-turbo */}
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="cursor-pointer p-1 px-2 text-white w-full bg-brightRed rounded-full baseline hover:bg-brightRedLight text-center mx-auto"
        disabled={submitting}
      >
        Generate Quiz
      </button>
    </form>
  );
};

export default QuizOptions;
