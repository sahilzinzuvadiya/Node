import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const linkClass = (path) =>
    `px-3 py-2 rounded-full text-sm font-medium transition ${
      location.pathname === path
        ? "bg-culinary-accent text-black"
        : "text-gray-200 hover:bg-slate-800 hover:text-culinary-accent-soft"
    }`;

  return (
    <header className="border-b border-slate-800 bg-black/60 backdrop-blur">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="h-9 w-9 rounded-2xl bg-linear-to-br from-culinary-accent via-culinary-accent-soft to-culinary-green flex items-center justify-center shadow-lg shadow-culinary-accent/40">
            <span className="text-black font-extrabold text-lg">R</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-semibold tracking-tight text-gray-50">
              RecipeAura
            </span>
            <span className="text-[11px] uppercase tracking-[0.14em] text-gray-400">
              gourmet sharing platform
            </span>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-2 bg-slate-900/70 px-2 py-1 rounded-full border border-slate-800/80">
            <Link to="/" className={linkClass("/")}>
              All Recipes
            </Link>
            {user && (
              <>
                <Link to="/my-recipes" className={linkClass("/my-recipes")}>
                  My Recipes
                </Link>
                <Link to="/add-recipe" className={linkClass("/add-recipe")}>
                  Add Recipe
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-xs text-gray-300 text-right">
                <span className="block font-semibold text-culinary-accent-soft">
                  {user.username}
                </span>
                <span className="uppercase text-[10px] tracking-[0.16em] text-gray-500">
                  {user.role}
                </span>
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-full text-xs font-medium bg-slate-900 border border-slate-700 hover:border-culinary-accent-soft hover:text-culinary-accent-soft transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-2 rounded-full text-xs font-medium border border-slate-700 hover:border-culinary-accent-soft hover:text-culinary-accent-soft transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-3 py-2 rounded-full text-xs font-semibold border border-slate-700 hover:border-culinary-accent-soft hover:text-culinary-accent-soft transition"
              >
                Join the Kitchen
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
