import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return <><h2>Home</h2><p>Đây là trang chủ của ứng dụng định tuyến.</p></>;
}
function About() {
  return <><h2>About</h2><p>Đây là trang giới thiệu của ứng dụng định tuyến.</p></>;
}
function App() {
  return (
    <BrowserRouter basename="/bai-tap/assignment-05/bai-9">
      <nav className="actions" aria-label="Hai trang trong ứng dụng">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
createRoot(document.getElementById("root")).render(<App />);
