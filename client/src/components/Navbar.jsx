import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        AI Blog Platform
      </Link>

      <div className="ms-auto">
        <Link className="btn btn-outline-light me-2" to="/">
          Home
        </Link>

        {token ? (
          <>
            <Link className="btn btn-outline-light me-2" to="/editor">
              Write
            </Link>

            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-outline-light me-2" to="/login">
              Login
            </Link>

            <Link className="btn btn-warning" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;