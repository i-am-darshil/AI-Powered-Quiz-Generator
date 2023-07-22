"use client";

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import { useUser } from "@context/UserContext";

const Nav = ({ session }) => {
  const { user, login, logout } = useUser();
  const providers = [
    {
      name: "google",
    },
  ];

  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // console.log("window.location.hostname", window.location.hostname);
    // console.log("window.location.href", window.location.href); // Logs `http://localhost:3000/blog/incididunt-ut-lobare-et-dolore`
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <nav className="relative container mx-auto p-6">
      {/* Flex container */}
      <div className="flex items-center justify-between">
        {/* Log */}
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image width={37} height={37} src="/images/logo.svg" alt="" />
          </Link>
          <Link
            className="black text-center ml-3 font-light text-2xl lg:block lg:text-4xl lg:ml-6"
            href="/"
          >
            SuperQuizzer
          </Link>
        </div>

        <div className="flex-row justify-center items-center text-black font-light hidden md:flex">
          {/* Desktop view */}
          {/* If Logged in */}
          {user ? (
            <div className="hidden justify-center items-center space-x-6 md:flex">
              <Link
                href="/create"
                className="uppercase font-extralight hover:text-brightRed hover:underline hover:underline-offset-2"
              >
                Create
              </Link>
              <Link
                href="/my-created-quizzes"
                className="uppercase font-extralight hover:text-brightRed hover:underline hover:underline-offset-2"
              >
                Profile
              </Link>
              <Link
                href="/pricing"
                className="uppercase font-extralight hover:text-brightRed hover:underline hover:underline-offset-2"
              >
                Pricing
              </Link>
              <button
                type="button"
                className="uppercase font-extralight hover:text-brightRed hover:underline hover:underline-offset-2"
                onClick={logout}
              >
                Log Out
              </button>
              <Link href="#">
                <Image
                  width={37}
                  height={37}
                  src={user.user_metadata.avatar_url}
                  alt=""
                  className="rounded-full"
                  alt="profile"
                  onClick={() => {
                    setToggleDropdown((prev) => !prev);
                  }}
                />
              </Link>
            </div>
          ) : (
            <div className="hidden space-x-6 md:flex">
              <Link
                href="/create"
                className="uppercase font-extralight hover:text-brightRed hover:underline hover:underline-offset-2"
              >
                Create
              </Link>
              <Link
                href="/my-created-quizzes"
                className="uppercase font-extralight hover:text-brightRed hover:underline hover:underline-offset-2"
              >
                Profile
              </Link>
              <Link
                href="/pricing"
                className="uppercase font-extralight hover:text-brightRed hover:underline hover:underline-offset-2"
              >
                Pricing
              </Link>
              {providers &&
                Object.values(providers).map((provider) => {
                  return (
                    <button
                      type="button"
                      key={provider.name}
                      onClick={() => {
                        login(provider.name, currentUrl);
                      }}
                      className="px-3 ml-6 text-white font-light bg-brightRed rounded-full baseline hover:bg-brightRedLight md:block"
                    >
                      Sign in
                    </button>
                  );
                })}
            </div>
          )}
        </div>

        {/* Mobile view */}
        <div className="flex relative items-center justify-center font-light md:hidden">
          {user ? (
            <div className="flex">
              <Image
                width={37}
                height={37}
                src={user.user_metadata.avatar_url}
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
                    href="/my-created-quizzes"
                    className="dropdown_link hover:underline hover:underline-offset-2"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="create"
                    className="dropdown_link hover:underline hover:underline-offset-2"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create A Quiz
                  </Link>
                  <Link
                    href="#"
                    className="dropdown_link hover:underline hover:underline-offset-2"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Pricing
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropdown(false);
                      logout();
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
              return (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    login(provider.name, currentUrl);
                  }}
                  className="px-3 ml-6 text-white font-light bg-brightRed rounded-full baseline hover:bg-brightRedLight md:block"
                >
                  Sign in
                </button>
              );
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
