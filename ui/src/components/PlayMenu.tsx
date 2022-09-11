import PLayMenu from './PlayMenu';
import React, {ReactElement} from 'react';
import Play from './svgs/play.svg'


 const PlaySVG = ():JSX.Element=> {
return(
<svg width={100}>
<Play></Play>
</svg>

)

}



type ReactNode = JSX.Element | JSX.Element[]

export const Contenter =  ({children}: {children: React.ReactNode}) => {
	return (
		<div className="grid  place-items-center  h-screen 
			 w-96  lg:w-2/6  lg:h-5/6 border border-slate-600
			m-10  mt-12  transition ease-in delay-50
			shadow-2xl hover:opacity-80">
<div className="grid place-items-center gap-y-2 ">
			{children}
			</div>
		</div>)
}
export default function PlayMenu() {
  return ( 
		<div className="flex flex-col w-full min-h-screen overflow-x-hidden sm:h-fit">
	<div className="flex  flex-wrap  justify-center  
		 w-screen  lg:h-screen h-max">
				<Contenter>
			 <form className="flex flex-col gap-y-1">
		<input className="border border-slate-600 rounded-lg p-2" 
			type="text" placeholder="enter code here" />
			<button className="bg-slate-600 rounded-lg p-2 text-white">Join
			</button>
		</form>
				</Contenter>
				<Contenter>
				<h1 className="text-2xl font-bold text-slate-600">matchmaking</h1>
				</Contenter>
				</div>
		</div>
  )
}

