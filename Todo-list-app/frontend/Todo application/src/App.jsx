import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GetStarted from './pages/GetStarted'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import CreateTodo from './pages/CreateTodo'
// import UpdateTodo from './pages/UpdateTodo'
function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = {"/"} element={<GetStarted></GetStarted>}></Route>
          <Route path = {"/signup"} element={<Signup></Signup>}></Route>
          <Route path = {"/signin"} element={<Signin></Signin>}></Route>
          <Route path = {"/dashboard"} element={<Dashboard></Dashboard>}></Route>
          <Route path = {"/createTodo"} element={<CreateTodo></CreateTodo>}></Route>
          {/* <Route path = {"/updateTodo"} element={<UpdateTodo></UpdateTodo>}></Route> */}
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
