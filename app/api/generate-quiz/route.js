const { Configuration, OpenAIApi } = require("openai");
import constants from "@utils/constants";
import util from "@utils/util";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const POST = async (request) => {
  try {
    const requestData = await request.json();

    console.log(`Recieved request : ${JSON.stringify(requestData)}`);

    let questionType =
      constants.questionTypeMapping[requestData.quizOptions.questionType].type;
    let shape =
      constants.questionTypeMapping[requestData.quizOptions.questionType].shape;
    let numberOfQuestions = requestData.quizOptions.numberOfQuestions;
    let difficultyMode = requestData.quizOptions.difficulty;
    let language = requestData.quizOptions.language;

    let prompt =
      constants.questionTypeMapping[requestData.quizOptions.questionType]
        .promptForTopic;

    // ---- START OF MOCKING GPT CALLS ----
    const mockQuestions =
      constants.questionTypeMapping[requestData.quizOptions.questionType]
        .initialQuestionSet;

    const mockTopic = "Harry Potter";
    // ---- END OF MOCKING GPT CALLS ----

    prompt = prompt.replace("###numberOfQuestions###", numberOfQuestions);
    prompt = prompt.replace("###questionType###", questionType);
    prompt = prompt.replace("###topic###", mockTopic);
    prompt = prompt.replace("###language###", language);
    prompt = prompt.replace(
      "###difficultyPrompt###",
      constants.difficultyPrompt[difficultyMode]
    );

    let messageToGPT = {
      role: "user",
      content: prompt,
    };

    console.log("messageToGPT", messageToGPT);

    // const completion = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages: [messageToGPT],
    // });

    // console.log("completion", completion.data.choices[0].message);

    // const questions = JSON.parse(
    //   completion.data.choices[0].message.content
    // ).response;

    // console.log("completion json parse", questions);

    // A sample response
    // {
    //   response: [
    //     {
    //       question: 'In Harry Potter, the beloved owl that delivers mail to Harry is named _____________.',
    //       answer: 'Hedwig'
    //     },
    //     {
    //       question: 'The Hogwarts School of Witchcraft and Wizardry is located in ____________.',
    //       answer: 'Scotland'
    //     }
    //   ]
    // }

    const response = {
      questionType: questionType,
      questions: util.shuffleArray(mockQuestions),
    };

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error(error);
    const errorResponse = {
      questionType: constants.MCQ_TYPE,
      questions: [constants.errorEquestion],
    };
    return new Response(JSON.stringify(errorResponse), { status: 200 });
  }
};
