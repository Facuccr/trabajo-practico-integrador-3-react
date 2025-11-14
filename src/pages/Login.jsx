import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "../hooks/useForm";

export const Login = ({ onLoginSuccess }) => {
  const { formState, handleChange, resetForm } = useForm({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-400 via-indigo-500 to-blue-600 text-white p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center mb-4 drop-shadow-lg">
          Iniciar sesión
        </h1>
        <p className="text-center text-sm text-blue-100 mb-8">
          Accede a tu cuenta para continuar
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white mb-2"
            >
              Usuario
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={formState.username}
              onChange={handleChange}
              placeholder="Tu nombre de usuario"
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-sky-300"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white mb-2"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-sky-300"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-lg shadow-md transition-all duration-200 ${
              loading
                ? "bg-sky-300 cursor-not-allowed text-gray-100"
                : "bg-sky-500 hover:bg-sky-600 text-white"
            }`}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="text-center text-sm text-blue-100 mt-6">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-yellow-300 font-medium hover:text-yellow-200 transition"
          >
            Registrate aca
          </Link>
        </p>
      </div>
    </main>
  );
};
