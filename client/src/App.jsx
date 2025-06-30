import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Events from "./pages/Events";
import AddEvents from "./pages/AddEvents";
import MyEvents from "./pages/MyEvents";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <div className="w-full">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Protected Routes */}
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <Events />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-event"
          element={
            <PrivateRoute>
              <AddEvents />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-events"
          element={
            <PrivateRoute>
              <MyEvents />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
