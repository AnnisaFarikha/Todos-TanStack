import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function Todos() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("accessToken");
  const [title, setTitle] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw data;
      return data;
    },
    enabled: !!token,
  });

  const addTodo = useMutation({
    mutationFn: async () => {
      const res = await fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      });

      const data = await res.json();
      if (!res.ok) throw data;
      return data;
    },
    onSuccess: () => {
      setTitle("");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodo = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`http://localhost:8000/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Gagal hapus todo");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (!token) return <p>Silakan login dulu</p>;
  if (isLoading) return <p>Loading todos...</p>;
  if (isError) return <p>Gagal ambil todos</p>;

  return (
    <div>
      <h1>Todos</h1>

      {/* ADD TODO */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo.mutate();
        }}
      >
        <input
          placeholder="New todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button disabled={addTodo.isPending}>
          {addTodo.isPending ? "Adding..." : "Add"}
        </button>
      </form>

      {/* LIST TODO */}
      <ul style={{ padding: 0 }}>
        {data.map((todo) => (
          <li key={todo.id} className="todo-item">
            {todo.title}
            <button onClick={() => deleteTodo.mutate(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
