import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";

export const Register = () => {
  const [password, setpassword] = useState("");
  const [cnfpassword, setcnf] = useState("");
  const [passerror, setpasserror] = useState("");
  const { register, handleSubmit } = useForm();

  const Navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await fetch("https://expense-management-oj0z.onrender.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    const result = await res.json();
    if (result.message) {
      alert(result.message);
    }
    Navigate('/login');
  };

  useEffect(() => {
    if (password && cnfpassword) {
      if (password === cnfpassword) {
        setpasserror("");
      } else {
        setpasserror("Passwords do not match");
      }
    } else {
      setpasserror("");
    }
  }, [password, cnfpassword]);

  useEffect(()=>{
    if(localStorage.getItem('user')){
      Navigate("/");
    }
  },[Navigate]);

  return (
    <>
      <div className="headings  p-5 mt-6">
        <h1 className="w-fit ml-[4rem] text-2xl font-Playwrite">Register</h1>
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
            {...register("email", { required: true })}
            sx={{ width: "25rem", borderRadius: "25px", border: 0, outline: 0 }}
            label="Email Address"
            className="removeoutline"
            type="text"
          />
          <br />

          <br />
          <TextField
            {...register("name", { required: true })}
            sx={{ width: "25rem", borderRadius: "25px", border: 0, outline: 0 }}
            label="Name"
            className="removeoutline"
            type="text"
          />
          <br />
          <br />
          <TextField
            {...register("password", { required: true })}
            sx={{ width: "25rem" }}
            onChange={(e) => setpassword(e.target.value)}
            label="Password"
            type="password"
          />
          <br />
          <br />
          <TextField
            {...register("cnfpassword", { required: true })}
            sx={{ width: "25rem" }}
            onChange={(e) => setcnf(e.target.value)}
            label="Confirm Password"
            type="password"
          />
          {passerror && <p style={{ color: "red" }}>{passerror}</p>}
          <input
            onSubmit={onSubmit}
            className="w-[25rem] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
            type="submit"
            value="Submit"
          />
          {/* <div className="loader mt-3 flex justify-center w-[25rem]">{Submit && <Spinner/>}  </div> */}
        </form>
        <div className="register w-[25rem] ml-[4rem] flex-col justify-center items-center mt-4">
          <p className="text-center">Already Register?</p>
          <Link
            to="/"
            className="w-[25rem] bg-[#fff] h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-black"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
};
