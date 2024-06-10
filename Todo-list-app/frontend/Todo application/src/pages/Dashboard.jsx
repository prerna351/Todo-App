import React from 'react';
import Heading from '../components/Heading';
import TaskBox from '../components/TaskBox';
import AddTaskButton from '../components/AddTaskButton';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/todo/mytodo",{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response =>{setTodos(response.data)})
        
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);



  const handleToggleTodo = async (todoId) => {
    const todo = todos.find(t => t._id === todoId);
    if (!todo) {
      console.error("Todo not found");
      return;
    }

    const updatedStatus = !todo.completed;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      await axios.put("http://localhost:3000/api/v1/todo/updateTodo", {
        todoId: todoId,
        completed: updatedStatus
      }, {
        headers: {
          Authorization: token
        }
      });

      // Update the state to reflect the toggled status
      setTodos(prevTodos => prevTodos.map(todo =>
        todo._id === todoId ? { ...todo, completed: updatedStatus } : todo
      ));
    } catch (error) {
      console.error("Error updating todo:", error.message);
    }
  };



  const handleDeleteTodo = async (todoId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      await axios.delete("http://localhost:3000/api/v1/todo/deleteTodo", {
        headers: {
          Authorization: token
        },
        data: {
          todoId: todoId
        }
        
      });
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoId));
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    }
  }


  return (
    
    <div className=" h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded border-slate-950 border-2 bg-white w-full lg:w-72 text-center p-2 pb-20 lg:h-max px-4">
                <Heading label={"Your Tasks"}></Heading>

                <div className=' mt-5 '>
                    {todos.length === 0 ? (<p> </p>): (
                        <ul>
                            {todos.map((todo) => (
                            <li key={todo._id} className="mb-2">
                                
                                <div className=' relative flex h-15'>
                                <TaskBox todos_title={todo.title} onClick={() => handleToggleTodo(todo._id)} ></TaskBox>
                                <div onClick={() => handleDeleteTodo(todo._id)} className='w-10 h-6 '><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 cursor-pointer absolute inset-y-3 right-0  ">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>

                                </div>
                                </div>
                                
                            </li>
                        ))}
                        </ul>
                    )}
                </div>
                
                <div className='mt-1 mb-10'>
                    <AddTaskButton onClick={() => {
                        navigate("/createTodo")
                    }} label={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    }></AddTaskButton>
                </div>
            </div>
        </div>    
    </div>
  )
}

export default Dashboard;
