import QuestionCard from "./QuestionCard";
import QuizOptions from "./QuizOptions";

const Playground = () => {
  return (
    <section>
      <h1 className="text-center mt-8 text-3xl font-thin md:text-4xl md:mt-16">
        - LET'S TRY IT OUT -
      </h1>
      <div className="container flex w-full flex-col items-center px-6 mx-auto mt-4 space-y-0 lg:flex-row lg:items-start lg:mt-8">
        <div className="w-full flex flex-col lg:mr-8 lg:w-1/2">
          {/* Left Input Text Box */}
          <QuizOptions />
        </div>

        {/* Right box with  */}
        <div className="w-full mb-12 space-y-3 flex flex-col items-start justify-start overflow-auto lg:w-1/2">
          <QuestionCard key={1} />
          <QuestionCard key={2} />
          <QuestionCard key={3} />
          <QuestionCard key={4} />
        </div>
      </div>
    </section>
  );
};

export default Playground;
