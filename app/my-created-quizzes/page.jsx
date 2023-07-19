"use client";

import { useState, useEffect } from "react";
import { useUser } from "@context/UserContext";

const page = () => {
  return (
    <div className="flex w-full flex-col items-center px-4 mx-auto mt-4 space-y-0 md:flex-row md:items-start md:mt-8 h-screen">
      <div className="w-full flex flex-col lg:px-4 md:w-2/5"></div>

      <div className="hidden w-full mb-12 space-y-3 px-4 md:flex flex-col items-start justify-start md:w-3/5 md:overflow-auto md:h-screen black md:rounded-lg break-normal">
        <div className="relative overflow-scroll w-full">
          <table className="w-full text-sm text-gray-500 dark:text-gray-400 text-center ">
            <thead className="text-xs text-white  border bg-brightRed border-brightRed uppercase">
              <tr>
                <th scope="col" className="py-3">
                  Participant name
                </th>
                <th scope="col" className="py-3">
                  Participant email
                </th>
                <th scope="col" className="py-3">
                  time
                </th>
                <th scope="col" className="py-3">
                  score
                </th>
                <th scope="col" className="py-3">
                  rank
                </th>
                <th scope="col" className="text-center">
                  submission
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-brightRedLight text-black border-b border-x capitalize">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap came"
                >
                  Darshil Shah
                </th>
                <td className="px-6 py-4 lowercase">darshil@somaiya.edu</td>
                <td className="px-6 py-4">12:00</td>
                <td className="px-6 py-4">20</td>
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    className="text-brightRed border border-brightRed hover:cursor-pointer  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-1 text-center inline-flex items-center"
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
                </td>
              </tr>

              <tr className="border-brightRedLight text-black border-b border-x capitalize">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap came"
                >
                  Darshil Shah
                </th>
                <td className="px-6 py-4 lowercase">darshil@somaiya.edu</td>
                <td className="px-6 py-4">12:00</td>
                <td className="px-6 py-4">20</td>
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    className="text-brightRed border border-brightRed hover:cursor-pointer  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-1 text-center inline-flex items-center"
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
                </td>
              </tr>

              <tr className="border-brightRedLight text-black border-b border-x capitalize">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap came"
                >
                  Darshil Shah
                </th>
                <td className="px-6 py-4 lowercase">darshil@somaiya.edu</td>
                <td className="px-6 py-4">12:00</td>
                <td className="px-6 py-4">20</td>
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    className="text-brightRed border border-brightRed hover:cursor-pointer  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-1 text-center inline-flex items-center"
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
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
