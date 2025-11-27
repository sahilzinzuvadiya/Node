import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import RecipeList from "./pages/RecipeList";
import MyRecipes from "./pages/MyRecipes";
import AddRecipe from "./pages/AddRecipe";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-culinary-bg">
        <div className="animate-pulse text-culinary-accent text-xl font-semibold">
          Loading your kitchen...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route
            path="/my-recipes"
            element={user ? <MyRecipes /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-recipe"
            element={user ? <AddRecipe /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
