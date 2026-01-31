import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Todos from "./pages/Todos";

function App() {
  return (
    <div className="container">
      <h2 className="title">TanStack: Simple Todos App</h2>
      <p className="subtitle">@nisafarikha__</p>

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
