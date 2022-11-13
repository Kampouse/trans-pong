import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import './main.css'
import { setDefaultResultOrder } from 'dns'
import { useAtom, atom } from 'jotai'
import { useLogin } from 'components/App'
type DataIntput = {
  username: string
  email: string
}

export default function Login(Status) {
  const navigate = useNavigate()
  const [Navi, setNavi] = useState('/')
  const [islogin, setLogin] = useAtom(useLogin)
  const [inputs, setInputs] = useState<DataIntput>({ username: '', email: '' })
  const buttonHandler = (
    func: (input: DataIntput) => void,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    func(inputs)
    const button: HTMLButtonElement = event.currentTarget
  }

  const isLogged = async () => {
    fetch('http://localhost:3000/auth/verify', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        return data
      })
  }

  const check = async () => {
    console.log(islogin)

    fetch('http://localhost:3000/auth/verify', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (
          (islogin == 'should login' && data.user == 'no user') ||
          (islogin == 'reset' && data.user != 'no user')
        ) {
          login()
        } else {
          if (islogin === 'should login' || islogin === 'signout') {
            console.log('should login')
            setLogin('login')
            setNavi('/')
          }
        }
        return data
      })
  }
  const loginOffline = () => {
    setLogin('login')
  }

  const login = async () => {
    window.location.href =
      'https://api.intra.42.fr/oauth/authorize?client_id=0b768d33ad33083e6f78a8ac6cf1f546be68c17d7fa5bf6479233bab2905f978&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2F42login&response_type=code'
  }
  useEffect(() => {
    navigate(Navi)
  }, [])

  return (
    <div className="m-auto flex h-fit w-screen pb-[50px]">
      <div className="m-auto">
        <h1 className="font-kaushan text-[75px] text-white sm:text-[100px] md:text-[150px] lg:text-[200px] xl:text-[250px] ">
          trans-pong
        </h1>
        <button
          onClick={(event) => buttonHandler(loginOffline, event)}
          className="relative mr-2 mb-2 ml-[50%] translate-x-[-50%] rounded bg-pink-500 py-2 px-4 font-carattere text-lg font-bold text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
        >
          Login
        </button>
        <button
          className=" border-0  bg-slate-800 py-2 px-2.5 text-gray-200 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0"
          onClick={(event) => buttonHandler(check, event)}
          type="submit"
        >
          Login{' '}
        </button>
      </div>
    </div>
  )
}
