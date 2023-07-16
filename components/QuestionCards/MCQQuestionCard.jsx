const MCQQuestionCard = ({ questionNumber, question, submitting }) => {
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
          <div className="flex orange_gradient flex-row font-bold text-sm pr-2 tracking-wide">
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
    </div>
  );
};

export default MCQQuestionCard;
