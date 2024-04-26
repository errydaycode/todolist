import {
  AppBar,
  Button,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { selectAppStatus } from "app/model/app.selectors";
import { useActions } from "common/hooks";
import { authThunks } from "features/auth/model/auth.slice";

export const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const status = useSelector(selectAppStatus);
  const logoutHandler = () => logout();
  const { logout } = useActions(authThunks);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        <Typography variant="h6"></Typography>
        {isLoggedIn && (
          <Button color="inherit" onClick={logoutHandler}>
            Log out
          </Button>
        )}
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  );
};
