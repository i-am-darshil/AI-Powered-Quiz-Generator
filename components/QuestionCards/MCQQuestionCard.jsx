const MCQQuestionCard = ({ questionNumber, question, submitting }) => {
  return (
    <div className="flex w-full flex-col items-start my-4 lg:mx-4">
      <h4 className="black font-bold">
        {submitting
          ? "Generating your Question..."
          : `${questionNumber + 1} ${question.question}`}
      </h4>
      <div className="flex orange_gradient flex-row font-bold text-sm pr-2">
        <input type="radio" value="A" name="optionA" className="mr-2" />
        {submitting ? "Generating your Option A..." : question.allOptions[0]}
      </div>
      <div className="flex orange_gradient flex-row font-bold text-sm pr-2">
        <input type="radio" value="B" name="optionA" className="mr-2" />
        {submitting ? "Generating your Option B..." : question.allOptions[1]}
      </div>
      <div className="flex orange_gradient flex-row font-bold text-sm pr-2">
        <input type="radio" value="C" name="optionA" className="mr-2" />
        {submitting ? "Generating your Option C..." : question.allOptions[2]}
      </div>
      <div className="flex orange_gradient flex-row font-bold text-sm pr-2">
        <input type="radio" value="D" name="optionA" className="mr-2" />
        {submitting ? "Generating your Option D..." : question.allOptions[3]}
      </div>
    </div>
  );
};

export default MCQQuestionCard;
