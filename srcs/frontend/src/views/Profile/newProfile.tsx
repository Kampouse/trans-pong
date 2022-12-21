import React, { Component } from 'react'

class PublicProfile extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            user: []
        }

        this.componentDidMount
        {
            fetch('http://localhost:3000/profile/gcollet', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                }
            }).then(response => console.log(response.json)).catch(error => console.log(error))
        }
    }
    render()
    {
        return (
            <div className=" my-4 px-[10%] py-[10%] mx-2 w-[100%]">
                <div className="flex flex-col rounded-lg bg-white/30 ring-1 ring-slate-300  backdrop-blur-sm px-20">
                    <h1 className="text-center text-6xl fon pt-10 pb-40 font-Merriweather">Yo mama</h1>
                    <div className="pb-12 flex flex-row items-center justify-center px-10">
                        <button className=" hover:bg-purple-200 mx-10 font-Merriweather text-2xl rounded-lg ring-1 ring-slate-500 py-25 px-50 h-24 w-60  bg-sky-200">
                            Singler Player
                        </button>
                        <button className=" hover:bg-purple-200 mx-10 font-Merriweather text-2xl rounded-lg ring-1 ring-slate-500 py-25 px-50 h-24 w-60  bg-sky-200">
                            Multi Player
                        </button>
                    </div>
                </div>
            </div>)
    }
}

export default PublicProfile
