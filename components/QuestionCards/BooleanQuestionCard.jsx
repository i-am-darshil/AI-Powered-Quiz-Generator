const BooleanQuestionCard = ({
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

      {["True", "False"].map((option, i) => {
        let char = String.fromCharCode("A".charCodeAt(0) + i);
        return (
          <div
            className="flex orange_gradient flex-row font-bold text-sm pr-2 tracking-wide"
            key={`Q${questionNumber}Option${char}`}
          >
            <input
              type="radio"
              value={char}
              name={`Q${questionNumber}`}
              className="mr-2"
              required={true}
            />
            {submitting ? `Generating your Option ${char}...` : option}
          </div>
        );
      })}

      {showAnswers ? (
        <div>
          <h4 className="mt-2">{`Correct Answer - ${question.correctOption}`}</h4>
          {question.reason ? (
            <h4 className="mt-1 text-sm font-extralight">{`Reason - ${question.reason}`}</h4>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BooleanQuestionCard;
