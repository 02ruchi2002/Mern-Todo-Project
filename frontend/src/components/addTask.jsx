import { useNavigate } from 'react-router-dom'
import '../style/addTask.css'
import { useState } from 'react'

const AddTask = () => {

    const [taskData, setTaskData] = useState()
    const navigate = useNavigate()

    const handleAddTask = async(e) => {
        e.preventDefault()
       let respone = await fetch('http://localhost:3500/add-task',{
          method:'Post',
          body:JSON.stringify(taskData),
          headers:{
            "Content-Type":"Application/Json"
          }
       })
       if(respone){
        navigate('/')
       }

    }
    return (
        <div className="container">
            <h1>Add New Task</h1>
            <form>
                <label htmlFor="">Title</label>
                <input
                    type="text"
                    name='title'
                    onChange={(e) => setTaskData({ ...taskData,title:e.target.value})}
                    placeholder="enter task title" />
                <label htmlFor="">Description</label>
                <textarea
                    raws={4}
                    name="description"
                    onChange={(e) => setTaskData({ ...taskData,description:e.target.value})}
                    placeholder="enter task description"></textarea>
                <button type='submit' onClick={handleAddTask} className="submit">Add New Task</button>
            </form>
        </div>
    )
}

export default AddTask