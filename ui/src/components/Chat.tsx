import { ReactElement } from 'react';

type children = ReactElement | ReactElement[];
// define default  image and text if   there no image
export function TextBox(prop: { Text?: string }): JSX.Element {
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs">
       < div className="flex flex-col justify-center">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
        <div className="text-sm text-gray-800">name</div>
        </div>
      <div className="p-2 ">
        <div className="flex flex-wrap bg-gray-300 p-3 rounded-r-lg rounded-bl-lg break-all ">
          <p className="text-sm">
            {prop.Text || "there no text provided"}
          </p>
        </div>
        
      </div>
    </div>
  );
}
export default function Chat(): JSX.Element {
  return (
    // add border to the chat box
    <div className="flex flex-col justify-center h-5/6 mt-4 m-4 mb-0 md:mt-8 md:m-8 lg:mt-8 lg:m-8 overflow-hidden">
      <div className="flex flex-col flex-grow    backdrop-blur-md rounded-2xl   h-1/2   border border-slate-600    transition ease-in delay-50 ">
        <div className="flex">
          < div className="flex flex-row-reverse  ring-1 ring-slate-600 bg-slate-600 w-full rounded-t-lg p-2 text-white">
            <button className="bg-slate-600 rounded-lg  ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" > <path d="M4 6h16M4 12h16M4 18h16" /> </svg>
            </button>
          </div>
        </div>
        <div className=" flex flex-col flex-grow md:full lg:full h-96 p-8 overflow-auto">
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
        <div className="bg-slate-500 p-2 ring-1 ring-slate-600 self-end w-full rounded-b-lg">
          <input
            type="text"
            className="w-full bg-white rounded-b-lg border border-gray-300 focus:outline-none text-base px-4 py-2" placeholder="Type something..." />

        </div>
      </div>
    </div>
  );
}
