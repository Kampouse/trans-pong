import { Link } from "react-router-dom";
export default function Nav() {
  return (
    <nav className="fixed z-10 flex w-full flex-wrap items-center justify-between bg-gray-900 py-3 text-gray-200 shadow-lg">
      <div className=" flex w-full flex-wrap items-center justify-between px-6">
        <button
          className=" border-0 bg-transparent py-2 px-2.5 text-gray-200 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent1"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        ></button>
        <div className=" grow  " id="navbarSupportedContent1">
          <Link to="/" className=" text-xl font-semibold text-white">
            trans-pong
          </Link>
          <Link to="/Play" className=" ml-2 pl-3 font-semibold text-white">
            Play
          </Link>
          <Link to="/Profile" className=" ml-2 pl-3 font-semibold text-white">
            Profile
          </Link>
          <Link to="/API" className=" ml-2 pl-3 font-semibold text-white">
            API
          </Link>
          <ul className="  mr-auto flex flex-col pl-0"></ul>
        </div>

        <div className="relative flex items-center">
          <input className="mr-5" />
          <div className="relative">
            <a
              className="mr-4 flex items-center text-white opacity-60 hover:opacity-80 focus:opacity-80"
              href="#"
              id="dropdownMenuButton1"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="bell"
                className="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
