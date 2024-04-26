import React, { useEffect } from "react";
import { TodolistDomainType } from "features/TodolistsList/model/todolists/todolistsSlice";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasksSlice";
import { useActions } from "common/hooks";
import { AddItemForm } from "common/components";
import { TaskType } from "features/TodolistsList/api/TasksApiTypes";
import { FilterTasksButtons } from "features/TodolistsList/ui/Todolist/FilterTasksButtons";
import { Tasks } from "features/TodolistsList/ui/Todolist/Tasks/Tasks";
import { TodolistTitle } from "features/TodolistsList/ui/Todolist/TodolistTitle/TodolistTitle";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist = function ({ todolist, tasks }: Props) {
  const { fetchTasks, addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskCb = (title: string) => {
    return addTask({ title, todolistId: todolist.id }).unwrap();
  };

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm
        addItem={addTaskCb}
        disabled={todolist.entityStatus === "loading"}
      />
      <Tasks todolist={todolist} tasks={tasks} />
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </div>
  );
};
