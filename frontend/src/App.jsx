import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BlogList from "./components/BlogList";
import BlogDetails from "./components/BlogDetails";
import BlogForm from "./components/BlogForm";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/view/:id" element={<BlogDetails />} />
        <Route path="/edit/:id" element={<BlogForm />} />
        <Route path="/new" element={<BlogForm />} />
      </Routes>
    </Router>
  );
}

export default App;
