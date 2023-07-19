"use client";

import { useState } from "react";
import { useUser } from "@context/UserContext";

import QuizSummaryCards from "@components/Profile/QuizSummaryCards";
import TableRow from "@components/Profile/TableRow";

const page = () => {
  const { user } = useUser();

  return (
    <div className="flex w-full flex-col items-center px-4 mx-auto mt-4 space-y-0 md:flex-row md:items-start md:mt-8 ">
      <div className="w-full flex flex-col space-y-4 md:h-screen md:overflow-y-scroll lg:px-4 md:w-2/5">
        <QuizSummaryCards />
        <QuizSummaryCards />
        <QuizSummaryCards />
        <QuizSummaryCards />
        <QuizSummaryCards />
        <QuizSummaryCards />
      </div>

      <div className="hidden w-full mb-12 space-y-3 px-4 md:flex flex-col items-start justify-start md:w-3/5 md:overflow-auto md:h-screen black md:rounded-lg break-normal">
        <div className="relative overflow-scroll md:h-screen md:overflow-y-scroll w-full">
          <table className="w-full text-sm text-gray-500 dark:text-gray-400 text-center ">
            <thead className="text-xs text-white  border bg-brightRedLight border-brightRed uppercase">
              <tr>
                <th scope="col" className="py-3">
                  Participant name
                </th>
                {/* <th scope="col" className="py-3">
                  Participant email
                </th> */}
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
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
