export const Home = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-400 via-indigo-500 to-blue-600 text-white p-4">
      <div className="max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-2xl text-center shadow-2xl">
        <h1 className="text-4xl font-bold mb-4">¡Bienvenido! </h1>
        <p className="text-lg text-blue-100 mb-6">
          Este es tu panel principal. Desde acá puedes acceder a tu perfil o
          administrar tus tareas.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/profile"
            className="bg-white/20 hover:bg-white/30 text-white px-5 py-2 rounded-lg transition"
          >
            Ver Perfil
          </a>
          <a
            href="/tasks"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-lg transition"
          >
            Mis Tareas
          </a>
        </div>
      </div>
    </main>
  );
};
