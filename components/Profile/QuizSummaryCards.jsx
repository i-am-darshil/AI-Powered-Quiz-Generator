"use client";

import constants from "@utils/constants";
import { useState } from "react";
import Link from "next/link";

const QuizSummaryCards = ({
  quizSummary,
  domainName,
  quizNumber,
  isSelectedToShowResponse,
  setQuizSelected,
}) => {
  const [showAnalytics, setShowAnalytics] = useState(false);

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow">
      <ul
        className="flex items-center justify-between text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50"
        id="defaultTab"
        data-tabs-toggle="#defaultTabContent"
        role="tablist"
      >
        <div className="flex justify-start">
          <li className="mr-2">
            <button
              id="about-tab"
              type="button"
              className={`inline-block p-4 ${
                showAnalytics ? "" : "text-brightRed"
              }  rounded-tl-lg hover:bg-gray-100`}
              onClick={() => setShowAnalytics(false)}
            >
              About
            </button>
          </li>

          <li className="mr-2">
            <button
              id="statistics-tab"
              type="button"
              className={`inline-block p-4 ${
                showAnalytics ? "text-brightRed" : ""
              }  rounded-tl-lg hover:bg-gray-100`}
              onClick={() => setShowAnalytics(true)}
            >
              Analytics
            </button>
          </li>
        </div>

        <div>
          <li>
            <button
              type="button"
              className={`${
                isSelectedToShowResponse
                  ? "bg-brightRedLight text-white"
                  : "bg-white text-brightRedLight border border-brightRedLight"
              } hover:cursor-pointer focus:ring-4 focus:outline-none font-medium rounded-lg text-sm m-2 p-2 text-center inline-flex items-center`}
              onClick={() => {
                setQuizSelected(quizNumber);
              }}
              // disabled={true}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
              <span className="sr-only">Icon description</span>
            </button>
          </li>
        </div>
      </ul>

      <div id="defaultTabContent">
        <div
          className="p-4 bg-white rounded-lg md:px-8 md:py-4"
          id="about"
          role="tabpanel"
          aria-labelledby="about-tab"
          hidden={showAnalytics}
        >
          <h2 className="mb-3 pb-2 uppercase text-xl font-light tracking-tight border-b border-gray-200">
            {quizSummary.title}
            <Link
              className="block lowercase text-base font-extralight orange_gradient"
              href={`${domainName}/join/${quizSummary.id}`}
            >
              {`${domainName}/join/${quizSummary.id}`}
            </Link>
            <span className="block capitalize text-xs font-extralight black">
              {`created at : ${new Date(quizSummary.created_at)}`}
            </span>
          </h2>

          <ul role="list" className="space-y-4 text-gray-500 capitalize">
            <li className="flex space-x-2 items-center">
              <svg
                className="flex-shrink-0 w-3.5 h-3.5 text-brightRedLight"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="leading-tight">
                {`${quizSummary.number_of_questions} ${quizSummary.quiz_type} Questions`}
              </span>
            </li>
            <li className="flex space-x-2 items-center">
              <svg
                className="flex-shrink-0 w-3.5 h-3.5 text-brightRedLight"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="leading-tight">{`${quizSummary.options.dfficulty} difficulty`}</span>
            </li>
            <li className="flex space-x-2 items-center">
              <svg
                className="flex-shrink-0 w-3.5 h-3.5 text-brightRedLight"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="leading-tight">
                {`In ${quizSummary.options.language} language`}
              </span>
            </li>
            <li className="flex space-x-2 items-center">
              <svg
                className="flex-shrink-0 w-3.5 h-3.5 text-brightRedLight"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="leading-tight">Free For All Public Quiz</span>
            </li>
          </ul>
        </div>

        <div
          className="p-4 bg-white rounded-lg space-y-8"
          id="statistics"
          hidden={!showAnalytics}
        >
          <div className="w-full flex items-center justify-around">
            <div className="flex flex-col items-center w-1/2">
              <dt className="mb-2 text-l font-normal">{`${quizSummary.quiz_analytics[0].number_of_responses}`}</dt>
              <dd className="text-gray-500 text-sm text-center font-light">
                Number of Responses
              </dd>
            </div>
            <div className="flex flex-col items-center w-1/2">
              <dt className="mb-2 text-l font-normal">{`${quizSummary.quiz_analytics[0].number_of_visitors}`}</dt>
              <dd className="text-gray-500 text-sm text-center font-light">
                Number of Visitors
              </dd>
            </div>
          </div>

          <div className="w-full flex items-center justify-around">
            {constants.QUIZZES_TO_GRADE.includes(quizSummary.quiz_type) ? (
              <div className="flex flex-col items-center w-1/2">
                <dt className="mb-2 text-l font-normal">
                  {`${(
                    quizSummary.quiz_analytics[0].total_score /
                    quizSummary.quiz_analytics[0].number_of_responses
                  ).toFixed(2)} / ${quizSummary.number_of_questions}`}
                </dt>
                <dd className="text-gray-500 text-sm text-center font-light">
                  Avgerage Score
                </dd>
              </div>
            ) : (
              <></>
            )}

            <div className="flex flex-col items-center w-1/2">
              <dt className="mb-2 text-l font-normal">{`${(
                quizSummary.quiz_analytics[0]
                  .total_time_to_complete_in_minutes /
                quizSummary.quiz_analytics[0].number_of_responses
              ).toFixed(2)} Mins`}</dt>
              <dd className="text-gray-500 text-sm text-center font-light">
                Average Time To Complete
              </dd>
            </div>
          </div>

          {constants.QUIZZES_TO_GRADE.includes(quizSummary.quiz_type) ? (
            <div className="w-full flex items-center justify-around">
              <div className="flex flex-col items-center w-1/2">
                <dt className="mb-2 text-l font-normal">
                  {quizSummary.quiz_analytics[0].zero_to_fifty_percent}
                </dt>
                <dd className="text-gray-500 text-sm text-center font-light">
                  0% - 50% Score
                </dd>
              </div>
              <div className="flex flex-col items-center w-1/2">
                <dt className="mb-2 text-l font-normal">
                  {quizSummary.quiz_analytics[0].fifty_to_hundred_percent}
                </dt>
                <dd className="text-gray-500 text-sm text-center font-light">
                  50% - 100% Score
                </dd>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizSummaryCards;
