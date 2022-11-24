export default function Register() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="block max-w-md rounded-lg bg-white p-6 shadow-lg">
        <form>
          <div className="grid grid-cols-2 gap-4">
            <div className=" mb-6">
              <input
                type="text"
                className="
          m-0
          block
          w-full
          rounded
          border
          border-solid
          border-gray-700
          bg-white bg-clip-padding
          px-3 py-1.5 text-base
          font-normal
          text-gray-700
          transition
          ease-in-out
          focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                id="exampleInput123"
                aria-describedby="emailHelp123"
                placeholder="First name"
              ></input>
            </div>
            <div className=" mb-6">
              <input
                type="text"
                className="
          m-0
          block
          w-full
          rounded
          border
          border-solid
          border-gray-700
          bg-white bg-clip-padding
          px-3 py-1.5 text-base
          font-normal
          text-gray-700
          transition
          ease-in-out
          focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                id="exampleInput124"
                aria-describedby="emailHelp124"
                placeholder="Last name"
              ></input>
            </div>
          </div>
          <div className=" mb-6">
            <input
              type="email"
              className=" m-0
        block
        w-full
        rounded
        border
        border-solid
        border-gray-700
        bg-white bg-clip-padding
        px-3 py-1.5 text-base
        font-normal
        text-gray-700
        transition
        ease-in-out
        focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
              id="exampleInput125"
              placeholder="Email address"
            ></input>
          </div>
          <div className="mb-6">
            <input
              type="password"
              className=" m-0
        block
        w-full
        rounded
        border
        border-solid
        border-gray-700
        bg-white bg-clip-padding
        px-3 py-1.5 text-base
        font-normal
        text-gray-700
        transition
        ease-in-out
        focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
              id="exampleInput126"
              placeholder="Password"
            ></input>
          </div>
        </form>

        <div className="flex justify-center space-x-2">
          <button className="inline-flex w-32 items-center rounded border-b-2 border-blue-500 bg-white py-2 px-6 font-bold tracking-wide text-gray-800 shadow-md transition hover:border-blue-700 hover:bg-blue-600 hover:text-white">
            <span className="mx-auto">register</span>
          </button>
        </div>
      </div>
    </div>
  )
}
