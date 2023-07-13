"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn = false;
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="relative container mx-auto p-6">
      {/* Flex container */}
      <div className="flex items-center justify-between">
        {/* Log */}
        <div className="pt-2 flex items-center justify-between">
          <Image width={37} height={37} src="images/logo.svg" alt="" />
          <span className="black text-center ml-3 font-light text-2xl lg:block lg:text-4xl lg:ml-6">
            Quizopia
          </span>
        </div>

        <div className="flex-row justify-center items-center hidden md:flex">
          {/* Desktop view */}

          {/* If Logged in */}
          {isUserLoggedIn ? (
            <div className="hidden space-x-6 md:flex">
              <Link href="#" className="hover:text-darkGrayishBlue">
                Create A Quiz
              </Link>
              <Link href="#" className="hover:text-darkGrayishBlue">
                Join A Quiz
              </Link>
              <Link
                href="#"
                className="px-3 ml-6 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight md:block"
              >
                Log Out
              </Link>
            </div>
          ) : (
            <div className="hidden space-x-6 md:flex">
              <Link href="#" className="hover:text-darkGrayishBlue">
                Pricing
              </Link>
              <Link href="#" className="hover:text-darkGrayishBlue">
                About Us
              </Link>
              {providers &&
                Object.values(providers).map((provider) => {
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="px-3 ml-6 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight md:block"
                  >
                    Sign in
                  </button>;
                })}
            </div>
          )}
        </div>

        {/* Mobile view */}
        <div className="flex relative md:hidden">
          {isUserLoggedIn ? (
            <div className="flex">
              <Image
                width={37}
                height={37}
                src="images/logo.svg"
                alt=""
                className="rounded-full"
                alt="profile"
                onClick={() => {
                  setToggleDropdown((prev) => !prev);
                }}
              />

              {toggleDropdown && (
                <div className="dropdown">
                  <Link
                    href="#"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="#"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create A Quiz
                  </Link>
                  <Link
                    href="#"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Join A Quiz
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className="mt-5 w-full black_btn"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            providers &&
            Object.values(providers).map((provider) => {
              <button
                type="button"
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                }}
                className="px-3 ml-6 text-white bg-black rounded-full baseline hover:bg-brightRedLight md:block"
              >
                Sign in
              </button>;
            })
          )}
        </div>

        {/* Hamburger
        <div>

          <button
            id="menu-btn"
            onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}
            className={`${showHamburgerMenu ? "open" : ""} block hamburger md:hidden focus:outline-none`}
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>

            <div
              id="menu"
              className={`${showHamburgerMenu ? "flex" : "hidden"} absolute flex-col items-center self-end py-8 mt-10 mb-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md md:hidden`}
            >
              <a href="#">Create</a>
              <a href="#">Join</a>
              <a href="#">Pricing</a>
              <a href="#">About Us</a>
            </div>
        </div>
        */}
      </div>
    </nav>
  );
};

export default Nav;
