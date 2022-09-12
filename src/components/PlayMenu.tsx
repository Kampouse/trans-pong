import React from "react";

export const Contenter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className=" m-10  mt-12 
			 grid  h-screen  w-96 place-items-center border
			border-slate-600  shadow-2xl  transition ease-in hover:opacity-80
			lg:h-5/6 lg:w-2/6"
    >
      <div className="grid place-items-center gap-y-2 ">{children}</div>
    </div>
  );
};
export default function PlayMenu() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden sm:h-fit">
      <div
        className="flex  h-max  w-screen  
		 flex-wrap  justify-center lg:h-screen"
      >
        <Contenter>
          <form className="flex flex-col gap-y-1">
            <input
              className="rounded-lg border border-slate-600 p-2"
              type="text"
              placeholder="enter code here"
            />
            <button className="rounded-lg bg-slate-600 p-2 text-white">
              Join
            </button>
          </form>
        </Contenter>
        <Contenter>
          <h1 className="text-2xl font-bold text-slate-600">matchmaking</h1>
        </Contenter>
      </div>
    </div>
  );
}
