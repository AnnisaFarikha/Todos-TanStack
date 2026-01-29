import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerMutation = useMutation({
    mutationFn: async () => {
      console.log("KIRIM KE API:", { email, password });

      const res = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "User Test",
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log("RESPONSE STATUS:", res.status);
      console.log("RESPONSE DATA:", data);

      if (!res.ok) throw data;
      return data;
    },
    onSuccess: () => {
      alert("Register berhasil 🎉");
    },
    onError: (err) => {
      alert(err?.error || "Register gagal");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate();
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}
