import { useState } from "react";
import { Link } from "react-router";

export const Navbar = ({ authStatus, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-sky-500 to-blue-600 text-white shadow-lg backdrop-blur-md bg-opacity-90 border-b border-white/20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight drop-shadow-sm"
        >
          MiAppReact
        </Link>

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div className="hidden md:flex gap-6 text-sm font-medium items-center">
          {authStatus === "authenticated" ? (
            <>
              <Link
                to="/home"
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/tasks"
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                Tasks
              </Link>
              <Link
                to="/profile"
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                Profile
              </Link>
              <button
                onClick={onLogout}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded-lg shadow-md transition-all duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* responsive */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-700/90 text-white px-4 py-3 flex flex-col gap-3 border-t border-white/20">
          {authStatus === "authenticated" ? (
            <>
              <Link onClick={() => setMenuOpen(false)} to="/home">
                Home
              </Link>
              <Link onClick={() => setMenuOpen(false)} to="/tasks">
                Tasks
              </Link>
              <Link onClick={() => setMenuOpen(false)} to="/profile">
                Profile
              </Link>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onLogout();
                }}
                className="bg-white/20 hover:bg-white/30 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link onClick={() => setMenuOpen(false)} to="/login">
                Login
              </Link>
              <Link onClick={() => setMenuOpen(false)} to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
