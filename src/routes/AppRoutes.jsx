import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminLayout from "../layouts/AdminLayout";

// Pages
import AboutUs from "../pages/about/AboutUs";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import HomePageDetails from "../pages/dashboard/HomePageDetails";
import ManageMails from "../pages/event/ManageMails";

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

import AddUsefulLink from "../pages/links/AddUsefulLink";
import EditUsefulLink from "../pages/links/EditUsefulLink";
import ManageUsefulLinks from "../pages/links/ManageUsefulLinks";

import EventPage from "../pages/event/EventPage";
import EditImage from "../pages/media/EditImage";
import EditVideo from "../pages/media/EditVideo";
import Users from "../pages/users/Users";
import Settings from "../settings/Settings";

// Protected Route wrapper with loading check
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

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

        {/* Team routes */}
        <Route path="team">
          <Route index element={<ManageTeam />} />
          <Route path="add" element={<AddTeam />} />
          <Route path="update/:id" element={<EditTeam />} />
        </Route>

        {/* Home Page */}
        <Route path="home/details" element={<HomePageDetails />} />

        {/* Journals routes */}
        <Route path="journals">
          <Route index element={<ManageJournals />} />
          <Route path="add" element={<AddJournal />} />
          <Route path="update/:id" element={<EditJournal />} />
        </Route>

        {/* Media routes */}
        <Route path="images">
          <Route index element={<ManageImages />} />
          <Route path="add" element={<AddImage />} />
          <Route path="update/:id" element={<EditImage />} />
        </Route>

        <Route path="videos">
          <Route index element={<ManageVideos />} />
          <Route path="add" element={<AddVideo />} />
          <Route path="update/:id" element={<EditVideo />} />
        </Route>

        {/* About Us */}
        <Route path="about" element={<AboutUs />} />

        {/* Event */}
        <Route path="manage-mails" element={<ManageMails />} />
        <Route path="event" element={<EventPage />} />

        {/* Useful Links */}
        <Route path="useful-links">
          <Route index element={<ManageUsefulLinks />} />
          <Route path="add" element={<AddUsefulLink />} />
          <Route path="update/:id" element={<EditUsefulLink />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
