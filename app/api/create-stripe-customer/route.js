import constants from "@utils/constants";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const POST = async (request) => {
  try {
    const requestData = await request.json();

    console.log(
      `Creating Stripe Customer, request : ${JSON.stringify(requestData)}`
    );

    // if (requestData.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    //   return new Response(
    //     JSON.stringify({
    //       message: "You are not authorized to call this API",
    //     }),
    //     { status: 401 }
    //   );
    // }

    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE
    );

    const userEmail = requestData.email;
    const name = requestData.name;
    const userId = requestData.id;

    const customer = await stripe.customers.create({
      email: userEmail,
      name: name,
    });

    console.log(
      `Stripe Customer Created, customer : ${JSON.stringify(customer)}`
    );

    const profileUpdate = await supabase
      .from("profile")
      .update({
        stripe_customer: customer.id,
      })
      .eq("id", userId);
    console.log(`Updated responses table for profile`);
    if (profileUpdate.error) {
      return new Response(
        JSON.stringify({
          message: "Internal Server Error",
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        message: `stripe customer created: ${customer.id}`,
        stripe_customer: customer.id,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);

    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      { status: 500 }
    );
  }
};
