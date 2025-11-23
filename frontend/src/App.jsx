import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar'
import { Route, Routes } from 'react-router-dom'
import AddTask from './components/addTask'
import TaskList from './components/list'
import UpdateTask from './components/updateTask'
import SignUp from './components/signUp'
import Login from './components/login'

function App() {

  return (
   <>
   <Navbar/>
   <Routes>
    <Route path='/' element={<TaskList/>}/>
    <Route path='/add' element={<AddTask/>}/>
    <Route path='/Update/:id' element={<UpdateTask/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/login' element={<Login/>}/>
   </Routes>
   </>
  )
}

export default App
