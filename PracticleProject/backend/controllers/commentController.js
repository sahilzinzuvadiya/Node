import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  try {
    const { text, recipeId } = req.body;

    const comment = await Comment.create({
      text,
      recipe: recipeId,
      user: req.user.id
    });

    const populated = await comment
      .populate("user", "username")
      .populate("recipe", "title");

    res.status(201).json({ comment: populated });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getRecipeComments = async (req, res) => {
  try {
    const comments = await Comment.find({ recipe: req.params.recipeId })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.json({ comments });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
