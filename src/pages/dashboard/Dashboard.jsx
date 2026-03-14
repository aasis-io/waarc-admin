
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#e8e9ed] p-6">
      <h2 className="text-2xl font-bold text-[#172542] mb-6">Dashboard</h2>
      <div className="max-w-5xl bg-white shadow-md rounded-2xl p-6">
        <h3 className="text-xl font-bold text-[#172542] mb-4">
          Country-wise Active Users (Last 30 Days)
        </h3>
        {/* <CountryChart /> */}
      </div>
    </div>
  );
};

export default Dashboard;
