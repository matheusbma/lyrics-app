import { useState } from "react";
import axios from "axios";

// import { useNavigate } from "react-router-dom";

import { ImageSignUpUpload } from "../components/ImageSignUpUpload";
import { ImageSignUpModal } from "../components/ImageSignUpModal";
// import { setAuthUser } from "../utils/auth";



export function SignUp() {
  // const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");

  function handleCropImage(image: string) {
    setImage(image);
  }

  function handleOpenModal() {
    setShow(true);
  }
  
  function handleCloseModal() {
    setShow(false);
  }

  function handleSignUp() {
    axios
      .post("http://localhost:7000/signup", {
        email: email, 
        name: name, 
        password: password, 
        confirmPassword: confirmPassword, 
        image: image,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="flex justify-center  mt-16">
      <div className="flex items-center justify-between flex-col w-[360px] h-[780px] bg-zinc-800 rounded-xl">
        
        <img
          src="../src/assets/gig-friend.svg"
          alt="Gig Friend Logo"
          className="w-[212px] mt-16"
        />

        < ImageSignUpUpload onClick={handleOpenModal} src={image} />
        < ImageSignUpModal avatarImage={handleCropImage} modalIsOpen={show} modalIsClose={handleCloseModal} />

        <form className="flex flex-col items-center gap-5">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="mt-2 bg-zinc-950 text-white pl-5 w-[325px] h-[55px] rounded-md"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            className="bg-zinc-950 text-white pl-5 w-[325px] h-[55px] rounded-md"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="bg-zinc-950 text-white pl-5 w-[325px] h-[55px] rounded-md"
          />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm your password"
            className="bg-zinc-950 text-white pl-5 w-[325px] h-[55px] rounded-md"
          />
        </form>
        <button
          onClick={handleSignUp}
          type="submit"
          className="w-[240px] h-[50px] bg-[#00875F] mb-12 text-white rounded-md"
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
}
