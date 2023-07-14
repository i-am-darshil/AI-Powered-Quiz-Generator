import React from "react";

const QuizOptions = () => {
  return (
    <div className="space-y-4 w-full lg:mr-16 flex flex-col items-center">
      <div className="bg-transparent w-full rounded-lg shadow text-center">
        <div className="w-full mx-auto max-w-screen-xl p-2 flex items-center justify-around">
          <span className="text-sm black border-b border-black font-extrabold p-2 sm:text-center">
            Text
          </span>
          <span className="text-sm black sm:text-center">Text</span>
          <span className="text-sm black sm:text-center">Text</span>
        </div>
      </div>
      <textarea
        id="quiz-text"
        rows="12"
        className="block p-2.5 w-full text-sm text-gray-900 black rounded border border-brightRedLight"
        placeholder="Artificial intelligence (AI) is the technological wizardry that brings science fiction to life. Imagine a world where machines not only crunch numbers but also possess the ability to learn, reason, and even exhibit creativity. From autonomous cars navigating busy city streets to chatbots engaging in human-like conversations, AI is transforming our reality. This cutting-edge field encompasses mind-boggling technologies like machine learning, where computers teach themselves from vast amounts of data, and computer vision, enabling machines to see and understand the world around them. Whether it's the breathtaking capabilities of AI-powered robots or the mind-bending applications in healthcare, finance, and gaming, the potential of AI seems limitless. However, with great power comes great responsibility. Ensuring that AI remains unbiased, transparent, and aligned with human values is crucial to prevent unintended consequences. As AI continues to push the boundaries of what's possible, we find ourselves on the precipice of an awe-inspiring future where human ingenuity and machine intelligence coexist in an unprecedented dance of progress and innovation."
      ></textarea>

      <div className="black w-full border rounded-lg flex flex-col justify-between mt-4">
        <div className="flex justify-around">
          <div className="flex flex-col w-1/2 m-4">
            <label for="question_type" class="block mb-2 text-sm font-medium">
              Question Type
            </label>
            <select
              id="question_type"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option selected value="mcq">
                MCQ
              </option>
              <option value="boolean">True/False</option>
              <option value="short_answer">Short Answer</option>
              <option value="fill_in_blank">Fill in the blank</option>
            </select>
          </div>
          <div className="w-1/2 m-4">
            <label for="countries" class="block mb-2 text-sm font-medium">
              Language
            </label>
            <select
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option selected value="english">
                English
              </option>
              <option value="chinese">Mandarin Chinese</option>
              <option value="hindi">Hindi</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
            </select>
          </div>
        </div>
        <div className="flex justify-around">
          <div className="w-1/2 m-4">
            <label for="difficulty" class="block mb-2 text-sm font-medium">
              Difficulty
            </label>
            <select
              id="difficulty"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option selected value="easy">
                Easy
              </option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="w-1/2 m-4">
            <label for="num_questions" class="block mb-2 text-sm font-medium">
              Max Questions
            </label>
            <select
              id="num_questions"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option selected value="3">
                3
              </option>
              <option value="5">5</option>
              <option value="12">12</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizOptions;
