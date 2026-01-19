import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div
          className="text-2xl font-extrabold text-indigo-600 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          LearnSphere
        </div>

        {/* LINKS */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-semibold"
                : "text-gray-600 dark:text-gray-300 hover:text-indigo-600"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-semibold"
                : "text-gray-600 dark:text-gray-300 hover:text-indigo-600"
            }
          >
            Courses
          </NavLink>

          <NavLink
            to="/learning-path"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-semibold"
                : "text-gray-600 dark:text-gray-300 hover:text-indigo-600"
            }
          >
            Learning Path
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-semibold"
                : "text-gray-600 dark:text-gray-300 hover:text-indigo-600"
            }
          >
            About
          </NavLink>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {user && (
            <span className="hidden sm:block text-sm text-gray-500 dark:text-gray-300">
              Hi, <strong>{user.name}</strong>
            </span>
          )}

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
