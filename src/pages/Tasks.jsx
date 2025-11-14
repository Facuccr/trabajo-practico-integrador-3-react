import { useState, useEffect } from "react";
import { Loading } from "../components/Loading";
import { useForm } from "../hooks/useForm";

export const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { formState, handleChange, handleReset, setFormState } = useForm({
    title: "",
    description: "",
    is_completed: false,
  });

  const [idToEdit, setIdToEdit] = useState(null);

  const fetchTasks = async () => {
    if (tasks.length === 0) setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/tasks-by-user", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks || (Array.isArray(data) ? data : []));
      } else {
        setTasks([]);
      }
    } catch {
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (idToEdit) {
      handleUpdateTask();
    } else {
      handleCreateTask();
    }
  };

  const handleSelectEdit = (task) => {
    setIdToEdit(task.id);
    setFormState({
      title: task.title,
      description: task.description,
      is_completed: task.is_completed,
    });
  };

  const handleCancelEdit = () => {
    setIdToEdit(null);
    handleReset();
  };

  const handleCreateTask = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        alert("Tarea creada exitosamente");
        fetchTasks();
        handleReset();
      } else {
        const data = await res.json();
        alert(data.message || "Error al crear la tarea");
      }
    } catch {
      alert("Error al conectar con el servidor");
    }
  };

  const handleUpdateTask = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${idToEdit}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        alert("Tarea actualizada correctamente");
        handleCancelEdit();
        fetchTasks();
      } else {
        const data = await res.json();
        alert(data.message || "Error al actualizar la tarea");
      }
    } catch {
      alert("Error al conectar con el servidor");
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        alert("Tarea eliminada correctamente");
        fetchTasks();
      } else {
        const data = await res.json();
        alert(data.message || "Error al eliminar la tarea");
      }
    } catch {
      alert("Error al conectar con el servidor");
    }
  };

  const toggleCompleted = async (task) => {
    if (!task) return;

    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...task, is_completed: !task.is_completed }),
      });

      if (res.ok) {
        fetchTasks();
      } else {
        const data = await res.json();
        alert(data.message || "Error al actualizar la tarea");
      }
    } catch {
      alert("Error al conectar con el servidor");
    }
  };

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-400 via-indigo-500 to-blue-600 text-white p-6 flex justify-center">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          {idToEdit ? "Editar tarea" : "Mis tareas"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label className="block text-sm text-white mb-1">Título</label>
            <input
              type="text"
              name="title"
              value={formState.title}
              onChange={handleChange}
              placeholder="Título de la tarea"
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Descripción</label>
            <textarea
              name="description"
              value={formState.description}
              onChange={handleChange}
              placeholder="Describe la tarea"
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-300 resize-none"
              rows="3"
            ></textarea>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_completed"
              checked={formState.is_completed}
              onChange={(e) =>
                setFormState({ ...formState, is_completed: e.target.checked })
              }
            />
            <span className="text-sm text-white">¿Completada?</span>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg transition"
            >
              {idToEdit ? "Guardar cambios" : "Agregar tarea"}
            </button>
            {idToEdit && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        {tasks.length === 0 ? (
          <p className="text-center text-blue-100">No tienes tareas aún.</p>
        ) : (
          <ul className="space-y-3">
            {Array.isArray(tasks) &&
              tasks.map((task) => (
                <li
                  key={task.id}
                  className="bg-white/10 px-4 py-3 rounded-lg border border-white/20 flex justify-between items-start"
                >
                  <div
                    onClick={() => toggleCompleted(task)}
                    className="cursor-pointer flex-1"
                  >
                    <h3
                      className={`text-lg font-semibold ${
                        task.is_completed ? "line-through text-yellow-300" : ""
                      }`}
                    >
                      {task.title || "Sin título"}
                    </h3>
                    <p className="text-sm text-blue-100">
                      {task.description || "Sin descripción"}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSelectEdit(task)}
                      className="text-green-300 hover:text-green-200 text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </main>
  );
};
