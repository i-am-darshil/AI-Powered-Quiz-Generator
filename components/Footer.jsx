const Footer = () => {
  return (
    <footer className="bg-transparent w-full rounded-lg shadow m-4 text-center">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm black sm:text-center">
          © 2023{" "}
          <a href="#" className="hover:underline">
            Quizopia™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex-wrap items-center mt-3 text-sm font-medium black sm:mt-0 hidden md:flex">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
