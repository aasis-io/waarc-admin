import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import
import Logo from "../../assets/logo.svg";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate(); // ✅ hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true }); // ✅ redirect without refresh
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    // no need for window.location.href
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e8e9ed] p-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Wisdom Academy" className="h-16 w-auto" />
        </div>

        <h2 className="text-2xl font-heading font-bold text-center text-gray-800 mb-4">
          Admin Panel Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#17254e] focus:border-transparent"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#17254e] focus:border-transparent"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#17254e] text-white font-semibold rounded-xl shadow-md hover:bg-[#0f1a3a] transition-colors cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          © {new Date().getFullYear()} Wisdom Academy
        </p>
      </div>
    </div>
  );
};

export default Login;
