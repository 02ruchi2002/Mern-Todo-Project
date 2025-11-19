import { useEffect, useState } from "react"
import '../style/list.css'

const TaskList = () =>{

    const [todoList,setTodoList] = useState()

    // console.log(todoList)

  const fetchList = async () => {
        let respone = await fetch('http://localhost:3500/tasks')
        let list = await respone.json()
        console.log(list)
        if(list){
            setTodoList(list.result)
        }
    }

    useEffect(()=>{
        fetchList()
    },[])

    return(
        <div>
            <h1>Todo List</h1>
            <ul className="task-list">
                <li className="list-header">S.No</li>
                <li className="list-header">Title</li>
                <li className="list-header">Description</li>
                {
                   todoList?.map((item,index)=>(
                    <>
                    <li className="list-item">{index+1}</li>
                    <li className="list-item">{item?.title}</li>
                    <li className="list-item">{item?.description}</li>
                    </>
                   ))
                }
            </ul>
        </div>
    )
}

export default TaskList