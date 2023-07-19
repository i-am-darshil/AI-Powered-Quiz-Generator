import constants from "@utils/constants";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const GET = async (request, { params }) => {
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
        questions: [],
        options: {},
        title: `You need to sign in first`,
        questionType: constants.MCQ_TYPE,
        quizFound: false,
      }),
      { status: 200 }
    );
  }

  const supabaseResponse = await supabase
    .from("quizzes")
    .select()
    .eq("id", params.quizId);

  if (supabaseResponse.error) {
    console.error(
      `Error occured while fetching quiz with id : ${params.quizId}. Error is ${supabaseResponse.error}`
    );
    return new Response(
      JSON.stringify({
        questions: [],
        options: {},
        title: `Something went wrong :(`,
        questionType: constants.MCQ_TYPE,
        quizFound: false,
      }),
      { status: 200 }
    );
  }

  console.log(`Recieved from DB ${JSON.stringify(supabaseResponse.data)}`);
  if (supabaseResponse.data.length == 0) {
    console.warn(
      `Quiz with id : ${params.quizId} does not exist in our database`
    );

    return new Response(
      JSON.stringify({
        questions: [],
        options: {},
        title: `We cannot find the specified quiz. Please verify the quiz link with the quiz creator or create a new quiz`,
        questionType: constants.MCQ_TYPE,
        quizFound: false,
      }),
      { status: 200 }
    );
  }

  const response = {
    questions: supabaseResponse.data[0].questions,
    options: supabaseResponse.data[0].options,
    title: supabaseResponse.data[0].title,
    questionType: supabaseResponse.data[0].quiz_type,
    quizFound: true,
  };

  return new Response(JSON.stringify(response), { status: 200 });
};
