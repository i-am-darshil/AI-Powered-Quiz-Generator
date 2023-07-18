// import { createClient } from "@supabase/supabase-js";
import constants from "@utils/constants";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// const options = {
//   auth: {
//     persistSession: false,
//   },
// };

// const supabase = createClient(supabaseUrl, supabaseKey, options);

export const POST = async (request) => {
  try {
    const requestData = await request.json();

    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase.auth.getSession();
    console.log(
      `Generating quiz link. Session Data: ${JSON.stringify(
        data
      )} error: ${JSON.stringify(error)}}`
    );

    let sessionUser;
    if (data.session) {
      const sessionUser = data.session.user;
    } else {
      return new Response(
        JSON.stringify({
          quizLink: `You need to sign in first`,
          allowRetry: requestData.allowRetry,
          autoGrade: requestData.autoGrade,
        }),
        { status: 200 }
      );
    }

    console.log(
      `Recieved a generate quiz request for ${JSON.stringify(requestData)}`
    );

    // const { data, error } = await supabase
    const supabaseResponse = await supabase
      .from("quizzes")
      .insert([
        {
          creator_id: sessionUser.id,
          questions: requestData.questions,
          title: requestData.quizTitle,
          options: {
            allowRetry: requestData.allowRetry,
            autoGrade: requestData.autoGrade,
          },
          quiz_type: requestData.quizType,
        },
      ])
      .select("id");

    if (supabaseResponse.error) {
      console.error(
        `Failed to add quiz of user ${
          sessionUser.id
        } to database. Error : ${JSON.stringify(supabaseResponse.error)}`
      );

      return new Response(
        JSON.stringify({
          quizLink: `Something went wrong :(`,
          allowRetry: requestData.allowRetry,
          autoGrade: requestData.autoGrade,
        }),
        { status: 200 }
      );
    }

    console.log(
      `Created a database for user ${sessionUser.id} with Quiz Id : ${supabaseResponse.data[0].id}`
    );

    const response = {
      quizLink: `${process.env.SITE_URL}/join/${supabaseResponse.data[0].id}`,
      allowRetry: requestData.allowRetry,
      autoGrade: requestData.autoGrade,
    };

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (err) {
    console.error(error);

    return new Response(
      JSON.stringify({
        quizLink: `Something went wrong :(`,
        allowRetry: requestData.allowRetry,
        autoGrade: requestData.autoGrade,
      }),
      { status: 200 }
    );
  }
};
