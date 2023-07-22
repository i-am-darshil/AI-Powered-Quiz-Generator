"use client";

import { useState, useEffect } from "react";
import { useUser } from "@context/UserContext";

import QuizSummaryCards from "@components/Profile/QuizSummaryCards";
import TableRow from "@components/Profile/TableRow";

const page = () => {
  const { user } = useUser();
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [quizSelected, setQuizSelected] = useState(0);
  const [profileSummary, setProfileSummary] = useState({
    profileData: [],
    error: "",
    domainName: "",
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/get-my-created-quiz-info`);
      if (response.ok) {
        const data = await response.json();
        console.log(`Recieved response from server : ${JSON.stringify(data)}`);
        setProfileSummary(data);
        setIsProfileLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="h-screen">
      <span
        className={`block text-center text-2xl border-b border-brightRed mx-12 font-light uppercase ${
          isProfileLoading || !user || profileSummary.profileData.length === 0
            ? "hidden"
            : ""
        }`}
      >
        Your Quiz Inventory
      </span>
      <div
        className={`black font-extralight bg-brightRedLight border border-gray-200 px-4 rounded-lg break-normal text-center m-8 ${
          !isProfileLoading && user && profileSummary.profileData.length > 0
            ? "hidden"
            : ""
        }`}
      >
        {/* TODO : 'Loading Your Quiz' does not stay until quiz has loaded. isQuizLoading is somehow not coming into effect */}
        {isProfileLoading ? (
          <h3>Loading Your Responses</h3>
        ) : !user ? (
          <h3>
            Please <span className="font-normal">sign in</span> to view your
            profile summary
          </h3>
        ) : profileSummary.profileData.length > 0 ? (
          <></>
        ) : (
          <h3>
            No Quizzes Created Yet! Please refresh in case of any discrepancies
          </h3>
        )}
      </div>
      <div className="flex w-full flex-col items-center px-4 mx-auto mt-4 space-y-0 md:flex-row md:items-start md:mt-8 ">
        {!isProfileLoading && user ? (
          <div className="w-full flex flex-col space-y-4 md:h-screen md:overflow-y-scroll lg:px-4 md:w-2/5">
            {profileSummary.profileData.map((quizSummary, i) => {
              return (
                <QuizSummaryCards
                  key={i}
                  quizSummary={quizSummary}
                  domainName={profileSummary.domainName}
                  quizNumber={i}
                  isSelectedToShowResponse={quizSelected === i}
                  setQuizSelected={setQuizSelected}
                />
              );
            })}
          </div>
        ) : (
          <></>
        )}

        {!isProfileLoading && user && profileSummary.profileData.length > 0 ? (
          <div className="hidden w-full mb-12 space-y-3 px-4 md:flex flex-col items-start justify-start md:w-3/5 md:overflow-auto md:h-screen black md:rounded-lg break-normal">
            <div className="relative overflow-scroll md:h-screen md:overflow-scroll w-full">
              <table className="w-full text-sm table-auto lg:table-fixed text-gray-500 dark:text-gray-400 text-center ">
                <thead className="text-xs text-white  border bg-brightRedLight border-brightRed uppercase">
                  <tr>
                    <th scope="col" className="py-3">
                      Participant name
                    </th>
                    {/* <th scope="col" className="py-3">
                  Participant email
                </th> */}
                    <th scope="col" className="py-3">
                      time (in minutes)
                    </th>
                    <th scope="col" className="py-3">
                      score
                    </th>
                    <th scope="col" className="py-3">
                      {`Time of submission (${
                        Intl.DateTimeFormat().resolvedOptions().timeZone
                      })`}
                    </th>
                    <th scope="col" className="text-center">
                      submission
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {profileSummary.profileData[quizSelected] &&
                    profileSummary.profileData[quizSelected].quiz_responses.map(
                      (quizResponse, i) => {
                        return (
                          <TableRow
                            key={i}
                            quizResponse={quizResponse}
                            quizId={profileSummary.profileData[quizSelected].id}
                            quizType={
                              profileSummary.profileData[quizSelected].quiz_type
                            }
                          />
                        );
                      }
                    )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default page;
