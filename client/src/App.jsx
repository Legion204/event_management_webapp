import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Events from "./pages/Events";
import AddEvents from "./pages/AddEvents";
import MyEvents from "./pages/MyEvents";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <div className="w-full">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events/>} />
        <Route path="/add-event" element={<AddEvents />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
