import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {


    let [tasks, setTasks] = useState< Array<TaskType> >([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "Redux", isDone: false }
    ]);
    let [filter, setFilter] = useState<FilterValuesType>('all')
    function removeTask(id: number) {
        let filteredTasks = tasks.filter( t =>  t.id !== id)
        setTasks(filteredTasks)
    }

    function changeFilter (value: FilterValuesType ) {
        setFilter(value)
    }

    let tasksForToDoList = tasks
    if (filter === 'completed') {
        tasksForToDoList = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tasksForToDoList = tasks.filter(t => !t.isDone)
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForToDoList}
                      removeTask={removeTask}
                      changeFilter ={changeFilter}/>

        </div>
    );
}

export default App;
