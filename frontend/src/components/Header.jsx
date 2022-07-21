import React from "react";
import { AppBar, Button, Box, Toolbar, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../store";
const Header = () => {
  const [val, setval] = useState();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          " radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
      }}
    >
      <Toolbar>
        <Typography variant="h4">BlogApps</Typography>

        {isLoggedIn && (
          <Box display="flex" marginLeft="auto" marginRight="auto">
            <Tabs
              value={val}
              onChange={(e, val) => setval(val)}
              textColor="inherit"
            >
              <Tab
                LinkComponent={Link}
                to="/blogs"
                sx={{ textTransform: "None", fontWeight: "Bold" }}
                label="All Blogs"
              />
              <Tab
                LinkComponent={Link}
                to="/myBlogs"
                sx={{ textTransform: "None", fontWeight: "Bold" }}
                label="My Blogs"
              />
              <Tab
                LinkComponent={Link}
                to="/blogs/add"
                sx={{ textTransform: "None", fontWeight: "Bold" }}
                label="Post Blog"
              />
            </Tabs>
          </Box>
        )}

        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
              >
                Login
              </Button>
              <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
              >
                Sign up
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              onClick={()=>dispatch(authAction.logout())}
              LinkComponent={Link}
              to="/auth"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              color="warning"
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
