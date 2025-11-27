import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="max-w-md mx-auto bg-culinary-card/90 border border-slate-800 rounded-3xl p-6 mt-4 shadow-xl shadow-black/40">
      <h1 className="text-2xl font-semibold text-gray-50 mb-2">
        Welcome back to{" "}
        <span className="text-culinary-accent-soft">RecipeAura</span>
      </h1>
      <p className="text-sm text-gray-400 mb-4">
        Sign in to manage your recipes, refine your favorites, and explore gourmet ideas.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            className="w-full rounded-2xl bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-culinary-accent-soft"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            type="email"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            className="w-full rounded-2xl bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-culinary-accent-soft"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            type="password"
            required
          />
        </div>

        {errMsg && (
          <p className="text-xs text-red-400 bg-red-950/40 border border-red-800/60 rounded-2xl px-3 py-2">
            {errMsg}
          </p>
        )}

        <button
          type="submit"
          className="w-full px-5 py-2.5 rounded-full text-sm font-semibold bg-linear-to-r from-culinary-accent to-culinary-accent-soft text-black shadow-lg shadow-culinary-accent/40 hover:brightness-110 transition"
        >
          Sign In
        </button>
      </form>
    </section>
  );
};

export default Login;
