import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/admin/HomePage";
import { useDispatch } from "react-redux";
import ProfilePage from "./pages/admin/ProfilePage";
import UserManagerPage from "./pages/admin/UserManagerPage";
import { useEffect, useState } from "react";
import { callCurrentUser } from "./services/auth";
import { setCurrentUser } from "./redux/slices/currentUser";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const fecthCurrentUser = async () => {
    try {
      setLoading(true);
      const res = await callCurrentUser();
      dispatch(setCurrentUser(res.data.data));
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fecthCurrentUser();
  }, []);

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
