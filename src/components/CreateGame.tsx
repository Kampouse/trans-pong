import PLayMenu from './PlayMenu';
import {ReactElement} from 'React';
import { ReactComponent as Play } from "./svgs/Start.svg";
import {Contenter} from './PlayMenu';


export default function CreateGame() {
  return ( 
		<div className="flex flex-col w-full min-h-screen overflow-x-hidden sm:h-fit">
	<div className="flex  flex-wrap  justify-center  
		 w-screen  lg:h-screen h-max">
				<Contenter>
			 <form className="flex flex-col gap-y-1">
			
			<h1 className="text-2xl font-bold text-slate-600">your code: </h1>
			<p className="text-2s font-bold text-slate-600">give this code to friend :) </p>
			<button className="bg-slate-600 rounded-lg p-2 text-white">Start
			</button>
		</form>
				</Contenter>
			</div>

		</div>
  )
}

