import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Editor from "./pages/Editor";
import PostDetail from "./pages/PostDetail";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";

function App() {

  useEffect(() => {

    const glow =
      document.querySelector(
        ".cursor-glow"
      );

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    const moveGlow = (e) => {

      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener(
      "mousemove",
      moveGlow
    );

    const animate = () => {

      currentX +=
        (mouseX - currentX) * 0.08;

      currentY +=
        (mouseY - currentY) * 0.08;

      glow.style.transform =
        `translate(
        ${currentX - 250}px,
        ${currentY - 250}px
      )`;

      requestAnimationFrame(
        animate
      );
    };

    animate();

    return () => {

      window.removeEventListener(
        "mousemove",
        moveGlow
      );
    };

  }, []);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {

    if (darkMode) {

      document.body.classList.add("bg-dark");
      document.body.classList.add("text-light");

      localStorage.setItem("theme", "dark");

    } else {

      document.body.classList.remove("bg-dark");
      document.body.classList.remove("text-light");

      localStorage.setItem("theme", "light");
    }

  }, [darkMode]);

  return (
    <>
      <BrowserRouter>

        <div className="noise"></div>
        <div className="cursor-glow"></div>
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme={darkMode ? "dark" : "light"}
        />

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;