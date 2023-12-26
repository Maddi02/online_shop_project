import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from "./components/SignIn/SignIn";
import Home from "./components/Home/Home";
import LayoutWithSidebar from "./components/Layout/LayoutWithSidebar.tsx";
import Orders from "./components/Orders/Orders.tsx";
import ShoopingCard from "./components/ShoppingCard/ShoopingCard.tsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/home" element={<LayoutWithSidebar><Home /></LayoutWithSidebar>} />
        <Route path="/orders" element={<LayoutWithSidebar><Orders/></LayoutWithSidebar>} />
        <Route path="/shoppingCard" element={<LayoutWithSidebar><ShoopingCard/></LayoutWithSidebar>} />
        <Route index element={<Navigate replace to="/home" />} />
      </Routes>
    </Router>
  );
}
