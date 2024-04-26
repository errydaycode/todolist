import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";
import { useActions } from "common/hooks";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasksSlice";
import { TaskType } from "features/TodolistsList/api/TasksApiTypes";
import s from "features/TodolistsList/ui/Todolist/Tasks/Task/Task.module.css";

type Props = {
  task: TaskType;
  todolistId: string;
};

export const Task = ({ task, todolistId }: Props) => {
  const { removeTask, updateTask } = useActions(tasksThunks);

  // removeTaskHandler
  // handleRemoveTask
  // onRemoveTask
  const removeTaskHandler = () => {
    removeTask({ taskId: task.id, todolistId });
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked
      ? TaskStatuses.Completed
      : TaskStatuses.New;
    updateTask({ taskId: task.id, domainModel: { status }, todolistId });
  };

  const changeTaskTitleHandler = (title: string) => {
    updateTask({ taskId: task.id, domainModel: { title }, todolistId });
  };

  let isTaskCompleted = task.status === TaskStatuses.Completed;
  return (
    <div key={task.id} className={isTaskCompleted ? s.isDone : ""}>
      <Checkbox
        checked={isTaskCompleted}
        color="primary"
        onChange={changeTaskStatusHandler}
      />

      <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
};
