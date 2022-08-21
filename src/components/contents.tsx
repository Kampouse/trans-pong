import { ReactComponent as Eyes } from "./svgs/eye.svg";
import { ReactComponent as Play } from "./svgs/Start.svg";
import { ReactComponent as Setting } from "./svgs/settings.svg";
import { ReactComponent as Stats } from "./svgs/stats.svg";
import { ReactComponent as Chat } from "./svgs/chat.svg";

function ContenterLarge({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<div className="grid place-items-center  w-1/3 h-96  border border-slate-600 m-4 shadow-2xl  transition ease-in delay-50 hover:opacity-50">
			{children}
		</div>)
}
function Contenter({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<div className="grid  place-items-center  w-96 h-96 border border-slate-600 m-9 transition ease-in delay-50 shadow-2xl hover:opacity-50">
			{children}
		</div>)
}

export default function Menu(): React.ReactElement {
	return (
		<div className="flex flex-col w-full min-h-screen overflow-x-hidden
			bg-gradient-to-r from-purple-500 to-pink-500 py-18  h-screen sm:h-fit">
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
			<div className="flex flex-wrap justify-center py-18 w-screen">
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





