import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from "./components/SignIn/SignIn";
import Home from "./components/Home/Home";
import LayoutWithSidebar from "./components/Layout/LayoutWithSidebar.tsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/home" element={<LayoutWithSidebar><Home /></LayoutWithSidebar>} />
        <Route index element={<Navigate replace to="/home" />} />
      </Routes>
    </Router>
  );
}
