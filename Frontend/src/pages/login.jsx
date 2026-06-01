import React, { useState } from "react";
import Google from "../assests/google.png";
import Github from "../assests/github.png";
import Check from "../assests/check.png";
import EmailImg from "../assests/email.png";
import Locked from "../assests/locked-computer.png";
import Man from "../assests/man.jpeg";
import View from "../assests/view.png"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
   const [ErrorMsg,setErrorMsg]=useState("");
  const Navigate = useNavigate();
  const onSubmitHandler =async (e) => {
    e.preventDefault();

    if(!Email.trim()||!Password.trim()){
      setErrorMsg("Please fill in all fields!");
      return;
    }
    try{
    await axios.post(
      "/api/auth/login",
      {Email,Password},
      {withCredentials:true}
    );
    Navigate("/feed")
  }catch(error){
    setErrorMsg(error.response?.data?.message)
  }

    console.log("Email=",Email);
    console.log("Password=",Password);

    setEmail("");
    setPassword("");
  };



  const signPage = () => {
    setTimeout(() => {
      Navigate("/");
    }, 300);
  };

  return (
    <div className='bg-[url("https://images.unsplash.com/photo-1614850523011-8f49ffc73908?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] w-full min-h-screen bg-center bg-cover text-white flex justify-center items-start p-5 md:justify-between md:gap-5 md:px-15'>
      <div className="w-fit min-h-fit text-white hidden md:block">
        <div className="w-fit h-fit flex justify-center items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-md flex justify-center items-center">
            <img src={Check} className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold ">
            Task<span className="text-blue-500">Flow</span>
          </h1>
          <div></div>
        </div>

        <h1 className="text-3xl font-bold mt-2">Welcome Back!</h1>

        <p className="text-sm mt-3">
          Login to continue managing your tasks and boost your productivity
        </p>

        <div className="w-fit h-fit mt-2">
          <img src={Man} className="w-120 h-57 rounded-xl" />
        </div>

        <div className="w-fit h-fit text-white flex justify-between items-center gap-5 mt-3">
          <div className="flex gap-2 justify-center items-center">
            <span className="h-6 w-6 bg-blue-600 rounded-full text-white flex justify-center items-center">
              ✔️
            </span>
            <div>
              <h1 className="text-[13px] font-bold cursor-pointer">
                Organize Tasks
              </h1>
              <p className="text-[12px] text-gray-300 cursor-pointer">
                Story on top of
                <br />
                your tasks
              </p>
            </div>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <span className="h-6 w-6 bg-blue-600 rounded-full flex justify-center items-center">
              ⚡
            </span>
            <div>
              <h1 className="text-[13px] font-bold cursor-pointer">
                Boost productivity
              </h1>
              <p className="text-[12px] text-gray-300 cursor-pointer">
                Get more done in
                <br />
                less time
              </p>
            </div>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <span className="h-6 w-6 bg-blue-600 rounded-full flex justify-center items-center">
              🛡️
            </span>
            <div>
              <h1 className="text-[13px] font-bold cursor-pointer">
                Data Secure
              </h1>
              <p className="text-[12px] text-gray-300 cursor-pointer">
                Your data is safe
                <br />
                with us
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-fit md:w-95 bg-gray-200 p-4 md:p-2 md:px-12 text-black rounded-xl">
        <div className="w-full flex justify-center items-center text-blue-800 md:hidden">
          <img src={Check} className="w-15 h-15 rounded-2xl" />
        </div>

        <h1 className="text-center mt-4 text-3xl font-bold md:hidden">
          Task<span className="text-blue-800">Flow</span>
        </h1>
        <p className="text-center text-sm text-gray-500 md:hidden">
          Manage your tasks, boost productivity
        </p>

        <h1 className="text-center mt-5 text-xl font-bold md:hidden">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 text-sm md:hidden">
          Login to continue to your account
        </p>

        <h1 className="hidden md:block text-center text-[18px] font-bold">
          Login to your account
        </h1>
        <p className="hidden md:block text-center text-sm text-gray-500">
          Enter your credential to continue
        </p>

        <form
          className="w-full h-fit mt-3 md:mt-2"
          onSubmit={(e) => {
            onSubmitHandler(e);
          }}
        >
          <p className="text-center text-red-500 text-sm mb-2">{ErrorMsg}</p>
          <div className="w-full h-fit flex justify-center items-center bg-white border rounded-md px-3">
            <img src={EmailImg} className="w-4 h-4" />
            <input
              type="emain"
              placeholder="Emain or Username"
              className=" w-full bg-white py-3 md:py-2 px-3 rounded-md outline-0 text-md"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="w-full h-fit flex justify-center items-center bg-white border rounded-md px-3 mt-3">
            <img src={Locked} className="w-4 h-4" />
            <input
              type="Password"
              placeholder="Password"
              className="w-full bg-white py-3 md:py-2 px-3 rounded-md outline-0 text-md"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <img src={View} className="w-4 h-4 cursor-pointer"/>
          </div>

          <p className="text-end mt-3 md:mt-1 text-blue-700 cursor-pointer md:text-md hover:text-red-400 transition-all duration-250 ease">
            Forgot Password?
          </p>
          <button className="w-full py-3 px-4 bg-blue-700 text-white rounded-md outline-0 mt-4 md:mt-3 cursor-pointer text-md md:py-2 active:scale-97 transition-all duration-250 ease hover:opacity-80">
            Login
          </button>
        </form>
        <hr className="mt-4" />
        <button className="w-full py-3 px-4 bg-white rounded-md mt-4 cursor-pointer text-md flex justify-center items-center gap-4 md:py-2 active:scale-97 transition-all duration-250 ease">
          <img src={Google} className="w-4 h-4" />
          Continue with Google
        </button>

        <button className="w-full py-3 px-4 bg-white rounded-md mt-3 cursor-pointer text-md flex justify-center items-center gap-4 md:py-2 active:scale-97 transition-all duration-250 ease">
          <img src={Github} className="h-4 w-4" />
          Continue with Github
        </button>

        <p className="text-center mt-4 text-md md:text-sm">
          Don't have an account?
          <span
            className="text-blue-700 cursor-pointer transition-all duration-100 ease-in hover:text-red-500 hover:underline"
            onClick={() => {
              signPage();
            }}
          >
            {" "}
            Sign Up
          </span>
        </p>
        <div className="w-full h-10 md:h-2 "></div>
      </div>
    </div>
  );
};

export default Login;
