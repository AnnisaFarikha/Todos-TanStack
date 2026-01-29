import { useQuery } from "@tanstack/react-query";

export default function Profile() {
  const token = localStorage.getItem("accessToken");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/profile", {
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

  if (!token) return <p>Belum login</p>;
  if (isLoading) return <p>Loading profile...</p>;
  if (isError) return <p>Error: {error?.error || "Gagal ambil profile"}</p>;

  return (
    <div>
      <h1>Profile</h1>

      <p>
        <strong>Name:</strong> {data.name}
      </p>
      <p>
        <strong>Email:</strong> {data.email}
      </p>
    </div>
  );
}
