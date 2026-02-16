import { Trash2, UserPen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
// import { getTeamMembers, deleteTeamMember } from "../../services/api"; // 🔜 API integration

const ManageTeam = () => {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      try {
        // 🔜 Uncomment when API is ready
        // const response = await getTeamMembers();
        // setTeamData(response.data);

        // Dummy data for now
        setTeamData([
          {
            id: 1,
            name: "Ashish Thapa",
            position: "CEO",
            avatar: "https://i.pravatar.cc/150?img=1",
          },
          {
            id: 2,
            name: "Sita Sharma",
            position: "CTO",
            avatar: "https://i.pravatar.cc/150?img=2",
          },
          {
            id: 3,
            name: "Ramesh Koirala",
            position: "Designer",
            avatar: "https://i.pravatar.cc/150?img=3",
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch team members", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  const handleEdit = (id) => {
    console.log("Edit team member:", id);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        // 🔜 Uncomment when API is ready
        // await deleteTeamMember(id);

        // For now: remove locally
        setTeamData((prev) => prev.filter((member) => member.id !== id));

        Swal.fire("Deleted!", "Team member has been deleted.", "success");
        console.log("Deleted team member:", id);
      } catch (error) {
        Swal.fire("Error!", "Failed to delete team member.", "error");
        console.error("Failed to delete team member", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-700 font-medium">
        Loading team members...
      </div>
    );
  }

  return (
    <div className="bg-[#e8e9ed] p-6">
      <h2 className="text-2xl font-bold text-[#172542] mb-6">
        Manage Team Members
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-2xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                SN
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {teamData.map((member, index) => (
              <tr
                key={member.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-gray-800 font-medium">
                    {member.name}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{member.position}</td>
                <td className="px-6 py-4 text-center flex justify-center gap-3">
                  <Link
                    to={`/team/update/${member.id}`}
                    onClick={() => handleEdit(member.id)}
                    className="flex items-center gap-1 px-3 py-2 cursor-pointer rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition-colors font-medium text-sm"
                  >
                    <UserPen size={16} />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="flex items-center gap-1 px-3 py-2 cursor-pointer rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-800 transition-colors font-medium text-sm"
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
            {teamData.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No team members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTeam;
