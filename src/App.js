import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import "./App.css";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import MyCourses from "./pages/MyCourses";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:id" element={<CourseDetail />} />
        <Route path="register" element={<Register />} />
        <Route element={<ProtectedRoute/>}>
          <Route path="my-courses" element={<MyCourses />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
