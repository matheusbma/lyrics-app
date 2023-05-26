import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { setAuthUser } from "../utils/auth";
import { UserType } from "../types/UserType";

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    axios
      .post("http://localhost:7777/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        const user:UserType = response.data.user;
        setAuthUser(user);
        navigate("/setlists");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleForgot() {
    navigate("/forgot");
  }

  function handleSignUp() {
    navigate("/signup");
  }

  return (
    <div className="flex justify-center mt-36">
      <div className="flex items-center justify-between flex-col w-[360px] h-[600px] bg-zinc-800 rounded-xl">
        <a href="/" className="mt-12 mb-20">
          <img
            src="../src/assets/gig-friend.svg"
            alt="Gig Friend Logo"
            className="w-[212px] "
          />
        </a>

        <form className="flex flex-col items-center gap-2">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="bg-zinc-950 text-white pl-5 w-[325px] h-[55px] rounded-md"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="bg-zinc-950 text-white pl-5 w-[325px] h-[55px] rounded-md"
          />
        </form>
        <button
          onClick={handleLogin}
          type="submit"
          className="w-[240px] h-[50px] bg-[#00875F] text-white rounded-md"
        >
          LOGIN
        </button>

        <button onClick={handleForgot} className="text-[#00875F]">
          Forgot password?
        </button>

        <div className="flex gap-1 mb-4 mt-28">
          <span className="text-zinc-500">DON'T HAVE AN ACCOUNT? </span>
          <button onClick={handleSignUp} className="text-[#00875F]">
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
}
