import React  from "react";
import HomePage from "./components/HomePage/HomePage";
import CustomAppBar from "./components/Layout/CustomAppBar";
import { Paper } from "@material-ui/core";

function App() {
  return (
    <Paper elevation={0}  style={{ background: "#FAFAFA" } }>
      <CustomAppBar></CustomAppBar>
      <HomePage></HomePage>
    </Paper>
  );
}

export default App;
