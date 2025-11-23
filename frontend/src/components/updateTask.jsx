import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom"


const UpdateTask = () => {
    const [taskData,setTaskData] = useState()

    const navigate = useNavigate()

    const { id } = useParams()

    useEffect(() => {
        getTask(id)
    }, [])

    const getTask = async (id) => {
        let response = await fetch('http://localhost:3500/task/'+id)
        let task = await response.json()
        setTaskData(task.result)
    }

    const handleUpdateTask = async(e) =>{
         e.preventDefault()
        let response = await fetch('http://localhost:3500/update-task/:id',{
            method:'Put',
            body:JSON.stringify(taskData),
            headers:{
                'Content-Type':'Application/Json'
            }
        })
        let updated = await response.json()
        if(updated){
         navigate('/')
             
        }
    }


    return (
        <div className="container">
            <h1>Update Task</h1>
            <form>
                <label htmlFor="">Title</label>
                <input
                    type="text"
                    name='title'
                    onChange={(e)=>setTaskData({...taskData,title:e.target.value})}
                    value={taskData?.title}
                    placeholder="enter task title" />
                <label htmlFor="">Description</label>
                <textarea
                    raws={4}
                    name="description"
                    onChange={(e)=>setTaskData({...taskData,description:e.target.value})}
                    value={taskData?.description}
                    placeholder="enter task description"></textarea>
                <button type='submit' onClick={handleUpdateTask} className="submit">update Task</button>
            </form>
        </div>
    )
}

export default UpdateTask