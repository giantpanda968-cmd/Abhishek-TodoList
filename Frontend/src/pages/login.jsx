import { Link, useNavigate } from "react-router-dom";
import View from "../assets/view.png";
import Google from "../assets/google.png";
import Mail from "../assets/mail.png";
import Lock from "../assets/padlock.png";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Showpass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const onsubmithandler = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter Email or Password");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        {
          email,
          password,
        },
      );

      const { name, jwtToken } = response.data;

      localStorage.setItem("token", jwtToken);
      localStorage.setItem("loggedInuser", name);

      toast.success(response.data.message);

      setEmail("");
      setPassword("");
      navigate("/task");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 flex justify-center items-start p-2">
      <div className="text-black bg-gray-100 w-full md:w-100 p-3 rounded-md">
        <h1 className="bg-slate-800 text-white text-center py-3 rounded-md text-xl font-bold">
          Login
        </h1>
        <h1 className="text-center mt-3 text-2xl font-bold">
          Task <span className="text-red-600">Flow</span>
        </h1>
        <form
          noValidate
          className="mt-3"
          onSubmit={(e) => {
            onsubmithandler(e);
          }}
        >
          <div className="flex border justify-center items-center rounded-md py-3 px-3 gap-2">
            <img src={Mail} className="w-5 h-5" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full  outline-0 text-xl "
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="flex border justify-center items-center rounded-md py-3 px-3 gap-2 mt-4">
            <img src={Lock} className="w-5 h-5 cursor-pointer" />
            <input
              type={Showpass ? "text" : "password"}
              placeholder="Password"
              className="w-full  outline-0 text-xl"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <img
              src={View}
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                setShowPass(!Showpass);
              }}
            />
          </div>
          <p className="text-end mt-2 text-blue-600">Forgot Password?</p>
          <button
            className="border py-3 w-full rounded-md text-xl bg-slate-700 text-white mt-4 active:scale-97 cursor-pointer"
            type="submit"
          >
            Login
          </button>
        </form>
        <hr className="mt-3" />
        <button className="border py-3 w-full mt-4 rounded-md bg-white text-md flex justify-center items-center gap-3 active:scale-97 cursor-pointer">
          <img src={Google} className="w-4 h-4 " />
          Cotinue with Google
        </button>
        <p className="text-center mt-3">
          Don't have an account?
          <Link to={"/signup"} className="cursor-pointer text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
