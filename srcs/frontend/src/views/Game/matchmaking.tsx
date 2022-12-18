import { Link } from 'react-router-dom'
import Game from './Game'
import { Contenter } from '../Menu/menu'

export default function Matchmaking()
{
    return (
    <div className=" my-4 px-[10%] py-[10%] mx-2 w-[100%]">
            <div className="flex flex-col rounded-lg bg-white/30 ring-1 ring-slate-300  backdrop-blur-sm px-20">
                <h1 className="text-center text-6xl fon pt-10 pb-40 font-Merriweather">Matchmaking</h1>
                <div className="pb-12 flex flex-row items-center justify-center px-10">
                    <button className=" hover:bg-purple-200 mx-10 font-Merriweather text-2xl rounded-lg ring-1 ring-slate-500 py-25 px-50 h-24 w-60  bg-sky-200">
                        Singler Player
                    </button>
                    <button className=" hover:bg-purple-200 mx-10 font-Merriweather text-2xl rounded-lg ring-1 ring-slate-500 py-25 px-50 h-24 w-60  bg-sky-200">
                        Multi Player
                    </button>
                </div>
            </div>
    </div>
    )
}
