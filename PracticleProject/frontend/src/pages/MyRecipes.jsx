import { useEffect, useState } from "react";
import { api } from "../api";
import RecipeCard from "../components/RecipeCard";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchMyRecipes = async () => {
    const res = await api.get("/recipes/mine");
    setRecipes(res.data.recipes);
  };

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-orange-400">
        My Recipes
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onRefresh={fetchMyRecipes}
          />
        ))}
      </div>
    </div>
  );
};

export default MyRecipes;
