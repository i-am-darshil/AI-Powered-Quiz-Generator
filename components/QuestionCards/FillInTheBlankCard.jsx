const FillInTheBlankCard = ({
  questionNumber,
  question,
  submitting,
  showAnswers,
}) => {
  return (
    <div className="flex w-full flex-col items-start my-4 lg:mx-4">
      <h4 className="orange_gradient font-bold">
        {submitting
          ? "Generating your Question..."
          : `${questionNumber + 1}) ${question.question}`}
      </h4>
      <div className="flex black flex-row font-bold text-sm w-full pr-2">
        <textarea
          rows={"2"}
          name={`Q${questionNumber}Answer`}
          placeholder="Fill in the blank"
          className="mr-2 w-full font-normal black py-2"
        />
      </div>
      {showAnswers ? (
        <h4 className="mt-2">{`Correct Answer - ${question.answer}`}</h4>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FillInTheBlankCard;
