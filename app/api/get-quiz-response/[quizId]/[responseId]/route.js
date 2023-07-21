import constants from "@utils/constants";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const errorResponse = {
  title: "",
  error: "",
  questionsWithAnswers: [],
  userChoices: [],
  score: 0,
  timeToCompleteInMinutes: 0,
  quizType: "",
  isAllowed: false,
};

export const GET = async (request, { params }) => {
  try {
    const quizResponse = {
      title: "",
      error: "",
      questionsWithAnswers: [],
      userChoices: [],
      score: 0,
      timeToCompleteInMinutes: 0,
      quizType: "",
      isAllowed: false,
    };

    const quizId = params.quizId;
    const responseId = params.responseId;

    console.log(`Recieved a Get response request for ${quizId}/${responseId}`);

    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase.auth.getSession();
    console.log(
      `Getting the quiz response. Session Data: ${JSON.stringify(
        data
      )} error: ${JSON.stringify(error)}}`
    );

    let sessionUser;
    if (data.session) {
      sessionUser = data.session.user;
    } else {
      return new Response(
        JSON.stringify({
          ...errorResponse,
          error: "You need to sign in first",
        }),
        { status: 200 }
      );
    }

    // https://stackoverflow.com/questions/69137919/filtering-in-join-in-supabase
    const quizInfoAndResponse = await supabase
      .from("quizzes")
      .select("*, quiz_responses!inner(*)")
      .eq("id", quizId)
      .eq("quiz_responses.id", responseId)
      .eq("quiz_responses.has_submitted", true);

    console.log(
      `Recieved from read from quiz_responses : ${JSON.stringify(
        quizInfoAndResponse
      )}`
    );

    if (quizInfoAndResponse.error) {
      console.error(error);
      return new Response(
        JSON.stringify({
          ...errorResponse,
          error: "Something went wrong :(",
        }),
        { status: 200 }
      );
    }

    if (quizInfoAndResponse.data.length == 0) {
      return new Response(
        JSON.stringify({
          ...errorResponse,
          error: "Your response does not exist for this quiz.",
        }),
        { status: 200 }
      );
    }

    const quizInfoAndResponseData = quizInfoAndResponse.data[0];

    if (
      quizInfoAndResponseData.creator_id != sessionUser.id &&
      quizInfoAndResponseData.quiz_responses[0].submitter_user_id !=
        sessionUser.id
    ) {
      return new Response(
        JSON.stringify({
          ...errorResponse,
          error:
            "Only quiz creator and response submitter have access to view their quiz response.",
        }),
        { status: 200 }
      );
    }

    quizResponse["error"] = "";
    quizResponse["isAllowed"] = true;
    quizResponse["title"] = quizInfoAndResponseData.title;
    quizResponse["questionsWithAnswers"] = quizInfoAndResponseData.questions;
    quizResponse["quizType"] = quizInfoAndResponseData.quiz_type;
    quizResponse["userChoices"] =
      quizInfoAndResponseData.quiz_responses[0].responses;
    quizResponse["score"] = quizInfoAndResponseData.quiz_responses[0].score;
    quizResponse["timeToCompleteInMinutes"] =
      quizInfoAndResponseData.quiz_responses[0].time_to_submit_in_minutes;

    return new Response(JSON.stringify(quizResponse), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({
        ...errorResponse,
        error: "Something went wrong :(",
      }),
      { status: 200 }
    );
  }
};
