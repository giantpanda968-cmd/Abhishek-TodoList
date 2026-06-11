import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import View from "../assets/view.png";
import Google from "../assets/google.png";
import axios from "axios";
import toast from "react-hot-toast";
import Lock from "../assets/padlock.png";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("Fill the All Fields");
      return;
    }
    if (password !== confirmPass) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/signup",
        {
          name,
          email,
          password,
        },
      );

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPass("");

      toast.success(response.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="bg-slate-950 w-full min-h-screen text-white flex justify-center items-start p-3">
      <div className="bg-gray-100 text-black w-full md:w-100 p-4 rounded-md">
        <h1 className="text-center text-2xl font-bold">
          Create an <span className="text-red-600">Account</span>
        </h1>
        <p className="text-center text-gray-600">Sign up to get started</p>

        <form
          noValidate
          className="mt-4 flex justify-center items-center flex-col gap-3"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Name"
            className="w-full border py-3 px-3 text-xl rounded-md bg-white outline-0"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border w-full py-3 px-3 text-xl rounded-md bg-white outline-0"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="flex items-center border bg-white rounded-md w-full gap-1 px-2">
            <img src={Lock} className="w-4 h-4" />
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="w-full py-3 text-xl rounded-md outline-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img
              src={View}
              className="w-4 h-4 cursor-pointer"
              role="button"
              aria-label={showPass ? "Hide password" : "Show password"}
              onClick={() => setShowPass(!showPass)}
            />
          </div>
          <div className="flex items-center border w-full rounded-md px-2 bg-white gap-1">
            <img src={Lock} className="w-4 h-4" />
            <input
              type={showConfirmPass ? "text" : "password"}
              placeholder="Confirm password"
              className="py-3 rounded-md w-full text-xl outline-0"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
            />
            <img
              src={View}
              className="w-4 h-4 cursor-pointer"
              role="button"
              aria-label={showConfirmPass ? "Hide password" : "Show password"}
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            />
          </div>
          <button
            type="submit"
            className="border py-3 w-full rounded-md mt-3 bg-blue-700 text-white cursor-pointer text-xl disabled:opacity-50 active:scale-97"
          >
            Create new Account
          </button>
        </form>

        <hr className="mt-4" />
        <button className="bg-white w-full border py-3 text-xl mt-4 rounded-md flex justify-center items-center gap-3 active:scale-97 cursor-pointer">
          <img src={Google} className="w-4 h-4" alt="Google" />
          Continue with Google
        </button>
        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
