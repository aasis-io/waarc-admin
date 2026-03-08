import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
