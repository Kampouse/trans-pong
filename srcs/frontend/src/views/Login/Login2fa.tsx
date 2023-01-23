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

export default function Login2fa(Status)
{
  const navigate = useNavigate()
  const [Navi, setNavi] = useState('/')
  const [islogin, setLogin] = useAtom(useLogin)
  const [content, setContent] = useState<string>("")

  const buttonHandler = (
    func: (input: DataIntput) => void,
    event: React.MouseEvent<HTMLButtonElement>) =>
    {
        event.preventDefault()
        func(content)
        const button: HTMLButtonElement = event.currentTarget
    }
	
    const submit2fa = async (input) => {
        const body = { token : input }
         const output = await  Fetch("/api/profile/create/validation", "POST", JSON.stringify(body))
            if (output.status === 200)
            {
                setLogin('login')
                navigate('/Menu')
            }
    }
// useEffect(() => { navigate(Navi)}, [])
  return (
    <div className="m-auto flex h-fit w-screen pb-[50px]">
      <div className="m-auto">
        <h1 className="font-kaushan text-[75px] text-white sm:text-[100px] md:text-[150px] lg:text-[200px] xl:text-[250px] ">
        2FA Login</h1>
         <input onChange={(e)=> setContent(e.target.value) } className='bg-transparent border-b-2 ml-[50%] translate-x-[-50%] mb-3' type='text' placeholder='2FA Code' />
        <button
          onClick={(event) => buttonHandler(submit2fa, event)}
          className="relative mr-2 mb-2 ml-[50%] translate-x-[-50%] rounded bg-pink-500 py-2 px-4 font-carattere text-lg font-bold text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
        >
          Verify 2FA
        </button>

      </div>
    </div>
  )
}