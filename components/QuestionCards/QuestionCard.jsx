import MCQQuestionCard from "@components/QuestionCards/MCQQuestionCard";
import BooleanQuestionCard from "@components/QuestionCards/BooleanQuestionCard";
import ShortAnswerQuestionCard from "@components/QuestionCards/ShortAnswerQuestionCard";
import FillInTheBlankCard from "@components/QuestionCards/FillInTheBlankCard";
import constants from "@utils/constants";

const QuestionCard = ({
  questionNumber,
  question,
  questionType,
  submitting,
  showAnswers,
}) => {
  return (
    <div className="black w-full bg-white border border-gray-200 px-4 rounded-lg break-normal">
      {questionType ==
      constants.questionTypeMapping[constants.MCQ_TYPE].type ? (
        <MCQQuestionCard
          questionNumber={questionNumber}
          question={question}
          submitting={submitting}
          key={questionNumber}
          showAnswers={showAnswers}
        />
      ) : questionType ==
        constants.questionTypeMapping[constants.BOOLEAN_TYPE].type ? (
        <BooleanQuestionCard
          questionNumber={questionNumber}
          question={question}
          submitting={submitting}
          key={questionNumber}
          showAnswers={showAnswers}
        />
      ) : questionType ==
        constants.questionTypeMapping[constants.SHORT_ANSWER_TYPE].type ? (
        <ShortAnswerQuestionCard
          questionNumber={questionNumber}
          question={question}
          submitting={submitting}
          key={questionNumber}
          showAnswers={showAnswers}
        />
      ) : (
        <FillInTheBlankCard
          questionNumber={questionNumber}
          question={question}
          submitting={submitting}
          key={questionNumber}
          showAnswers={showAnswers}
        />
      )}
    </div>
  );
};

export default QuestionCard;
