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

const questionTypeMapping = {
  mcq: {
    type: "Multiple Choice Question",
    initialQuestionSet: initialQuestionSetForMCQ,
    shape: initialQuestionSetForMCQ[1],
  },
  boolean: {
    type: "True or False",
    initialQuestionSet: initialQuestionSetForTrueFalse,
    shape: initialQuestionSetForTrueFalse[1],
  },
  short_answer: "Short Answer",
  fill_in_blank: "Fill in the blanks",
};

export default {
  questionTypeMapping,
};
