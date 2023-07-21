const ShortAnswerQuestionCard = ({
  questionNumber,
  question,
  submitting,
  showAnswers,
  userChoice,
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
          rows={"3"}
          name={`Q${questionNumber}`}
          placeholder={
            userChoice ? userChoice : "Describe your answer in short"
          }
          className="mr-2 w-full font-normal black p-2"
          required={true}
          disabled={userChoice}
        />
      </div>
      {/* {userChoice ? (
        <div>
          <h4 className="mt-2">Response</h4>
          <h5 className="font-extralight text-sm">{userChoice}</h5>
        </div>
      ) : (
        <></>
      )} */}
      {showAnswers ? (
        <div>
          <h4 className="mt-2">Possible Answer</h4>
          <h5 className="font-extralight text-sm">{question.answer}</h5>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ShortAnswerQuestionCard;
