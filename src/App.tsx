import React from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    const tasks = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 3, title: "Redux", isDone: false }
    ]

    function removeTask(id: number) {
        debugger
        let resultTasks = tasks.filter( () => {return true} )
        console.log(resultTasks)
    }


    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks} removeTask={removeTask} />

        </div>
    );
}

export default App;
