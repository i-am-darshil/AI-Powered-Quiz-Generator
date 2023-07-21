import constants from "@utils/constants";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const errorResponse = {
  response: "You need to sign in first",
  responseLink: "",
};

const getScore = (userResponses, questionAndAnswers) => {
  let score = 0;
  for (let i = 0; i < userResponses.length; i++) {
    if (userResponses[i] === questionAndAnswers[i].correctOption) {
      score++;
    }
  }
  return score;
};

export const POST = async (request) => {
  try {
    const requestData = await request.json();

    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase.auth.getSession();
    console.log(`Grading quiz. Session error: ${JSON.stringify(error)}}`);

    let sessionUser;
    if (data.session) {
      sessionUser = data.session.user;
    } else {
      return new Response(
        JSON.stringify({
          ...errorResponse,
          response: `You need to sign in first`,
        }),
        { status: 200 }
      );
    }

    let quizId = requestData.quizId;
    let userResponses = requestData.userResponses;
    let timeToComplete = requestData.timeToComplete;
    let responseId = requestData.responseId;

    console.log(
      `Recieved a quiz grade request for ${JSON.stringify(requestData)}`
    );

    const response = {};

    const quizzesResponse = await supabase
      .from("quizzes")
      .select()
      .eq("id", quizId);

    console.log(`Recieved from quizzes : ${JSON.stringify(quizzesResponse)}`);

    if (quizzesResponse.error) {
      console.error(
        `Error occured while fetching quiz with id : ${params.quizId}. Error is ${quizzesResponse.error}`
      );
      return new Response(
        JSON.stringify({
          ...errorResponse,
          response: "Something went wrong, please retry your submission :(",
        }),
        { status: 200 }
      );
    }

    if (quizzesResponse.data.length == 0) {
      console.warn(
        `Quiz with id : ${params.quizId} does not exist in our database`
      );

      return new Response(
        JSON.stringify({
          ...errorResponse,
          response:
            "We cannot find the specified quiz. Please verify the quiz link with the quiz creator or create a new quiz.",
        }),
        { status: 200 }
      );
    }

    let quizQuestionConfig = quizzesResponse.data[0];
    let quizType = quizQuestionConfig.quiz_type;
    let questionAndAnswers = quizQuestionConfig.questions;
    let score = 0;
    if (
      [
        constants.questionTypeMapping[constants.MCQ_TYPE].type,
        constants.questionTypeMapping[constants.BOOLEAN_TYPE].type,
      ].includes(quizType)
    ) {
      score = getScore(userResponses, questionAndAnswers);
      console.log(
        `Score for for quizId : ${quizId}, responseId : ${responseId} is ${score}`
      );
    }
    response["response"] = "Your response has been recorded successfully.";
    response["responseLink"] = `/responses/${quizId}/${responseId}`;

    const quizResponseUpdate = await supabase
      .from("quiz_responses")
      .update({
        responses: userResponses,
        score: score,
        time_to_submit_in_minutes: timeToComplete,
        has_submitted: true,
      })
      .eq("quiz_id", quizId)
      .eq("id", responseId);
    console.log(
      `Updated responses table for quizId : ${quizId}, responseId : ${responseId}, ${JSON.stringify(
        quizResponseUpdate
      )}`
    );
    if (quizResponseUpdate.error) {
      return new Response(
        JSON.stringify({
          ...errorResponse,
          response: "Something went wrong, please retry your submission :(",
        }),
        { status: 200 }
      );
    }

    const quizAnalytics = await supabase.rpc(
      "update_data_in_quizanalytics_after_submission",
      {
        add_number_of_responses: 1,
        score: score,
        time_to_submit_in_minutes: timeToComplete,
        add_zero_to_fifty_percent:
          score / questionAndAnswers.length <= 0.5 ? 1 : 0,
        add_fifty_to_hundred_percent:
          score / questionAndAnswers.length > 0.5 ? 1 : 0,
        perfect_score: score === questionAndAnswers.length ? 1 : 0,
        quiz_id: quizId,
      }
    );

    console.log(
      `Added to quiz_analytics. quizAnalytics : ${JSON.stringify(
        quizAnalytics
      )}`
    );

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (err) {
    console.error(err);

    return new Response(
      JSON.stringify({
        ...errorResponse,
        response: "Something went wrong, please retry your submission :(",
      }),
      { status: 200 }
    );
  }
};
