import Link from "next/link";
import constants from "@utils/constants";

const TableRow = ({ quizResponse, quizId, quizType }) => {
  return (
    <tr className="border-brightRedLight text-black border-b border-x capitalize">
      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap came">
        {quizResponse.submitter_name}
      </th>
      {/* <td className="px-6 py-4 lowercase">darshil@somaiya.edu</td> */}
      <td className="px-6 py-4">{quizResponse.time_to_submit_in_minutes}</td>
      <td className="px-6 py-4">
        {constants.QUIZZES_TO_GRADE.includes(quizType)
          ? quizResponse.score
          : "NA"}
      </td>
      <td className="px-6 py-4">
        {new Date(quizResponse.quiz_started_at).toLocaleString()}
      </td>
      <td className="px-6 py-4 text-center">
        <Link
          className="text-brightRedLight hover:cursor-pointer hover:border-black  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-1 text-center inline-flex items-center"
          href={`/responses/${quizId}/${quizResponse.id}`}
        >
          <svg
            className="w-6 h-6 text-brightRedLight hover:text-brightRed"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 18"
          >
            <path d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z" />
            <path d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z" />
          </svg>
          <span className="sr-only">Icon description</span>
        </Link>
      </td>
    </tr>
  );
};

export default TableRow;
