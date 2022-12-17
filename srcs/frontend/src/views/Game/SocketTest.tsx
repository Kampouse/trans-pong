export default function SocketTest()
{
    return (
    <div className=" my-10 px-[35%] py-[10%] mx-10">
            <div className="flex flex-col items-center justify-center rounded-lg bg-white/30 ring-1 ring-slate-300  backdrop-blur-sm px-20">
                <h1 className=" text-center text-6xl font-Merriweather py-10">WebSocket test</h1>
                    <form className="py-10  items-center">
                        <input className="px-6 mx-6 my-2" type="text"/>
                        <button className="px-6 my-2 font-Merriweather text-2xl mx-[35%] bg-blue-400 rounded-lg">Send</button>
                    </form>
                    <p className="mx-6 my-6 text-lg font-Merriweather ">
                        <li>Some Message</li>
                    </p>
            </div>
    </div>
    )
}
