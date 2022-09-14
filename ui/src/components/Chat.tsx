export function TextBox(prop: { Text?: string }): JSX.Element {
  return (
    <div className="mt-2 flex w-full max-w-xs space-x-3">
      <div className="flex flex-col justify-center">
        <div className="h-10 w-10 shrink-0 rounded-full bg-gray-300"></div>
        <div className="text-sm text-gray-800">name</div>
      </div>
      <div className="p-2 ">
        <div className="flex flex-wrap break-all rounded-r-lg rounded-bl-lg bg-gray-300 p-3 ">
          <p className="text-sm">{prop.Text || "there no text provided"}</p>
        </div>
      </div>
    </div>
  );
}
export default function Chat(): JSX.Element {
  return (
    // add border to the chat box
    <div className="m-4 mt-4 mb-0 flex h-5/6 flex-col justify-center overflow-hidden md:m-8 md:mt-8 lg:m-8 lg:mt-8">
      <div className="flex h-1/2    grow flex-col   rounded-2xl   border border-slate-300    backdrop-blur-sm transition ease-in ">
        <div className="flex">
          <div className="flex w-full  flex-row-reverse rounded-t-lg bg-slate-300 p-2 text-white ring-1 ring-slate-300">
            <button className="rounded-lg bg-slate-300  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="gray"
              >
                {" "}
                <path d="M4 6h16M4 12h16M4 18h16" />{" "}
              </svg>
            </button>
          </div>
        </div>
        <div className="flex h-96 grow flex-col overflow-auto p-8">
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox Text="hellosihnointashoitshnaeineiashneoiasneoashneioasnishtanieshtaeioashnitenashieotnioeashntieosanhieotnashieotnioeashntieoashnieotnashieotnioeashniths"></TextBox>
          <TextBox Text="hello"></TextBox>
          <TextBox></TextBox>
        </div>
        <div className="w-full self-end rounded-b-lg   ring-1 ring-white">
          <input
            type="text"
            className="  w-full rounded-b-lg border border-gray-300 bg-white px-4 py-2 text-base focus:outline-none"
            placeholder="Type something..."
          />
        </div>
      </div>
    </div>
  );
}
