import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";

export const Register = () => {
  const navigate = useNavigate();
  const { formState, handleChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    name: "",
    lastname: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (res.ok) {
        alert(data.message || "Usuario registrado correctamente");
        handleReset();
        navigate("/login");
      } else {
        alert(data.message || "Error al registrar usuario");
      }
    } catch {
      alert("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-400 via-indigo-500 to-blue-600 text-white p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">Crear cuenta</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["username", "email", "password", "name", "lastname"].map(
            (field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-white mb-1 capitalize"
                >
                  {field === "name"
                    ? "Nombre"
                    : field === "lastname"
                    ? "Apellido"
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>

                <input
                  id={field}
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  value={formState[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder={`Ingresa tu ${field}`}
                  required
                />
              </div>
            )
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-lg transition-all ${
              loading
                ? "bg-sky-300 cursor-not-allowed text-gray-100"
                : "bg-sky-500 hover:bg-sky-600 text-white"
            }`}
          >
            {loading ? "Registrando..." : "Registrarme"}
          </button>
        </form>

        <p className="text-center text-sm text-blue-100 mt-6">
          Ya tenes una cuenta?{" "}
          <Link
            to="/login"
            className="text-yellow-300 font-medium hover:text-yellow-200 transition"
          >
            Inicia sesion
          </Link>
        </p>
      </div>
    </main>
  );
};
