import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate, useLocation } from "react-router-dom";

const AddRecipe = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editRecipe = location.state?.recipe;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  useEffect(() => {
    if (editRecipe) {
      setTitle(editRecipe.title);
      setDescription(editRecipe.description);
      setIngredients(editRecipe.ingredients.join("\n"));
      setSteps(editRecipe.steps.join("\n"));
    }
  }, [editRecipe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
      ingredients: ingredients.split("\n"),
      steps: steps.split("\n")
    };

    try {
      if (editRecipe) {
        await api.put(`/recipes/${editRecipe._id}`, data);
      } else {
        await api.post("/recipes", data);
      }
      navigate("/my-recipes");
    } catch (err) {
      alert("Save failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl space-y-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl mx-auto"
    >
      <h1 className="text-xl font-semibold text-orange-400">
        {editRecipe ? "Edit Recipe" : "Add Recipe"}
      </h1>

      <input
        className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <textarea
        className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg"
        placeholder="Ingredients (one per line)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
      />

      <textarea
        className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg"
        placeholder="Steps (one per line)"
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
        required
      />

      <button className="bg-orange-500 hover:bg-orange-600 text-black py-2 px-4 rounded-lg">
        {editRecipe ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default AddRecipe;
