import { useDispatch, useSelector } from "react-redux";
import { editTask, toggleComplete, delTask, setSearchFilter, setStatusFilter } from "../redux/features/tasks/taskSlice";
import { useState } from "react";



const TaskList = () => {
   const {tasks, filter} = useSelector((state) => state.tasks)
   const dispatch = useDispatch();
   const [editId, setEditId] = useState(null);
   const [editText, setEditText] = useState('');
   console.log(tasks)

   const filteredTasks = tasks
   .filter(task => {
    if(filter.status === 'completed') return task.completed;
    if(filter.status === 'pending') return !task.completed;
    return true;
   })
   .filter(task => {
    const search = (filter.search || "").toLowerCase();
    const text = (task.text || "").toLowerCase();
    return text.includes(search);
  });
   //.filter(task => task.text.toLowerCase().includes(filter.search.toLowerCase()))
   

   const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
   }
   
   const handleEditSave = (id) => {
    if(editText.trim()) {
        dispatch(editTask({id, nextText: editText.trim()}))
        setEditId(null);
        setEditText('');
    }
   }
    console.log(tasks)
    return(
        <div>
                             {/* Search Task */}

            <input type="text" placeholder="Search tasks" value={filter.search} onChange={(e) => 
                dispatch(setSearchFilter(e.target.value))} className="w-full p-2 border rounded mb-4"></input>

                                {/* Filtering button Tasks */}
            <div className="flex gap-4 mb-4">
                {
                    ["all", "completed", "pending"].map((status, idx) => (
                        <button key ={idx}
                        onClick={() => {dispatch(setStatusFilter(status))}}
                        className={`px-5 py-2 rounded border ${filter.status === status ? 'bg-blue-500 text-white'
                            : 'bg-white'}`}> {status.charAt(0).toUpperCase() + status.slice(1)}</button>
                    ))
                }

            </div>

                              {/* Display Tasks */}
            {filteredTasks.length === 0 && <p> No tasks found.</p>}    
            <ul className="spce-y-2">
                {
                    filteredTasks.map(task => (
                        <li key={task.id} className="flex items-ceter justify-between p-3 border rounded">
                            <div className="flex items-ceter gap-2">
                                <input type="checkbox" 
                                checked={task.completed}
                                onChange={() => dispatch(toggleComplete(task.id))}
                                className="border rounded px-2"
                                />

                                {
                                    editId === task.id ? (
                                        <input type="text" value={editText} onChange={(e) => 
                                            setEditText(e.target.value)} className="border rounded px-2"
                                        /> ) : (<span className={task.completed ? 'line-through text-grey-500' : ""}>
                                            {task.text} </span>)  
                                }
                            </div>
                            
                            <div className="flex gap-2">
                                {
                                    editId === task.id ? (<button 
                                        onClick={() => handleEditSave(task.id)}
                                        className="text-gray-600 hover:underline cursor-pointer">Save</button>) : 
                                        (<button
                                            onClick={() => handleEdit(task.id, task.text)}
                                            className="text-blue-600 hover:underline cursor-pointer"
                                        >Edit</button>)
                                }

                                <button onClick={() => dispatch(delTask(task.id))} className="text-red-500
                                    hover:underline cursor-pointer  ">Delete</button>

                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default TaskList;