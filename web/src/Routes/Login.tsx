import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return(
    <div className="flex justify-center mt-36">
      <div className="flex items-center justify-between flex-col w-[360px] h-[600px] bg-zinc-800 rounded-xl">
        <img src="../src/assets/gig-friend.svg" alt="Gig Friend Logo" className="w-[212px] mt-12 mb-20" />

        <form className="flex flex-col items-center gap-2">
          <input onChange={event => setEmail(event.target.value)} type="text" placeholder="Email" className="bg-zinc-950 text-white pl-5 w-[325px] h-[55px] rounded-md"/>
          <input onChange={event => setPassword(event.target.value)} type="password" placeholder="Password" className="bg-zinc-950 text-white pl-5 w-[325px] h-[55px] rounded-md"/>

          <button type="submit" className="w-[240px] h-[50px] mt-7 bg-[#00875F] text-white rounded-md">LOGIN</button>
        </form>

        <a href="" className="text-[#00875F]">Forgot password?</a>

        <div className="flex gap-1 mb-4 mt-28">
          <span className="text-zinc-500">DON'T HAVE AN ACCOUNT? </span>
          <a href="" className="text-[#00875F]">SIGN UP</a>
        </div>
      </div>
    </div>
  )
}