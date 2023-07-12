// "use client"

// import { useState } from "react";

const Nav = () => {
  // const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  return (
    <nav className="relative container mx-auto p-6">
      {/* Flex container */}
      <div className="flex items-center justify-between">
        {/* Log */}
        <div className="pt-2 flex items-center justify-between">
          <img className="h-12" src="images/logo.svg" alt="" />
          <span className="black text-center ml-6 font-light hidden text-4xl lg:block">
            Quizopia
          </span>
        </div>

        <div className="flex flex-row justify-center items-center">
          {/* Menu Items */}
          <div className="hidden space-x-6 md:flex">
            <a href="#" className="hover:text-darkGrayishBlue">
              Create
            </a>
            <a href="#" className="hover:text-darkGrayishBlue">
              Join
            </a>
            <a href="#" className="hover:text-darkGrayishBlue">
              Pricing
            </a>
            <a href="#" className="hover:text-darkGrayishBlue">
              About Us
            </a>
          </div>

          <a
            href="#"
            className="p-1 px-2 ml-6 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight md:block"
          >
            Get Started
          </a>
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
