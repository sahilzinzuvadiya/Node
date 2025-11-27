import { useAuth } from "../context/AuthContext";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe, onRefresh }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!recipe) return null;

  const isAuthorized =
    user &&
    (user._id === recipe.createdBy?._id || user.role === "admin");

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    try {
      await api.delete(`/recipes/${recipe._id}`);
      onRefresh && onRefresh();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const handleEdit = () => {
    navigate("/add-recipe", { state: { recipe } });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
      <h3 className="text-lg font-semibold text-orange-400">
        {recipe.title}
      </h3>

      <p className="text-sm text-gray-400">
        {recipe.description}
      </p>

      <div className="flex items-center justify-between pt-3">
        <span className="text-xs text-gray-500">
          By {recipe.createdBy?.username || "Unknown"}
        </span>

        {isAuthorized && (
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="text-xs px-3 py-1 rounded-lg border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white transition"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="text-xs px-3 py-1 rounded-lg border border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
