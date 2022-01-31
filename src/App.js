import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "./pages/Home";
import Show from "./pages/Show";
import Starred from "./pages/Starred";

const theme = {
  mainColors: {
    blue: "#2400ff",
    gray: "#c6c6c6",
    dark: "#353535",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/starred" element={<Starred />} />
        <Route path="show/:id" element={<Show />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
