import { createSlice } from "@reduxjs/toolkit";

const loadTaskFromLocalStorage = () => {
    try{
        const data = localStorage.getItem('demoTasks')
        return data ? JSON.parse(data) : [];
    }
    catch (error) {
        return [error];
    }
}

const saveTaskToLocalStorage = (tasks) => {
    localStorage.setItem("demoTasks", JSON.stringify(tasks))
}

const taskSlice = createSlice({
    name:"tasks",
    initialState: {
        tasks: loadTaskFromLocalStorage(),
        filter: {
            status: 'all',
            search: ""
        }
    },

    reducers: {

        addTask: (state, action) => {
            state.tasks.push(action.payload)
            saveTaskToLocalStorage(state.tasks)
        },

        delTask: (state, action) => {
            state.tasks = state.tasks.filter(tasks => tasks.id !== action.payload)
            saveTaskToLocalStorage(state.tasks)
        },
        toggleComplete: (state, action) => {
            const task = state.tasks.find(t => t.id === action.payload );
            if(task) task.completed = !task.completed // task.completed: This retrieves the current boolean value of the task's completed status (either true or false)
        },

        editTask: (state, action) => {
            const {id, nextText} = action.payload; // JS destructuring, action.payload is an Object, it must have id, nextTask ingo. This info stored in id and nextTask variables.
            const task = state.tasks.find(t => t.id === id)
            if(task) task.text = nextText;  // text is the prop of task, this is assigned now to nextTask.
            saveTaskToLocalStorage(state.tasks)
        },

        setStatusFilter: (state, action) => {
            state.filter.status = action.payload; // Above initial state contains filter Object with status property
        },

        setSearchFilter: (state, action) => {
            state.filter.search = action.payload; // Above initial state contains filter Object with search property
        }
    }
})

export const {addTask, delTask, toggleComplete,editTask, setStatusFilter,setSearchFilter} = taskSlice.actions;
export default taskSlice.reducer;