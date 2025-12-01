import Recipe from "../models/Recipe.js";
import User from "../models/User.js";

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate("createdBy", "username")
      .sort({ createdAt: -1 });

    res.json({ recipes });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ createdBy: req.user.id })
      .populate("createdBy", "username")
      .sort({ createdAt: -1 });

    res.json({ recipes });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, steps, imageUrl } = req.body;

    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
      steps,
      imageUrl,
      createdBy: req.user.id
    });

    await User.findByIdAndUpdate(req.user.id, {
      $push: { recipes: recipe._id }
    });

    const populated = await recipe.populate("createdBy", "username");

    res.status(201).json({ recipe: populated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // owner or admin
    if (recipe.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed" });
    }

    const { title, description, ingredients, steps, imageUrl, rating } = req.body;

    recipe.title = title ?? recipe.title;
    recipe.description = description ?? recipe.description;
    if (ingredients) recipe.ingredients = ingredients;
    if (steps) recipe.steps = steps;
    if (imageUrl) recipe.imageUrl = imageUrl;
    if (rating !== undefined) recipe.rating = rating;

    await recipe.save();

    const populated = await recipe.populate("createdBy", "username");

    res.json({ recipe: populated });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed" });
    }

    await recipe.deleteOne();

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { recipes: recipe._id }
    });

    res.json({ message: "Recipe deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
