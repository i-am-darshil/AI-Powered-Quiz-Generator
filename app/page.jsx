import Playground from "@components/Playground";

const Home = () => {
  return (
    // Mid Section
    <div className="w-full">
      <section className="w-full flex-center flex-col my-18">
        <h1 className="head_text text-center">
          <span className="orange_gradient text-center font-light">
            -SuperQuizzer-
          </span>
          <br />
          Discover & Host
          <br />
          <span className="orange_gradient text-center">
            {" "}
            AI-Powered Quizzes
          </span>
        </h1>
        <p className="desc text-center font-thin">
          Stop Wasting Time Manually Creating Quizzes. SuperQuizzer makes
          creating and hosting quizzes{" "}
          <span className="font-light underline underline-offset-2">
            super simple and effective
          </span>
          . Quickly convert any text, document, or URL into an online test with
          ease.
        </p>
      </section>

      <Playground />
    </div>
  );
};

export default Home;
