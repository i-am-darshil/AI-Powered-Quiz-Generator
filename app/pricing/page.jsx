"use client";

import { useState } from "react";

import PricingCard from "@components/PricingCard";
import { useUser } from "@context/UserContext";

const page = ({ plans }) => {
  const { user } = useUser();
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  const processSubscription = (planId) => async () => {
    const { data } = await axios.get(`/api/subscription/pro`);
    // const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
    // await stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <section className="relative z-20 overflow-hidden font-light pt-8 pb-8 w-full flex justify-center">
      {console.log("plans", JSON.stringify(plans))}
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

        <div className="flex flex-wrap justify-center w-full">
          <div className="flex flex-wrap lg:mx-40 w-full">
            <PricingCard
              type="Free"
              price="$0"
              subscription="month"
              description="Starter Pack"
              buttonText="Default"
              processSubscription={processSubscription}
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
              description="Unlimited Pack"
              buttonText="Choose Pro"
              processSubscription={processSubscription}
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
