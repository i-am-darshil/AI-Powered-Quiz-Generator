const EASY_DIFFICULTY = "easy";
const MEDIUM_DIFFICULTY = "medium";
const HARD_DIFFICULTY = "hard";
const MIXBAG_DIFFICULTY = "mixbag";

const MCQ_TYPE = "mcq";
const BOOLEAN_TYPE = "boolean";
const SHORT_ANSWER_TYPE = "shortAnswer";
const FILL_IN_THE_BLANKS_TYPE = "fillInTheblanks";

const TEXT_QUIZ_INPUT = "text";
const TOPIC_QUIZ_INPUT = "topic";
const WEBSITE_QUIZ_INPUT = "website";

const WIHTOUT_SIGNED_INT_USER_DEFAULT_PROPS = {
  numberOfQuestions: 4,
};

let initialQuestionSetForMCQ = [
  {
    question: "What is the main goal of artificial intelligence (AI)?",
    correctOption: "A",
    allOptions: [
      "To create machines capable of reasoning and learning",
      "To develop algorithms for autonomous cars",
      "To revolutionize the healthcare industry",
      "To automate manufacturing processes",
    ],
  },
  {
    question:
      "Why is it crucial to ensure AI remains unbiased and transparent?",
    correctOption: "C",
    allOptions: [
      "To make AI more expensive and exclusive",
      "To create a mysterious aura around AI",
      "To prevent unintended consequences and potential harm",
      "To make AI more difficult to understand for humans",
    ],
  },
  {
    question: "What responsibility comes with the power of AI?",
    correctOption: "A",
    allOptions: [
      "Ensuring AI remains unbiased, transparent, and aligned with human values",
      "Restricting AI development to a small group of experts",
      "Making AI unpredictable and chaotic",
      "Giving AI complete autonomy and control over human decisions",
    ],
  },
  {
    question: "How does AI learn from vast amounts of data?",
    correctOption: "D",
    allOptions: [
      "By directly downloading information from the internet",
      "By inputting data manually through a user interface",
      "By relying on human programmers to provide it with knowledge",
      "By using algorithms to analyze and process data autonomously",
    ],
  },
];

let initialQuestionSetForTrueFalse = [
  {
    question:
      "True or False: Human ingenuity and machine intelligence will never coexist.",
    correctOption: "False",
    reason:
      "Human ingenuity and machine intelligence will coexist in an unprecedented dance of progress and innovation.",
  },
  {
    question:
      "True or False: AI should be developed to act unpredictably and without human values.",
    correctOption: "False",
    reason:
      "AI should be aligned with human values to prevent unintended consequences.",
  },
  {
    question:
      "True or False: Machine learning is a technology that requires constant human programming and cannot teach itself.",
    correctOption: "False",
    reason:
      "Machine learning allows computers to teach themselves from vast amounts of data.",
  },
  {
    question:
      "True or False: Ensuring AI remains unbiased, transparent, and aligned with human values is crucial to prevent unintended consequences.",
    correctOption: "True",
    reason: "",
  },
];

let initialQuestionSetForShortAnswer = [
  {
    question: "What is Artificial Intelligence (AI)?",
    answer:
      "Artificial Intelligence (AI) is a branch of computer science that focuses on creating machines and systems that can perform tasks that would typically require human intelligence. These tasks include learning from experience, reasoning, problem-solving, understanding natural language, and even exhibiting creativity.",
  },
  {
    question: "What is the role of machine learning in AI?",
    answer:
      "Machine learning is a subset of Artificial Intelligence that enables machines to learn from vast amounts of data without being explicitly programmed. Instead of following predefined instructions, machine learning algorithms use statistical techniques to identify patterns, make predictions, and improve their performance over time based on the data they process.",
  },
  {
    question:
      "What are some real-world applications of Artificial Intelligence?",
    answer:
      "AI has numerous real-world applications across various industries. Some examples include virtual assistants like Siri and Alexa, recommendation systems used by streaming services and e-commerce platforms, self-driving cars, fraud detection in finance, medical image analysis in healthcare, and natural language processing applications for customer service.",
  },
  {
    question:
      "Why is it important to ensure AI remains unbiased and transparent?",
    answer:
      "Ensuring AI remains unbiased and transparent is crucial to prevent unintended consequences and potential harm. AI systems can inherit and amplify human biases present in the data they are trained on, leading to discriminatory outcomes. Transparency allows users and developers to understand how AI arrives at decisions, making it easier to identify and correct any biases or errors in the system.",
  },
];

let initialQuestionSetForFillInTheBlanks = [
  {
    question:
      "Machine learning is a subset of ____________ Intelligence that enables machines to learn from vast amounts of data without being explicitly programmed.",
    answer: "Artificial",
  },
  {
    question:
      "__________ is a branch of computer science that focuses on creating machines and systems that can perform tasks that would typically require human intelligence.",
    answer: "Artificial Intelligence",
  },
  {
    question:
      "Transparency allows users and developers to understand how AI arrives at decisions, making it easier to identify and correct any ____________ or errors in the system.",
    answer: "biases",
  },
  {
    question:
      "AI systems can inherit and amplify human ____________ present in the data they are trained on, leading to discriminatory outcomes.",
    answer: "biases",
  },
];

const errorEquestion = {
  question:
    "Something went wrong :(\nWe have been notified and are currently working on it",
  correctOption: "",
  allOptions: [],
  reason: "",
  answer: "",
};

const difficultyPrompt = {};

difficultyPrompt[EASY_DIFFICULTY] = "Set mode of difficulty to 'easy'";
difficultyPrompt[MEDIUM_DIFFICULTY] = "Set mode of difficulty to 'medium'";
difficultyPrompt[HARD_DIFFICULTY] = "Set mode of difficulty to 'hard'";
difficultyPrompt[MIXBAG_DIFFICULTY] =
  "It's essential to strike a balance in question difficulty to provide a fair and effective assessment. Too many difficult questions can frustrate participants, while too many easy questions may not effectively measure their knowledge and skills";

const inputTypePrompt = {};
inputTypePrompt[TEXT_QUIZ_INPUT] =
  "Make the quiz based on the following text\n'###inputValue###'\n";
inputTypePrompt[TOPIC_QUIZ_INPUT] =
  "Make the quiz based on the following topics\n'###inputValue###'\n";
inputTypePrompt[WEBSITE_QUIZ_INPUT] =
  "Make the quiz based on the following website\n'###inputValue###'\n";

const questionTypeMapping = {};

questionTypeMapping[MCQ_TYPE] = {
  type: "Multiple Choice Question",
  initialQuestionSet: initialQuestionSetForMCQ,
  shape: [initialQuestionSetForMCQ[0], initialQuestionSetForMCQ[1]],
  promptForTopic: `Generate only "###numberOfQuestions###" "###questionType###" questions with answers. Include wrong answers as well.\n###inputTypePrompt###\nDefine difficulty by "Distractors", "Ambiguity and Misleading Choices", "Specificity of Answer", "Context and Background" and "Use of Terminology". ###difficultyPrompt### .\nGenerate the quiz in "###language###" language.\nFormat the response as "JSON (JavaScript Object Notation)" only as an "array of response" and only in the shape of: ${JSON.stringify(
    {
      response: [initialQuestionSetForMCQ[0]],
    }
  )}\nMake sure the correct answers only include "A", "B", "C", "D" which are the denote the options.
\nDo NOT include any other information like note, warning, etc. in the response. Make sure the response is JSON parseable and in the language specified.`,
};
questionTypeMapping[BOOLEAN_TYPE] = {
  type: "True or False",
  initialQuestionSet: initialQuestionSetForTrueFalse,
  shape: [initialQuestionSetForTrueFalse[0], initialQuestionSetForTrueFalse[1]],
  promptForTopic: `Generate only "###numberOfQuestions###" "###questionType###" questions with answers and their reasons. Include mix of True and False answers.\n###inputTypePrompt###\nDefine difficulty by "Specificity of Answer", "Context and Background" and "Use of Terminology". ###difficultyPrompt###.\nGenerate the quiz in "###language###" language. \nFormat the response as "JSON (JavaScript Object Notation)" only as an "array of response" in the shape of: ${JSON.stringify(
    {
      response: [initialQuestionSetForTrueFalse[0]],
    }
  )}
  \nDo NOT include any other information like note, warning, etc. in the response. Make sure the response is JSON parseable and in the language specified`,
};
questionTypeMapping[SHORT_ANSWER_TYPE] = {
  type: "Short Answer",
  initialQuestionSet: initialQuestionSetForShortAnswer,
  shape: [
    initialQuestionSetForShortAnswer[0],
    initialQuestionSetForShortAnswer[1],
  ],
  promptForTopic: `Generate only "###numberOfQuestions###" "###questionType###" questions with descriptive answers.\n###inputTypePrompt###\nDefine difficulty by "Specificity of Answer", "Context and Background" and "Use of Terminology". ###difficultyPrompt### .\nGenerate the quiz in "###language###" language. \nFormat the response as "JSON (JavaScript Object Notation)" only as an "array of response" in the shape of: ${JSON.stringify(
    {
      response: [initialQuestionSetForShortAnswer[0]],
    }
  )}
  \nDo NOT include any other information like note, warning, etc. in the response. Make sure the response is JSON parseable and in the language specified.`,
};
questionTypeMapping[FILL_IN_THE_BLANKS_TYPE] = {
  type: "Fill in the blanks",
  initialQuestionSet: initialQuestionSetForFillInTheBlanks,
  shape: [
    initialQuestionSetForFillInTheBlanks[0],
    initialQuestionSetForFillInTheBlanks[1],
  ],
  promptForTopic: `Generate only "###numberOfQuestions###" "###questionType###" questions with answers.\n###inputTypePrompt###\nDefine difficulty by "Specificity of Answer", "Context and Background" and "Use of Terminology". ###difficultyPrompt### .\nGenerate the quiz in "###language###" language. \nFormat the response as "JSON (JavaScript Object Notation)" only as an "array of response" in the shape of: ${JSON.stringify(
    {
      response: [initialQuestionSetForFillInTheBlanks[0]],
    }
  )}
  \nDo NOT include any other information like note, warning, etc. in the response. Make sure the response is JSON parseable and in the language specified`,
};

const QUIZZES_TO_GRADE = [
  questionTypeMapping[MCQ_TYPE].type,
  questionTypeMapping[BOOLEAN_TYPE].type,
];

export default {
  questionTypeMapping,
  difficultyPrompt,
  inputTypePrompt,
  errorEquestion,
  EASY_DIFFICULTY,
  MEDIUM_DIFFICULTY,
  HARD_DIFFICULTY,
  MIXBAG_DIFFICULTY,
  MCQ_TYPE,
  BOOLEAN_TYPE,
  SHORT_ANSWER_TYPE,
  FILL_IN_THE_BLANKS_TYPE,
  TEXT_QUIZ_INPUT,
  TOPIC_QUIZ_INPUT,
  WEBSITE_QUIZ_INPUT,
  WIHTOUT_SIGNED_INT_USER_DEFAULT_PROPS,
  QUIZZES_TO_GRADE,
};

/*
Judging the difficulty of questions, especially in educational or assessment settings, is important to ensure that the questions appropriately challenge the participants without being too easy or too difficult. Here are some factors to consider when judging the difficulty of questions:

Complexity of Concepts: Assess the complexity and depth of the concepts covered in the question. Questions that require a deeper understanding of the topic are generally more difficult.

Cognitive Load: Consider the amount of mental effort required to answer the question. Questions with multiple steps or requiring critical thinking are usually more challenging.

Specificity of Answer: Evaluate if the answer can be easily guessed or requires specific knowledge. Questions with narrow and precise answers tend to be more difficult.

Context and Background: Consider the participants' background and familiarity with the topic. Questions that are contextually relevant to the participants' knowledge level are more suitable.

Ambiguity and Misleading Choices: Avoid questions with unclear wording or misleading answer choices. Such questions can make the assessment unfair and difficult to interpret.

Distractors: Check the presence of plausible incorrect options (distractors). High-quality questions have plausible distractors that require careful consideration.

Use of Terminology: Assess the complexity of the language and terminology used in the question. Questions with advanced language may increase the difficulty level.

Time Limit: Take into account the time allocated for participants to answer the questions. Questions that require significant computation or analysis may be more challenging within time constraints.

Cognitive Levels: Consider Bloom's Taxonomy or other cognitive levels to ensure a mix of knowledge-based, application-based, and evaluation-based questions.

Pilot Testing: Before using questions in a formal assessment, pilot test them with a sample of participants to gauge their difficulty level and identify any issues.

It's essential to strike a balance in question difficulty to provide a fair and effective assessment. Too many difficult questions can frustrate participants, while too many easy questions may not effectively measure their knowledge and skills. Adjusting the difficulty level based on the target audience and purpose of the assessment is crucial.
*/
