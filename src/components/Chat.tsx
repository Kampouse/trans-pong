import {ReactElement} from 'React';

type children = ReactElement | ReactElement[];
// define default  image and text if   there no image
export  function TextBox(prop:{Text?:string}):JSX.Element {
return(
<div className="flex w-full mt-2 space-x-3 max-w-xs">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
          <div>
            <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
              <p className="text-sm">
                {prop.Text || "there no text provided"} 
              </p>
            </div>
            <span className="text-xs text-gray-500 leading-none">
              2 min ago
            </span>
          </div>
        </div>
);
}
export default function Chat(): JSX.Element {
  return (
    <div className="flex flex-col flex-grow w-full h-1/2 max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="flex flex-col flex-grow h-full p-4 overflow-auto">
<TextBox Text="hello"></TextBox>
<TextBox Text="hello"></TextBox>
<TextBox Text="hello"></TextBox>
<TextBox Text="hello"></TextBox>
<TextBox Text="hello"></TextBox>
<TextBox Text="hello"></TextBox>
<TextBox></TextBox>
<TextBox></TextBox>
      </div>
      <div className="bg-gray-300 p-4 self-end w-full">
        <input
          type="text"
          className="w-full bg-white rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 text-base px-4 py-2"
          placeholder="Type something..."
        />
        
  </div>   


 </div>
  );
}
