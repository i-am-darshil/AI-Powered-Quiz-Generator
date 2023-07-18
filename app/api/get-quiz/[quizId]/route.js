import { createClient } from "@supabase/supabase-js";
import constants from "@utils/constants";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const options = {
  auth: {
    persistSession: false,
  },
};

const supabase = createClient(supabaseUrl, supabaseKey, options);

export const GET = async (request, { params }) => {
  console.log(`Recieved a Get request for ${params.quizId}`);

  const { data, error } = await supabase
    .from("quizzes")
    .select()
    .eq("id", params.quizId);

  if (error) {
    console.error(
      `Error occured while fetching quiz with id : ${params.quizId}. Error is ${error}`
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

  console.log(`Recieved from DB ${JSON.stringify(data)}`);
  if (data.length == 0) {
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
    questions: data[0].questions,
    options: data[0].options,
    title: data[0].title,
    questionType: data[0].quiz_type,
    quizFound: true,
  };

  return new Response(JSON.stringify(response), { status: 200 });
};
