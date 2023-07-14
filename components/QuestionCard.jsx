const QuestionCard = () => {
  return (
    <div className="black w-full bg-white border border-gray-200 px-4 rounded-lg break-normal">
      <div className="flex w-full flex-col items-start my-4 lg:mx-4">
        <h4 className="black font-bold">
          1. What is the main goal of artificial intelligence (AI)?
        </h4>
        <div className="flex orange_gradient flex-row font-bold text-sm">
          <input type="radio" value="A" name="optionA" className="mr-2" />
          To create machines capable of reasoning and learning
        </div>
        <div className="flex orange_gradient flex-row font-bold text-sm">
          <input type="radio" value="A" name="optionA" className="mr-2" />
          To develop algorithms for autonomous cars
        </div>
        <div className="flex orange_gradient flex-row font-bold text-sm">
          <input type="radio" value="A" name="optionA" className="mr-2" />
          To revolutionize the healthcare industry
        </div>
        <div className="flex orange_gradient flex-row font-bold text-sm">
          <input type="radio" value="A" name="optionA" className="mr-2" />
          To automate manufacturing processes
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
