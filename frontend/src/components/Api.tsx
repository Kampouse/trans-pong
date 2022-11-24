import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { InputType } from 'zlib'
import { Console } from 'console'

type ApiOutput = { message: string | null }
//  a type for the input to the API call to the backend that check if a user as this email and username in the database
type DataIntput = {
  username: string
  email: string
}

export default function Api() {
  const [data, setData] = useState<ApiOutput>({ message: null })
  const [inputs, setInputs] = useState<DataIntput>({ username: '', email: '' })
  const [shouldTrigger, setShouldTrigger] = useState(false)
  const nav = useNavigate()

  /* generic function to handle the input change */
  const buttonHandler = (
    func: (input: DataIntput) => void,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    func(inputs)
    const button: HTMLButtonElement = event.currentTarget
  }

  const getAllUsers = async () => {
    fetch('http://localhost:3000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        return data
      })
  }
  const check = async () => {
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
        if (data.user === 'no user') {
          login()
        } else {
          setShouldTrigger(!shouldTrigger)
        }
        return data
      })
  }
  const login = async () => {
    window.location.href =
      'https://api.intra.42.fr/oauth/authorize?client_id=0b768d33ad33083e6f78a8ac6cf1f546be68c17d7fa5bf6479233bab2905f978&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2F42login&response_type=code'
  }
  const PostVerifUser = async (
    input: DataIntput,
    func?: (input: DataIntput) => void
  ) => {
    const response = await fetch(
      'http://localhost:3000/users/exists/' +
        input.email +
        '/' +
        input.username,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    )
    const data = await response.json()
    const dataArr: Array<InputType> = data
    if (dataArr.length == 0 && func !== undefined) func(input)
    else {
      // maybe send a message to the user that the username or email is already taken
      console.log('user already exists')
    }
    return data
  }

  const CreateUser = async (Data: DataIntput) => {
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Data)
    })
      .then((response) => response.json())
      .then((data) => {
        return data
      })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value
    }))
  }
  useEffect(() => {
    if (shouldTrigger) {
      return nav('/')
      getAllUsers()
    }
  }, [shouldTrigger])
  return (
    <>
      <div className="flex flex-col justify-center items-center pt-20 ">
        <form
          className="flex flex-col justify-center items-center pt-20 "
          onSubmit={() => {
            CreateUser(inputs)
            console.log('did it send')
          }}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            onChange={handleInputChange}
            name="username"
            id="username"
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            onChange={handleInputChange}
            name="email"
            id="email"
          />
          <button
            className=" border-0  py-2 px-2.5 bg-slate-800 text-gray-200 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0"
            onClick={(event) =>
              buttonHandler(() => {
                PostVerifUser(inputs, CreateUser)
              }, event)
            }
            type="submit"
          >
            send data{' '}
          </button>
        </form>
        // button that trigger login function
        <button
          className=" border-0  py-2 px-2.5 bg-slate-800 text-gray-200 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0"
          onClick={(event) => buttonHandler(check, event)}
          type="submit"
        >
          Login{' '}
        </button>
      </div>
    </>
  )
}
