import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import '@styles/main.css'
import { login } from './login.42api'
import { useAtom, atom } from 'jotai'
import { useLogin } from 'Router/Router'
import { Fetch } from 'utils'

type DataIntput = {
  username: string
  email: string
}

export default function Login(Status)
{
  const navigate = useNavigate()
  const [Navi, setNavi] = useState('/')
  const [islogin, setLogin] = useAtom(useLogin)
  const [inputs, setInputs] = useState<DataIntput>({ username: '', email: '' })

  const buttonHandler = (
    func: (input: DataIntput) => void,
    event: React.MouseEvent<HTMLButtonElement>) =>
    {
        event.preventDefault()
        func(inputs)
        const button: HTMLButtonElement = event.currentTarget
    }
	


//  Here we check if the client passed throught 42api
const check = async () =>
{
  
    Fetch ('api/auth/who').then((response) =>
    {
      if(response.status === 200)
        {
          setLogin('login')
          navigate('/Menu')
        }
        else
        {
            login() 
        }
    })
  
}

const loginOffline = () =>
{
    setLogin('login')
}
// useEffect(() => { navigate(Navi)}, [])
  return (
    <div className="m-auto flex h-fit w-screen pb-[50px]">
      <div className="m-auto">
        <h1 className="font-kaushan text-[75px] text-white sm:text-[100px] md:text-[150px] lg:text-[200px] xl:text-[250px] ">
          trans-pong
        </h1>
        <button
          onClick={(event) => buttonHandler(check, event)}
          className="relative mr-2 mb-2 ml-[50%] translate-x-[-50%] rounded bg-pink-500 py-2 px-4 font-carattere text-lg font-bold text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
        >
          Login
        </button>
      </div>
    </div>
  )
}
