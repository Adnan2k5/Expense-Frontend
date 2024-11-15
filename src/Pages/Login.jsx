import { TextField } from "@mui/material";
import React, { useEffect } from "react";
import { message } from "antd";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import login from '../Assets/login.jpg';
export const Login = () => {
  const Navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await fetch("https://expense-management-oj0z.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      if (res.ok) {
        const result = await res.json();
        localStorage.setItem(
          "user",
          JSON.stringify({ ...result.user, password: "" })
        );
        message.success("Login Successful");
        Navigate(result.redirectUrl);
      } else {
        message.error("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    if(localStorage.getItem('user')){
      Navigate("/");
    }
  },[Navigate]);

  return (
    <div className="container bg-gradient-to-br from-white to- w-[100vw] h-[100vh] m-auto flex">
      <div className="login-side w-[100%] m-auto  flex-col h-[100%]">
        <div className="logo p-5 text-2xl mt-12">
          <h1 className="font-Playwrite ml-[4rem] w-fit">Expense Management</h1>
        </div>
        <div className="headings  p-5 mt-6">
          <h1 className="w-fit ml-[4rem] text-2xl font-Playwrite">
            Welcome Back!
          </h1>
          <br />
          <p className="w-fit ml-[4rem]">Please enter log in details below</p>
        </div>
        <div className="login-form w-[100%] p-5 flex-col ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="ml-[4rem]"
            method="POST"
            action=""
          >
            <TextField
              {...register("username", { required: true })}
              sx={{
                width: "25rem",
                borderRadius: "25px",
                border: 0,
                outline: 0,
              }}
              label="Email"
              className="removeoutline"
              type="text"
            />
            <br />

            <br />
            <TextField
              {...register("password", { required: true })}
              sx={{ width: "25rem" }}
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <br />
            <br />
            <input
              onSubmit={onSubmit}
              className="w-[25rem] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
              type="submit"
              value="Submit"
            />
          </form>
          <div className="forgot text-right ml-[4rem] w-[25rem]">
            <p>Forgot Password?</p>
          </div>
          <div className="register w-[25rem] ml-[4rem] flex-col justify-center items-center mt-4">
            <p className="text-center">Or Sign-Up</p>
            <Link
              to="/register"
              className="w-[25rem] bg-[#fff] h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-black"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
      <div className="login-img flex items-center justify-center w-[100%]  h-[100%]">
        <img className="rounded-3xl" src={login} alt='login'/>
      </div>
    </div>
  );
};
