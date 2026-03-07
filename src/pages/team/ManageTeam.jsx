import { Trash2, UserPen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteTeamMember, getTeamMembers } from "../../services/api";

const ManageTeam = () => {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      try {
        const response = await getTeamMembers();

        // response expected: array
        setTeamData(response.data || []);
      } catch (error) {
        console.error("Failed to fetch team members", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteTeamMember(id);

        setTeamData((prev) => prev.filter((member) => member.id !== id));

        Swal.fire("Deleted!", "Team member has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete team member.", "error");
        console.error(error);
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
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                SN
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                Position
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-600 uppercase">
                Location
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-600 uppercase">
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
                <td className="px-6 py-4 text-sm font-medium text-gray-700 align-middle">
                  {index + 1}
                </td>

                <td className="px-6 py-4 align-middle">
                  <div className="flex items-center gap-3">
                    <img
                      src={`${BASE_URL}${member.image}`}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                    <span className="text-gray-800 font-medium">
                      {member.name}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-gray-600 align-middle">
                  {member.position}
                </td>
                <td className="px-6 py-4 text-gray-600 align-middle">
                  {member.location}
                </td>
                <td className="px-6 py-4 text-center align-middle">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/team/update/${member.id}`}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium text-sm"
                    >
                      <UserPen size={16} />
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(member.id)}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium text-sm"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
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
