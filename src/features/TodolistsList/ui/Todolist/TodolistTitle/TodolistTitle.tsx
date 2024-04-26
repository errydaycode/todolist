import React from "react";
import { EditableSpan } from "common/components";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useActions } from "common/hooks";
import {
  TodolistDomainType,
  todolistsThunks,
} from "features/TodolistsList/model/todolists/todolistsSlice";

type Props = {
  todolist: TodolistDomainType;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);
  const { id, entityStatus, title } = todolist;

  const removeTodolistHandler = () => {
    removeTodolist(id);
  };

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle({ id, title });
  };

  return (
    <h3>
      <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
      <IconButton
        onClick={removeTodolistHandler}
        disabled={entityStatus === "loading"}
      >
        <Delete />
      </IconButton>
    </h3>
  );
};
