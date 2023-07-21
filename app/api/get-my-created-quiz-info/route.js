import constants from "@utils/constants";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const errorResponse = {
  profileData: [],
  error: "",
  domainName: process.env.SITE_URL,
};

export const GET = async (request, { params }) => {
  try {
    const profileResponse = {
      profileData: [],
      error: "",
      domainName: process.env.SITE_URL,
    };

    console.log(`Recieved a profile view request`);

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
      .select(
        "id, created_at, creator_id, title, options, quiz_type, number_of_questions, quiz_responses!inner(id, submitter_name, score, time_to_submit_in_minutes, quiz_started_at), quiz_analytics!inner(number_of_responses, number_of_visitors, total_score, total_time_to_complete_in_minutes, zero_to_fifty_percent, fifty_to_hundred_percent, total_perfect_scores)"
      )
      .eq("creator_id", sessionUser.id)
      .eq("quiz_responses.has_submitted", true);

    console.log(
      `Recieved from read from quizzes, quiz_responses, quiz_analytics : ${JSON.stringify(
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
          error: "No quizzes created yet. Why don't you give it a try!",
        }),
        { status: 200 }
      );
    }

    profileResponse["profileData"] = quizInfoAndResponse.data;

    return new Response(JSON.stringify(profileResponse), { status: 200 });
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
