import React from "react";
import Header from "../src/components/header";
import "./App.css";


const App = ({ children }) =>
  <>
    <Header />
    {children} 
  </>;

export default App;
