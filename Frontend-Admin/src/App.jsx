import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Messages from "./components/Messages";
import AddNewDoctor from "./components/AddNewDoctor";
import AddNewAdmin from "./components/AddNewAdmin";
import Login from "./components/Login";
import Doctors from "./components/Doctors";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "./main";
import axios from "axios";
import Loading from "./components/loading";
import "./App.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const { setIsAuthenticated, setUser } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/user/admin/me`,
          { withCredentials: true }
        );
        console.log(response);
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (err) {
        console.error("Authentication error:", err);
        setIsAuthenticated(false);
        setUser({});
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, []); // ← only run on mount
  


  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctor/addnew" element={<AddNewDoctor />} />
          <Route path="/admin/addnew" element={<AddNewAdmin />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/doctors" element={<Doctors />} />
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
