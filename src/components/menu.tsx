import ReactComponent from "*.svg"
import Play from "./svgs/play.svg"
import Setting from "./svgs/settings.svg"
import Eyes from "./svgs/eye.svg"
import Chat from "./svgs/chat.svg"
import Stats from "./svgs/stats.svg"

type ReactNode = JSX.Element | JSX.Element[]


export const Contenter =  ({children}: {children: React.ReactNode}) => {
	return (
		<div className="grid  place-items-center  
			w-96 h-96 border border-slate-600
			m-9 transition ease-in delay-50
			shadow-2xl hover:opacity-50">
			{children}
		</div>)
}

 export const Menu = ():React.ReactElement  => {
	return (
		<div className="flex flex-col w-full min-h-screen overflow-x-hidden py-18 sm:h-fit">
			<div className="flex  flex-wrap  justify-center py-18">
				<Contenter>
				</Contenter>
				<Contenter>
				</Contenter>
				<Contenter>
				</Contenter>
			</div>
			<div className="flex flex-col lg:flex-row md:flex-row justify-center py-18 w-screen">
				<ContenterLarge>

				</ContenterLarge>
				<ContenterLarge>
				</ContenterLarge>
			</div>
		</div>
	)

}


function ContenterLarge({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<div className="grid place-items-center 
			w-95 lg:w-1/3 h-96  border border-slate-600 
			m-9 md:m-14 lg:m-4 shadow-2xl  
			transition ease-in delay-50 hover:opacity-50">

			{children}
		</div>)
}





