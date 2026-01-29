import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Todos from "./pages/Todos";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Devscale Simple Todos – TanStack Query</h2>

      <Register />
      <hr />

      <Login />
      <hr />

      <Profile />
      <hr />

      <Todos />
    </div>
  );
}

export default App;
