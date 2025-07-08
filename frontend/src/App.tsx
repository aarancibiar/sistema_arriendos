import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import CreateArriendo from "./components/CreateArriendo";
import CambiarPassword from "./components/CambiarPassword";
import Navbar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crear" element={<CreateArriendo />} />
        <Route path="/cambiar-clave" element={<CambiarPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;