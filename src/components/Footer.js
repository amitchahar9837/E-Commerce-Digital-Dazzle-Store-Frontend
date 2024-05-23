import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const Year = new Date().getFullYear();

  return (
    <footer className="relative text-white">
      <div className=" bg-black w-[100%] overflow-hidden">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,
                        250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,
                        3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="z-1 h-[600px] fill-white"
          ></path>
        </svg>
        <div className="grid lg:grid-cols-4 gap-20 sm:grid-cols-1 p-20">
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl text-red-600">E-COMMERCE</h2>
            <p>
            "Dazzle Your World with Gadgets"
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-600 py-2 uppercase">Resources</h3>
            <ul className="flex flex-col gap-2">
              <Link
                to={"/"}
                className="hover:text-red-600 hover:underline duration-200 inline-block w-fit"
              >
                FAQs
              </Link>
              <Link
                to={"/"}
                className="hover:text-red-600 hover:underline duration-200 inline-block w-fit"
              >
                Help Center
              </Link>
              <Link
                to={"/"}
                className="hover:text-red-600 hover:underline duration-200 inline-block w-fit"
              >
                Contact Us
              </Link>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-600 py-2 uppercase">Privacy Policy</h3>
            <ul className="flex flex-col gap-2">
              <Link
                to={"/"}
                className="hover:text-red-600 hover:underline duration-200 inline-block w-fit"
              >
                Terms of Service
              </Link>
              <Link
                to={"/"}
                className="hover:text-red-600 hover:underline duration-200 inline-block w-fit"
              >
                Privacy Policy
              </Link>
              <Link
                to={"/"}
                className="hover:text-red-600 hover:underline duration-200 inline-block w-fit"
              >
                Security
              </Link>
              <Link
                to={"/"}
                className="hover:text-red-600 hover:underline duration-200 inline-block w-fit"
              >
                Site Map
              </Link>
            </ul>
          </div>
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold text-red-600 py-2 uppercase">
              Contact
            </h2>
            <p className="text-[16px] my-4">Email: ascoder123@gmail.com</p>
            <p className="text-[16px] my-4">Phone: +91 81716 97502 </p>
            <div className="flex space-x-4">
              <Link
                className="text-white hover:text-red-600 transform hover:scale-150 
                            transition-all duration-150 ease-in-out"
                to={"/"}
              >
                <FaGithub />
              </Link>
              <Link
                className="text-white hover:text-red-600 transform hover:scale-150
                             transition-all duration-150 ease-in-out"
                to={"/"}
              >
                <FaLinkedinIn />
              </Link>
              <Link
                className="text-white hover:text-red-600 transform hover:scale-150
                             transition-all duration-150 ease-in-out"
                to={"/"}
              >
                <FaTwitter />
              </Link>
              <Link
                className="text-white hover:text-red-600 transform hover:scale-150
                             transition-all duration-150 ease-in-out"
                to={"/"}
              >
                <FaInstagram />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="h-full flex items-center justify-center mb-5">
            <form className="w-96 relative flex flex-col items-center">
              <h2 className="text-xl font-bold my-2">
                Subscribe to our Newsletter!
              </h2>
              <div className="flex rounded-full overflow-hidden w-full">
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="w-full text-gray-800 p-4 h-10 focus:outline-none 
                            focus:border border-red-600"
                />
                <button
                  type="Submit"
                  className="bg-red-600 px-8 py-2 rounded-r-full text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <h6 className="text-center">&copy; ASCoder {Year}</h6>
      </div>
    </footer>
  );
};

export default Footer;
