// src/routes/AppRoutes.jsx
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminLayout from "../layouts/AdminLayout";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import HomePageDetails from "../pages/dashboard/HomePageDetails";
import AddJournal from "../pages/journals/AddJournal";
import EditJournal from "../pages/journals/EditJournal";
import ManageJournals from "../pages/journals/ManageJournals";
import AddImage from "../pages/media/AddImage";
import AddVideo from "../pages/media/AddVideo";
import ManageImages from "../pages/media/ManageImages";
import ManageVideos from "../pages/media/ManageVideos";
import AddTeam from "../pages/team/AddTeam";
import EditTeam from "../pages/team/EditTeam";
import ManageTeam from "../pages/team/ManageTeam";
import Users from "../pages/users/Users";
import Settings from "../settings/Settings";

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/auth/login" element={<Login />} />

      {/* Admin routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* Nested routes */}
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
        <Route path="team/add" element={<AddTeam />} />
        <Route path="team" element={<ManageTeam />} />
        <Route path="team/edit" element={<EditTeam />} />
        <Route path="home/details" element={<HomePageDetails />} />
        <Route path="journals/add" element={<AddJournal />} />
        <Route path="journals" element={<ManageJournals />} />
        <Route path="journals/edit" element={<EditJournal />} />

        {/* Images routes */}
        <Route path="images/add" element={<AddImage />} />
        <Route path="images" element={<ManageImages />} />
        {/* <Route path="images/edit" element={<EditImage />} /> */}

        {/* Videos routes */}
        <Route path="videos/add" element={<AddVideo />} />
        <Route path="videos" element={<ManageVideos />} />
        {/* <Route path="videos/edit" element={<EditVideo />} /> */}
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
