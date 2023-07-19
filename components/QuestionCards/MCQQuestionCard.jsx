const MCQQuestionCard = ({
  questionNumber,
  question,
  submitting,
  showAnswers,
}) => {
  return (
    <div className="flex w-full flex-col items-start my-4 lg:mx-4">
      <h4 className="black font-bold">
        {submitting
          ? "Generating your Question..."
          : `${questionNumber + 1}) ${question.question}`}
      </h4>

      {question.allOptions.map((option, i) => {
        let char = String.fromCharCode("A".charCodeAt(0) + i);
        return (
          <div
            className="flex orange_gradient flex-row font-bold text-sm pr-2 tracking-wide"
            key={`Q${questionNumber}Option${char}`}
          >
            <input
              type="radio"
              value={char}
              name={`Q${questionNumber}Option${char}`}
              className="mr-2"
            />
            {submitting ? `Generating your Option ${char}...` : option}
          </div>
        );
      })}

      {showAnswers ? (
        <h4 className="mt-4">{`Correct Answer - ${question.correctOption}`}</h4>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MCQQuestionCard;
