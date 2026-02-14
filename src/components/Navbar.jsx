import { ChevronDown, LogOut, Search, User } from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Example user object (will come from backend later)
  const user = {
    name: "Admin User",
    username: "Admin",
    email: "admin@wisdom.com",
    avatar: "https://i.pravatar.cc/40",
  };

  // Dropdown menu items
  const dropdownItems = [
    {
      label: "Profile",
      icon: <User size={16} />,
      action: () => console.log("Go to profile details"), // replace with navigate("/profile")
      color: "text-gray-700",
      hoverBg: "hover:bg-gray-100",
      rounded: "rounded-t-2xl",
    },
    {
      label: "Logout",
      icon: <LogOut size={16} />,
      action: logout,
      color: "text-red-600",
      hoverBg: "hover:bg-red-50",
      rounded: "rounded-b-2xl",
    },
  ];

  return (
    <div className="flex justify-between items-center mb-6 bg-white px-8 py-2">
      <div className="flex items-center w-full max-w-md">
        <div className="relative w-full">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search…"
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-[#F4B740] focus:outline-none focus:ring-1 focus:ring-[#F4B740]"
          />
        </div>
      </div>
      {/* Right: Profile */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-3xl cursor-pointer"
        >
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-gray-700 font-medium">{user.username}</span>
          <ChevronDown size={16} className="text-gray-500" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-52 bg-white shadow-2xl rounded-2xl py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-200 mb-2">
              <p className="text-gray-800 font-semibold">{user.name}</p>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>

            {dropdownItems.map((item, index) => (
              <Link
                key={index}
                onClick={item.action}
                className={`flex items-center gap-2 w-full text-left px-4 py-3 ${item.color} ${item.hoverBg} ${item.rounded} font-medium text-sm hover:cursor-pointer transition-colors`}
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
