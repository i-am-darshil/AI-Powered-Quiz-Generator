const { Configuration, OpenAIApi } = require("openai");
import constants from "@utils/constants";
import util from "@utils/util";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const POST = async (request) => {
  const requestData = await request.json();

  console.log(`Recieved request : ${JSON.stringify(requestData)}`);

  let questionType =
    constants.questionTypeMapping[requestData.quizOptions.questionType].type;
  let shape =
    constants.questionTypeMapping[requestData.quizOptions.questionType].shape;
  let numberOfQuestions = requestData.quizOptions.numberOfQuestions;

  let messageToGPT = {
    role: "user",
    content: `generate ${numberOfQuestions} "${questionType}" questions for "Harry Potter" with answers. include wrong answers\nformat the response as JSON in the shape of: ${JSON.stringify(
      shape
    )}
  `,
  };

  console.log("messageToGPT", messageToGPT);

  // const completion = await openai.createChatCompletion({
  //   model: "gpt-3.5-turbo",
  //   messages: [messageToGPT],
  // });

  // const questions = JSON.parse(completion.data.choices[0].message.content);

  const questions = constants.questionTypeMapping.mcq.initialQuestionSet;

  const response = {
    questionType: requestData.quizOptions.questionType,
    questions: util.shuffleArray(questions),
  };

  return new Response(JSON.stringify(response), { status: 200 });
};
