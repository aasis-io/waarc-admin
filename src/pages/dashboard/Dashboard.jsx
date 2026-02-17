import { CalendarCheck, Map, TrendingUp, Users } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "1,248",
    icon: Users,
  },
  {
    title: "Active Trips",
    value: "32",
    icon: Map,
  },
  {
    title: "Bookings",
    value: "86",
    icon: CalendarCheck,
  },
  {
    title: "Monthly Growth",
    value: "+18%",
    icon: TrendingUp,
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#e8e9ed] p-6">
      <h2 className="text-2xl font-bold text-[#172542] mb-6">Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-4 hover:shadow-lg transition-shadow"
            >
              <div className="p-3 rounded-xl bg-[#172542] text-white">
                <Icon size={22} />
              </div>

              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <p className="text-xl font-bold text-[#172542]">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
