import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: async () => {
      console.log("LOGIN KE API:", { email, password });

      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log("LOGIN STATUS:", res.status);
      console.log("LOGIN RESPONSE:", data);

      if (!res.ok) throw data;
      return data;
    },

    onSuccess: (data) => {
      alert("Login berhasil 🎉");

      // simpan token
      localStorage.setItem("accessToken", data.accessToken);
    },

    onError: (err) => {
      alert(err?.error || "Login gagal");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <div>
      <h1>Login</h1>

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

        <button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
