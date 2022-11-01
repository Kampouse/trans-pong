import { Contenter } from "./PlayMenu";
export default function CreateGame() {


  return (
		<div className="flex min-h-screen w-full flex-col overflow-x-hidden pt-6 sm:h-fit">
      <div
        className="flex  h-max  w-screen  
		 flex-wrap  justify-center lg:h-screen"
      >
        <Contenter>
          <form className="flex flex-col gap-y-1">
            <h1 className="text-2xl font-bold text-slate-600">your code: </h1>
            <p className=" font-bold text-slate-600">
              give this code to friend :){" "}
            </p>
            <button className="rounded-lg bg-slate-600 p-2 text-white">
              Start
            </button>
          </form>
        </Contenter>
      </div>
    </div>
  );
}
