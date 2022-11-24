import Chat from './Chat/Chat'
import ReactiveCanvas from './ReactiveCanvas'
import { createRef, DetailedHTMLProps, HTMLAttributes } from 'react'

export default function Game() {
  return <ReactiveCanvas />
}

function Next() {
  return (
    <div className="-rotate-180 ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="root"
        version="1.1"
        color="rgb(100,116,137"
        viewBox="0 0 13 16"
        transform="rotate(180,0,0)"
        height={100}
      >
        <path fill="none" stroke="currentColor" d="M 2 4 L 6 8 L 2 12" />
        <path fill="none" stroke="currentColor" d="M 7 4 L 11 8 L 7 12" />
      </svg>
    </div>
  )
}

function Prev() {
  return (
    <div className="-rotate-180 ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="root"
        color="rgb(100,116,137)"
        version="1.1"
        viewBox="0 0 13 16"
        height={100}
      >
        <path fill="none" stroke="currentColor" d="M 2 4 L 6 8 L 2 12" />
        <path fill="none" stroke="currentColor" d="M 7 4 L 11 8 L 7 12" />
      </svg>
    </div>
  )
}

export function GameWatch() {
  return (
    <div className=" w-[90%] pt-[50px] m-auto flex h-5/6 justify-center lg:flex-row ">
      <div className=" flex  h-full flex-col justify-center rounded-lg bg-white/30 ring-1 ring-slate-300  backdrop-blur-sm w-full ">
        <button className="absolute rounded-lg ">
          {' '}
          <Prev />{' '}
        </button>
        <button className="absolute right-2 rounded-lg ">
          {' '}
          <Next />{' '}
        </button>

        <canvas />
      </div>
    </div>
  )
}
