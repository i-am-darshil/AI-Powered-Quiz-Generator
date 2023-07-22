import PricingCard from "@components/PricingCard";

const page = () => {
  return (
    <section className="relative z-20 overflow-hidden font-light pt-8 pb-8 w-full flex justify-center">
      <div className="container">
        <div className="w-full px-4">
          <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
            <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px] orange_gradient">
              Our Pricing Plan
            </h2>
            <p className="text-base text-body-color">
              Elevate quizzing experience by leveraging Artificial Intelligence.
              SuperQuizzer makes creating and hosting quizzes super simple and
              effective.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center -mx-4 w-full">
          <div className="flex flex-wrap md:mx-40 w-full">
            <PricingCard
              type="Free"
              price="$0"
              subscription="month"
              description=""
              buttonText="Default"
            >
              <p className="mb-1 text-base leading-loose text-body-color">
                1 Quiz Creation
              </p>
              <p className="mb-1 text-base leading-loose text-body-color">
                1 Quiz Hosting
              </p>
              <p className="mb-1 text-base leading-loose text-body-color">
                Insights & Analytics
              </p>
              <p className="mb-1 text-base leading-loose text-body-color">
                Regular Support
              </p>
              <p className="mb-1 text-base leading-loose text-body-color">
                Limited Features
              </p>
            </PricingCard>
            <PricingCard
              type="Pro"
              price="$9.99"
              subscription="month"
              description=""
              buttonText="Choose Pro"
            >
              <p className="mb-1 text-base leading-loose text-body-color">
                Unlimited Quiz Creation
              </p>
              <p className="mb-1 text-base leading-loose text-body-color">
                Unlimited Quiz Hosting
              </p>
              <p className="mb-1 text-base leading-loose text-body-color">
                Insights & Analytics
              </p>
              <p className="mb-1 text-base leading-loose text-body-color">
                Realtime Support
              </p>
              <p className="mb-1 text-base leading-loose text-body-color">
                All Features
              </p>
            </PricingCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
