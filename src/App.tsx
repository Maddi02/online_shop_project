import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from "./components/Auth/SignIn";
import Home from "./components/Home/Home";
import LayoutWithSidebar from "./components/Layout/LayoutWithSidebar.tsx";
import Orders from "./components/Orders/Orders.tsx";
import ShoopingCard from "./components/ShoppingCard/ShoopingCard.tsx";
import Register from "./components/Auth/Register.tsx";
import UserProfile from "./components/Auth/UserProfile.tsx";
import AdminPage from "./components/Products/AdminPage.tsx";
import {useSelector} from "react-redux";
import {RootState} from "./utilits/State/store.ts";

export default function App() {
  const user = useSelector((state: RootState) => state.auth.user);
  const adminEmail = import.meta.env.VITE_REACT_APP_ADMIN_EMAIL;


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route
          path="/adminPage"
          element={user?.email === adminEmail && user != undefined ? <AdminPage /> : <Navigate replace to="/home" />}
        />
        <Route path="/home" element={<LayoutWithSidebar><Home /></LayoutWithSidebar>} />
        <Route path="/orders" element={<LayoutWithSidebar><Orders /></LayoutWithSidebar>} />
        <Route path="/shoppingCard" element={<LayoutWithSidebar><ShoopingCard /></LayoutWithSidebar>} />
        <Route index element={<Navigate replace to="/home" />} />
      </Routes>
    </Router>
  );
}
