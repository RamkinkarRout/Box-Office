import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Show from "./pages/Show";
import Starred from "./pages/Starred";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/starred" element={<Starred />} />
      <Route path="show/:id" element={<Show />} />
    </Routes>
  );
}

export default App;
