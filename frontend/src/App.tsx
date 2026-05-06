
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/admin/HomePage";
import ProfilePage from "./pages/admin/ProfilePage";
import UserManagerPage from "./pages/admin/UserManagerPage";

function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/manageusers" element={<UserManagerPage />} />
    </Routes>
  );
}

export default App;
