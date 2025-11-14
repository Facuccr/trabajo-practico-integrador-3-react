import { useEffect, useState } from "react";

export const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setUser(data.user);
    };

    fetchProfile();
  }, []);

  console.log(user);
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-400 via-indigo-500 to-blue-600 text-white p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl text-center">
        <h1 className="text-3xl font-bold mb-6">Perfil del Usuario</h1>

        {user ? (
          <div className="space-y-3 text-left text-white">
            <p>
              <span className="font-semibold">Nombre:</span> {user.name}
            </p>
            <p>
              <span className="font-semibold">Apellido:</span> {user.lastname}
            </p>
          </div>
        ) : (
          <p className="text-blue-100">Cargando datos...</p>
        )}
      </div>
    </main>
  );
};
