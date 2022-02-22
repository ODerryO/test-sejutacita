import React from "react";
import Home from "../component/home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function Rute() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
      </Routes>
      
    </Router>
  )

}

export default Rute