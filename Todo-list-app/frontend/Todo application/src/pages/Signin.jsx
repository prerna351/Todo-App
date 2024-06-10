import React from 'react';
import Heading from '../components/Heading';
import InputBox from '../components/InputBox';
import Button from "../components/Button";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signin = () => {
    
    const [email, setEmail ] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  return (
    <div className=" h-screen flex justify-center">
    <div className="flex flex-col justify-center">
     <div className="rounded border-slate-950 border-2 bg-white w-full lg:w-72 text-center p-2 pb-20 lg:h-max px-4">
        <Heading label={"Sign In"}></Heading>

      <div className='flex flex-col justify-center mt-10 gap-1'>

      <InputBox onChange={(e) => {
        e.preventDefault();
        setEmail(e.target.value)
      }} placeholder={"Email"}></InputBox>

      <InputBox onChange={(e) => {
        e.preventDefault();
        setPassword(e.target.value)
      }} placeholder={"Password"}></InputBox>
      </div>
    
      <div className='w-full mt-4 mb-20'>
        <Button label={"Sign in"} onClick={async() => {
          try{
            const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
            email,
            password
           });
           localStorage.setItem("token", response.data.token);
          } catch(error){
            console.log(error.message);
          }
           
           navigate("/dashboard")
         }}>  
        </Button>    
     </div>
     </div>
    </div>
    </div>
    
  );
}

export default Signin;
