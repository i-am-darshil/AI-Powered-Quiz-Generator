import constants from "@utils/constants";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const errorResponse = {
  questions: [],
  options: {},
  title: "You need to sign in first",
  questionType: constants.MCQ_TYPE,
  quizFound: false,
  quizFound: false,
  hasAlreadySubmitted: false,
  quizStarted: false,
  responseId: null,
  quizStartedAt: "",
};

export const GET = async (request, { params }) => {
  try {
    const quizQuestionConfig = {
      questions: [],
      options: {},
      title: "",
      questionType: constants.MCQ_TYPE,
      quizFound: false,
      hasAlreadySubmitted: false,
      quizStarted: false,
      responseId: null,
      quizStartedAt: "",
    };

    console.log(`Recieved a Get request for ${params.quizId}`);

    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase.auth.getSession();
    console.log(
      `Getting the quiz questions quiz link. Session Data: ${JSON.stringify(
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
          title: "You need to sign in first",
        }),
        { status: 200 }
      );
    }

    const quizzesResponse = await supabase
      .from("quizzes")
      .select()
      .eq("id", params.quizId);

    console.log(`Recieved from quizzes : ${JSON.stringify(quizzesResponse)}`);

    if (quizzesResponse.error) {
      console.error(
        `Error occured while fetching quiz with id : ${params.quizId}. Error is ${quizzesResponse.error}`
      );
      return new Response(
        JSON.stringify({
          ...errorResponse,
          title: "Something went wrong :(",
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
          title:
            "We cannot find the specified quiz. Please verify the quiz link with the quiz creator or create a new quiz.",
        }),
        { status: 200 }
      );
    }

    let quizQuestions = quizzesResponse.data[0].questions;
    for (let i = 0; i < quizQuestions.length; i++) {
      delete quizQuestions[i].correctOption;
    }
    quizQuestionConfig["questions"] = quizQuestions;
    quizQuestionConfig["options"] = quizzesResponse.data[0].options;
    quizQuestionConfig["title"] = quizzesResponse.data[0].title;
    quizQuestionConfig["questionType"] = quizzesResponse.data[0].quiz_type;
    quizQuestionConfig["quizFound"] = true;

    const quizResponses = await supabase
      .from("quiz_responses")
      .select("id, has_submitted, quiz_started_at")
      .eq("submitter_user_id", sessionUser.id)
      .eq("quiz_id", params.quizId);

    console.log(
      `Recieved from read from quiz_responses : ${JSON.stringify(
        quizResponses
      )}`
    );

    if (quizResponses.error) {
      console.error(error);
      return new Response(
        JSON.stringify({
          ...errorResponse,
          title: "Something went wrong :(",
        }),
        { status: 200 }
      );
    } else if (quizResponses.data.length > 0) {
      if (quizResponses.data[0].has_submitted) {
        quizQuestionConfig["title"] = "Your response is already recorded";
        quizQuestionConfig["hasAlreadySubmitted"] = true;
        return new Response(JSON.stringify(quizQuestionConfig), {
          status: 200,
        });
      } else {
        console.log(
          `Quiz response has already started : ${JSON.stringify(quizResponses)}`
        );
        quizQuestionConfig["quizStarted"] = true;
        quizQuestionConfig["quizStartedAt"] =
          quizResponses.data[0].quiz_started_at;
        quizQuestionConfig["responseId"] = quizResponses.data[0].id;
      }
    } else {
      const quizResponseInsert = await supabase
        .from("quiz_responses")
        .insert({
          submitter_user_id: sessionUser.id,
          quiz_id: params.quizId,
          submitter_name: sessionUser.user_metadata.name,
          submitter_email: sessionUser.user_metadata.email,
          quiz_started_at: new Date().toUTCString(),
        })
        .select("id, quiz_started_at");

      console.log(
        `Recieved from inserting to quiz_responses : ${JSON.stringify(
          quizResponseInsert
        )}`
      );

      if (quizResponseInsert.error) {
        console.error(error);
        return new Response(
          JSON.stringify({
            ...errorResponse,
            title: "Something went wrong :(",
          }),
          { status: 200 }
        );
      }

      quizQuestionConfig["quizStarted"] = true;
      quizQuestionConfig["quizStartedAt"] =
        quizResponseInsert.data[0].quiz_started_at;
      quizQuestionConfig["responseId"] = quizResponseInsert.data[0].id;
    }

    const quizAnalytics = await supabase.rpc(
      "increment_visitors_in_quizanalytics_by_count",
      {
        add_by: 1,
        quiz_id: params.quizId,
      }
    );

    console.log(
      `Added to quiz_analytics. quizAnalytics : ${JSON.stringify(
        quizAnalytics
      )}`
    );

    return new Response(JSON.stringify(quizQuestionConfig), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({
        ...errorResponse,
        title: "Something went wrong :(",
      }),
      { status: 200 }
    );
  }
};
