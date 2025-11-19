import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar'
import { Route, Routes } from 'react-router-dom'
import AddTask from './components/addTask'
import TaskList from './components/list'

function App() {

  return (
   <>
   <Navbar/>
   <Routes>
    <Route path='/' element={<TaskList/>}/>
    <Route path='/add' element={<AddTask/>}/>
   </Routes>
   </>
  )
}

export default App
