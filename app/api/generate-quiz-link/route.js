import { createClient } from "@supabase/supabase-js";
import constants from "@utils/constants";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_PUBLIC_KEY;
const options = {
  auth: {
    persistSession: false,
  },
};

const supabase = createClient(supabaseUrl, supabaseKey, options);

export const POST = async (request) => {
  try {
    const requestData = await request.json();

    console.log(
      `Recieved a generate quiz request for ${JSON.stringify(requestData)}`
    );

    const { data, error } = await supabase
      .from("quizzes")
      .insert([
        {
          creator_id: requestData.creatorId,
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

    if (error) {
      console.error(
        `Failed to add quiz of user ${
          requestData.creatorId
        } to database. Error : ${JSON.stringify(error)}`
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
      `Created a database for user ${requestData.creatorId} with Quiz Id : ${data[0].id}`
    );

    const response = {
      quizLink: `${process.env.NEXTAUTH_URL}/join/${data[0].id}`,
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
