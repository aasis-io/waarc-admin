import {
  ChevronDown,
  Clapperboard,
  FilePenLine,
  House,
  LayoutDashboard,
  Link2,
  Mails,
  NotebookText,
  Settings,
  UserRoundCog,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/logo.svg";

const categories = [
  {
    title: "Main",
    items: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: <LayoutDashboard size={16} />,
      },
      {
        name: "Home",
        path: "/home/details",
        icon: <House size={16} />,
      },
      {
        name: "About Us",
        path: "/about",
        icon: <FilePenLine size={16} />,
      },
      {
        name: "Manage Mails",
        path: "/manage-mails",
        icon: <Mails size={16} />,
      },
      {
        name: "Team",
        icon: <UserRoundCog size={16} />,
        children: [
          { name: "Add Team", path: "/team/add" },
          { name: "Manage Team", path: "/team" },
        ],
      },
      {
        name: "Useful Links",
        icon: <Link2 size={16} />,
        children: [
          { name: "Add Useful Link", path: "/useful-links/add" },
          { name: "Manage Useful Links", path: "/useful-links" },
        ],
      },

      {
        name: "Journals",
        icon: <NotebookText size={16} />,
        children: [
          { name: "Add Journal", path: "/journals/add" },
          { name: "Manage Journals", path: "/journals" },
        ],
      },
      {
        name: "Media",
        icon: <Clapperboard size={16} />,
        children: [
          { name: "Add Image", path: "/images/add" },
          { name: "Add Video", path: "/videos/add" },
          { name: "Manage Images", path: "/images" },
          { name: "Manage Videos", path: "/videos" },
        ],
      },
    ],
  },
  {
    title: "Management",
    items: [
      { name: "Settings", path: "/settings", icon: <Settings size={16} /> },
    ],
  },
];

const Sidebar = ({ open = true }) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  // Auto open dropdown if exact child route is active
  useEffect(() => {
    categories.forEach((cat) => {
      cat.items.forEach((item) => {
        if (item.children) {
          const isChildActive = item.children.some(
            (child) => child.path === location.pathname
          );
          if (isChildActive) {
            setOpenDropdown(item.name);
          }
        }
      });
    });
  }, [location.pathname]);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <aside
      className={`min-h-screen bg-white p-6 ${
        open ? "w-64" : "w-20"
      } transition-all duration-300 overflow-y-auto`}
    >
      {/* Logo */}
      <Link to={"/"} className="flex items-center mb-8 cursor-pointer">
        <img src={Logo} alt="Wisdom Academy" className="h-12 w-auto" />
      </Link>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col justify-start">
        {categories.map((cat) => (
          <div key={cat.title} className="mb-6">
            <p className="text-gray-400 uppercase text-xs font-semibold mb-2">
              {cat.title}
            </p>

            <ul className="space-y-2">
              {cat.items.map((item) => (
                <li key={item.name}>
                  {item.children ? (
                    <>
                      {/* Parent Dropdown Button */}
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="w-full flex items-center justify-between gap-3 cursor-pointer text-sm font-medium py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span className={`${open ? "inline" : "hidden"}`}>
                            {item.name}
                          </span>
                        </div>
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-300 ${
                            openDropdown === item.name ? "rotate-180" : ""
                          } ${open ? "block" : "hidden"}`}
                        />
                      </button>

                      {/* Dropdown Items */}
                      {openDropdown === item.name && (
                        <ul className="ml-6 mt-2 space-y-2">
                          {item.children.map((child) => (
                            <li key={child.name}>
                              <NavLink
                                to={child.path}
                                end // ensures exact match for active
                                className={({ isActive }) =>
                                  `flex items-center gap-3 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${
                                    isActive
                                      ? "bg-[#17254e] text-white"
                                      : "text-gray-700 hover:bg-gray-100"
                                  }`
                                }
                              >
                                <span
                                  className={`${open ? "inline" : "hidden"}`}
                                >
                                  {child.name}
                                </span>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    /* Normal Nav Item */
                    <NavLink
                      to={item.path}
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-3 py-2 px-3 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                          isActive
                            ? "bg-[#17254e] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`
                      }
                    >
                      {item.icon}
                      <span className={`${open ? "inline" : "hidden"}`}>
                        {item.name}
                      </span>
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
