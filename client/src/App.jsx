import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import {
  ToastContainer
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";

import Register from "./pages/Register";

import Login from "./pages/Login";

import Editor from "./pages/Editor";

import PostDetail from "./pages/PostDetail";

import EditPost from "./pages/EditPost";

import Profile from "./pages/Profile";

import VerifyOtp from "./pages/VerifyOtp";

import ForgotPassword from "./pages/ForgotPassword";

import ResetPassword from "./pages/ResetPassword";

function App() {

  // =====================================
  // THEME STATE
  // =====================================

  const [darkMode, setDarkMode] =
    useState(

      localStorage.getItem("theme")
      !== "light"
    );

  // =====================================
  // CURSOR GLOW EFFECT
  // =====================================

  useEffect(() => {

    const glow =
      document.querySelector(
        ".cursor-glow"
      );

    if (!glow) return;

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

  // =====================================
  // THEME HANDLER
  // =====================================

  useEffect(() => {

    if (darkMode) {

      document.body.classList.add(
        "dark-theme"
      );

      document.body.classList.remove(
        "light-theme"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );

    } else {

      document.body.classList.add(
        "light-theme"
      );

      document.body.classList.remove(
        "dark-theme"
      );

      localStorage.setItem(
        "theme",
        "light"
      );
    }

  }, [darkMode]);

  return (

    <>

      <BrowserRouter>

        {/* BACKGROUND FX */}

        <div className="noise"></div>

        <div className="cursor-glow"></div>

        {/* NAVBAR */}

        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* TOAST */}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme={
            darkMode
              ? "dark"
              : "light"
          }
        />

        {/* MAIN CONTENT */}

        <div className="container mt-4">

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/editor"
              element={<Editor />}
            />

            <Route
              path="/posts/:id"
              element={<PostDetail />}
            />

            <Route
              path="/edit/:id"
              element={<EditPost />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/verify-otp"
              element={<VerifyOtp />}
            />

            <Route
              path="/forgot-password"
              element={
                <ForgotPassword />
              }
            />

            <Route
              path="/reset-password"
              element={
                <ResetPassword />
              }
            />

          </Routes>

        </div>

      </BrowserRouter>

    </>
  );
}

export default App;