import PLayMenu from './PlayMenu';
import { ReactComponent as Play } from "./svgs/Start.svg";

export const Contenter = ({children} ):React.ReactElement  => {
	return (
		<div className="grid  place-items-center  
			 w-96 h-96 lg:w-2/6  lg:h-5/6 border border-slate-600
			m-10  mt-12  transition ease-in delay-50
			shadow-2xl hover:opacity-50">

			<div className="opacity-100  transition ease-in delay-50 hover:opacity-50">
			{children}
			</div>
		</div>)
}

export const ContenterOpacity = ({children} ):React.ReactElement  => {
	return (
		<div className="grid  place-items-center  
			w-2/6 h-3/4 border border-slate-600
			m-10 mt-12 transition ease-in delay-50
			shadow-2xl">

		</div>)
}



export default function PlayMenu() {
  return (


		<div className="flex flex-col w-full min-h-screen overflow-x-hidden sm:h-fit">
	<div className="flex  flex-wrap  justify-center  w-screen  lg:h-screen h-max">
				<Contenter>
					< Play width="228" height="228" color="black" />
				</Contenter>
				<Contenter>
					< Play width="228" height="228" />
				</Contenter>
				</div>
		</div>
  )
}

