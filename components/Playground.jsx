const Playground = () => {
  return (
    <section>
      <div className="container flex w-full flex-col items-center px-6 mx-auto mt-20 space-y-0 lg:flex-row lg:items-start">
        {/* Left Input Text Box */}
        <div className="mb-12 space-y-3 w-full lg:w-1/2 lg:mr-12 flex flex-col items-center">
          <h1 className="max-w-lg font-light text-center">
            Enter the text you wish to generate the quiz
          </h1>
          <textarea
            id="quiz-text"
            rows="18"
            className="block p-2.5 w-full text-sm text-gray-900 black rounded-lg border border-brightRedLight"
            placeholder="Artificial intelligence (AI) is the technological wizardry that brings science fiction to life. Imagine a world where machines not only crunch numbers but also possess the ability to learn, reason, and even exhibit creativity. From autonomous cars navigating busy city streets to chatbots engaging in human-like conversations, AI is transforming our reality. This cutting-edge field encompasses mind-boggling technologies like machine learning, where computers teach themselves from vast amounts of data, and computer vision, enabling machines to see and understand the world around them. Whether it's the breathtaking capabilities of AI-powered robots or the mind-bending applications in healthcare, finance, and gaming, the potential of AI seems limitless. However, with great power comes great responsibility. Ensuring that AI remains unbiased, transparent, and aligned with human values is crucial to prevent unintended consequences. As AI continues to push the boundaries of what's possible, we find ourselves on the precipice of an awe-inspiring future where human ingenuity and machine intelligence coexist in an unprecedented dance of progress and innovation."
          ></textarea>

          <a
            href="#"
            className="p-1 px-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight text-center mx-auto"
          >
            Generate Quiz
          </a>
        </div>

        {/* Right box with  */}
        <div className="mb-12 space-y-3 flex flex-col items-start justify-start lg:w-1/2">
          {/* Question 1 */}
          <div className="h-1/3 black border-black">
            <div className="flex flex-col items-start">
              <h4 className="orange_gradient font-bold">
                1. What is the main goal of artificial intelligence (AI)?
              </h4>
              <div className="flex flex-row font-light">
                <input type="radio" value="A" name="optionA" className="mr-2" />
                To create machines capable of reasoning and learning
              </div>
              <div className="flex flex-row font-light">
                <input type="radio" value="A" name="optionA" className="mr-2" />
                To develop algorithms for autonomous cars
              </div>
              <div className="flex flex-row font-light">
                <input type="radio" value="A" name="optionA" className="mr-2" />
                To revolutionize the healthcare industry
              </div>
              <div className="flex flex-row font-light">
                <input type="radio" value="A" name="optionA" className="mr-2" />
                To automate manufacturing processes
              </div>
            </div>
          </div>

          {/* Question 2 */}
          <div className="h-1/3 black border-black">
            <div className="flex flex-col items-start">
              <h4 className="orange_gradient font-bold">
                2. How does machine learning contribute to the advancement of
                artificial intelligence?
              </h4>
              <div className="flex flex-row font-light">
                <input type="radio" value="A" name="optionA" className="mr-2" />
                By enabling machines to reason and learn from data
              </div>
              <div className="flex flex-row font-light">
                <input type="radio" value="A" name="optionA" className="mr-2" />
                By creating human-like robots with emotions
              </div>
              <div className="flex flex-row font-light">
                <input type="radio" value="A" name="optionA" className="mr-2" />
                By enhancing the speed and memory capacity of computers
              </div>
              <div className="flex flex-row font-light">
                <input type="radio" value="A" name="optionA" className="mr-2" />
                By inventing new programming languages for AI systems
              </div>
            </div>
          </div>

          {/* Question 3 */}
          <div className="h-1/3 black border-black">
            <div className="flex flex-col items-start">
              <h4 className="orange_gradient font-bold">
                3. Which industries are likely to be impacted by the
                transformative power of artificial intelligence?
              </h4>
              <div className="flex flex-row font-light">
                <input type="radio" value="A" name="optionA" className="mr-2" />
                Entertainment and sports
              </div>
              <div className="flex flex-row font-light">
                <input type="radio" value="A" name="optionA" className="mr-2" />
                Agriculture and forestry
              </div>
              <div className="flex flex-row font-light">
                <input type="radio" value="A" name="optionA" className="mr-2" />
                Hospitality and tourism
              </div>
              <div className="flex flex-row font-light">
                <input type="radio" value="A" name="optionA" className="mr-2" />
                All of the above
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Playground;
