import { Fragment, useEffect, useState } from "react"
import '../style/list.css'
import { Link, Navigate, useNavigate } from "react-router-dom"

const TaskList = () => {
    const [todoList, setTodoList] = useState()
    const [selectedTask, setSelectedTask] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        fetchList()
    }, [])

    const fetchList = async () => {
        let respone = await fetch('http://localhost:3500/tasks',{
            // 
            credentials:'include'
        })
        let list = await respone.json()
        console.log(list)
        if (list) {
            setTodoList(list.result)
        }
    }

    const handleDelete = async (id) => {
        let item = await fetch('http://localhost:3500/delete/' + id, { method: 'delete' })
        let result = await item.json()
        if (result) {
            fetchList()
        } else {
            setSelectedTask([])
        }
    }

    const selectAll = (e) => {
        if (e.target.checked) {
            let items = todoList.map((item) => item._id)
            setSelectedTask(items)
        } else {
            setSelectedTask(e.target.checked)
        }
    }

    const selectSingleItem = (id) => {
        if (selectedTask.includes(id)) {
            let item = selectedTask.filter((item) => item != id)
            setSelectedTask([item])
        } else {
            setSelectedTask([id, ...selectedTask])
        }
    }

    const deleteMultiple = async () => {
        let item = await fetch('http://localhost:3500/delete-multiple/', {
            method: 'delete',
            body: JSON.stringify(selectedTask),
            headers: {
                'Content-Type': 'Application/Json'
            }
        })
        let result = await item.json()
        if (result) {
            fetchList()
        } else {
            setSelectedTask([])
        }
    }

    return (
        <div className="list-container">
            <h1>Todo List</h1>
            <button className="delete-item delete-multiple" onClick={deleteMultiple}>Delete</button>
            <ul className="task-list">
                <li className="list-header"><input type="checkbox" onChange={selectAll} /></li>
                <li className="list-header">S.No</li>
                <li className="list-header">Title</li>
                <li className="list-header">Description</li>
                <li className="list-header">Action</li>
                {
                    todoList?.map((item, index) => (
                        <Fragment key={item._id}>
                            <li className="list-item">
                                <input type="checkbox"
                                    checked={selectedTask.includes(item._id)}
                                    onChange={() => selectSingleItem(item._id)}
                                />
                            </li>
                            <li className="list-item">{index + 1}</li>
                            <li className="list-item">{item?.title}</li>
                            <li className="list-item">{item?.description}</li>
                            <li className="list-item">
                                <button onClick={() => handleDelete(item._id)} className="delete-item">Delete</button>
                                <Link to={"/update/" + item._id} className="update-item">Update</Link>
                            </li>

                        </Fragment>
                    ))
                }
            </ul>
        </div>
    )
}

export default TaskList