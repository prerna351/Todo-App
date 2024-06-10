import React from 'react';
import Heading from '../components/Heading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';



const CreateTodo = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription ] = useState("");
    // const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();


    const handleCreateTodo = async() => {
        // if (title.length > 50) {
        //     setErrorMessage("Title cannot exceed 50 characters");
        //     return;
        // }
        await axios.post("http://localhost:3000/api/v1/todo/createTodo",{
        title,
        description
        },{
        headers: {
            Authorization: localStorage.getItem("token")
        }
        });
    
        navigate("/dashboard")
        }

        
        

  return (
    <div className=" h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded border-slate-950 border-2 bg-white w-full lg:w-72 text-center p-2 pb-20 lg:h-max px-4">
                <Heading label={"Create Your Task"}></Heading>

                <div className='flex flex-col justify-center mt-10 '>
        <InputBox onChange={(e) => {
             e.preventDefault();
            setTitle(e.target.value)
            // if (e.target.value.length > 50) {
            //     setErrorMessage("Title cannot exceed 50 characters");
            //   } else {
            //     setErrorMessage("");
            //   }
        }} placeholder={"Title"}></InputBox>

      <InputBox onChange={(e) => {
        e.preventDefault();
        setDescription(e.target.value)
      }} placeholder={"Description"}></InputBox>

      
      </div>
    
      <div className='w-full mt-2 mb-20 '>
        <Button label={"Create"} onClick={handleCreateTodo}>
        </Button>    
     </div>
            </div>
        </div>
    </div> 
  );
}

export default CreateTodo;
