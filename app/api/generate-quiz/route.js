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
    let quizInputType = requestData.quizInput.type;
    let quizInputValue = requestData.quizOptions.quizInputValue;

    let quizInputPrompt = constants.inputTypePrompt[quizInputType].replace(
      "###inputValue###",
      quizInputValue
    );

    let prompt =
      constants.questionTypeMapping[requestData.quizOptions.questionType]
        .promptForTopic;

    // ---- START OF MOCKING GPT CALLS ----
    const mockQuestions =
      constants.questionTypeMapping[requestData.quizOptions.questionType]
        .initialQuestionSet;
    // ---- END OF MOCKING GPT CALLS ----

    prompt = prompt.replace("###numberOfQuestions###", numberOfQuestions);
    prompt = prompt.replace("###questionType###", questionType);
    prompt = prompt.replace("###language###", language);
    prompt = prompt.replace(
      "###difficultyPrompt###",
      constants.difficultyPrompt[difficultyMode]
    );
    prompt = prompt.replace("###inputTypePrompt###", quizInputPrompt);

    let messageToGPT = {
      role: "user",
      content: prompt,
    };

    console.log("messageToGPT", messageToGPT);

    // ---- START OF ACTUAL GPT CALLS ----
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [messageToGPT],
    });

    console.log("completion", completion.data.choices[0].message);

    const questions = JSON.parse(
      completion.data.choices[0].message.content
    ).response;

    console.log("completion json parse", questions);

    const response = {
      questionType: questionType,
      questions: util.shuffleArray(questions),
    };
    // ---- END OF ACTUAL GPT CALLS ----

    // ---- START OF MOCKED GPT RESPONSE ----
    // const response = {
    //   questionType: questionType,
    //   questions: util.shuffleArray(mockQuestions),
    // };
    // ---- END OF MOCKED GPT RESPONSE ----

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
