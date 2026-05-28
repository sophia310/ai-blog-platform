import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

function Navbar({
  darkMode,
  setDarkMode
}) {

  const navigate = useNavigate();

  const location = useLocation();

  const token =
    localStorage.getItem("token");

  // LOGOUT
  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  };

  // ACTIVE LINK STYLE
  const isActive = (path) => {

    return location.pathname === path
      ? "minimal-nav-link active-nav-link"
      : "minimal-nav-link";
  };

  return (

    <nav className="navbar-container">

      {/* ========================= */}
      {/* LOGO */}
      {/* ========================= */}

      <Link
        to="/"
        className="lumina-logo"
      >
        Lumina
      </Link>

      {/* ========================= */}
      {/* NAV LINKS */}
      {/* ========================= */}

      <div className="nav-links-wrapper">

        {/* THEME TOGGLE */}

        <button
          className="theme-toggle"
          onClick={() =>
            setDarkMode(!darkMode)
          }
        >

          {darkMode ? "☀" : "☾"}

        </button>

        {/* HOME */}

        <Link
          to="/"
          className={isActive("/")}
        >
          Home
        </Link>

        {token ? (
          <>

            {/* WRITE */}

            <Link
              to="/editor"
              className={isActive("/editor")}
            >
              Write
            </Link>

            {/* PROFILE */}

            <Link
              to="/profile"
              className={isActive("/profile")}
            >
              Profile
            </Link>

            {/* LOGOUT */}

            <button
              onClick={logout}
              className="logout-link"
            >
              Logout
            </button>

          </>
        ) : (
          <>

            {/* LOGIN */}

            <Link
              to="/login"
              className={isActive("/login")}
            >
              Login
            </Link>

            {/* REGISTER */}

            <Link
              to="/register"
              className={isActive("/register")}
            >
              Register
            </Link>

          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;