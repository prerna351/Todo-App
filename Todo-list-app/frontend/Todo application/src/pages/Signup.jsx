import React, { useState } from 'react';
import Heading from '../components/Heading';
import InputBox from '../components/InputBox';
import Button from "../components/Button";
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';


const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail ] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
  return (
    <div className=" h-screen flex justify-center">
    <div className="flex flex-col justify-center">
     <div className="rounded border-slate-950 border-2 bg-white w-full lg:w-72 text-center p-2 lg:h-max px-4">
        <Heading label={"Sign Up"}></Heading>

      <div className='flex flex-col justify-center mt-10 gap-1'>
        <InputBox onChange={(e) => {
             e.preventDefault();
            setUsername(e.target.value)
        }} placeholder={"Name"}></InputBox>

      <InputBox onChange={(e) => {
        e.preventDefault();
        setEmail(e.target.value)
      }} placeholder={"Email"}></InputBox>

      <InputBox onChange={(e) => {
        e.preventDefault();
        setPassword(e.target.value)
      }} placeholder={"Password"}></InputBox>
      </div>
    
      <div className='w-full mt-1 '>
        <Button label={"Sign up"} onClick={async() => {
         try{
          await axios.post("http://localhost:3000/api/v1/user/signup",{
            username,
            email,
            password
           });
         } catch(error){
            console.log(error.message);
         }
           navigate("/signin")
         }}>  
        </Button>    
     </div>
     <div className='flex flex-row justify-between items-baseline'>
        <div className='bg-gray-200 h-1 rounded-sm w-28'></div>
        <div className="text-xs text-gray-400">or</div>
        <div className='bg-gray-200 h-1 rounded-sm w-28'></div>
     </div>
     <div className='w-full mt-5 mb-10'>
        <Link to="/signin" className="w-full text-white bg-gray-200 hover:bg-gray-900 focus:outline-none  font-medium rounded text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
        Login
        </Link>
     </div>
     </div>
    </div>
    </div>
    
  );
}

export default Signup;
