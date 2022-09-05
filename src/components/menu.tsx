import { ReactComponent as Eyes } from "./svgs/eye.svg";
import { ReactComponent as Play } from "./svgs/Start.svg";
import { ReactComponent as Setting } from "./svgs/settings.svg";
import { ReactComponent as Stats } from "./svgs/stats.svg";
import { ReactComponent as Chat } from "./svgs/chat.svg";

export const Contenter = ({children} ):React.ReactElement  => {
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
					< Play width="228" height="228" color="black" />
				</Contenter>
				<Contenter>
					< Setting width="228" height="228" />
				</Contenter>
				<Contenter>
					<Eyes width="228" height="228" />
				</Contenter>
			</div>
			<div className="flex flex-col lg:flex-row md:flex-row justify-center py-18 w-screen

				">
				<ContenterLarge>
					<Chat width="228" height="228" />
				</ContenterLarge>
				<ContenterLarge>
					<Stats width="228" height="228" />
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





