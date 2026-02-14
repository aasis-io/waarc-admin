import { Trash2, UserPen } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

// Dummy team data
const teamData = [
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
];

const ManageTeam = () => {
  const handleEdit = (id) => {
    // TODO: Replace with backend API call to edit member
    console.log("Edit team member:", id);
  };

  const handleDelete = (id) => {
    // TODO: Replace with backend API call to delete member
    console.log("Delete team member:", id);
  };

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
                    to={"/team/update"}
                    onClick={() => handleEdit(member.id)}
                    className="flex items-center gap-1 px-3 py-2 cursor-pointer rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition-colors font-medium text-sm"
                  >
                    <UserPen size={16} />
                    <span>Edit</span>
                  </Link>
                  <button
                    to={"/"}
                    onClick={() => handleDelete(member.id)}
                    className="flex items-center gap-1 px-3 py-2 cursor-pointer rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-800 transition-colors font-medium text-sm"
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTeam;
