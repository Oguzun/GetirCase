import React,{Fragment} from "react";
import HomePage from "./components/HomePage/HomePage";
import CustomAppBar from "./components/Layout/CustomAppBar";


function App() {
 
  return (
    <Fragment>
      <CustomAppBar></CustomAppBar>
      <HomePage></HomePage>
    </Fragment>
  );
}

export default App;
