import { Trash2, UserPen } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const imagesData = [
  {
    id: 1,
    title: "Sunrise in Himalayas",
    url: "https://i.pravatar.cc/100?img=11",
  },
  { id: 2, title: "Pokhara Lake", url: "https://i.pravatar.cc/100?img=12" },
  { id: 3, title: "Bardiya Safari", url: "https://i.pravatar.cc/100?img=13" },
];

const ManageImages = () => {
  const handleEdit = (id) => console.log("Edit image", id);
  const handleDelete = (id) => console.log("Delete image", id);

  return (
    <div className="bg-[#e8e9ed] p-6">
      <h2 className="mb-6 text-2xl font-bold text-[#172542]">Manage Images</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full rounded-2xl bg-white shadow-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                SN
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Preview
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {imagesData.map((img, index) => (
              <tr key={img.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{img.title}</td>
                <td className="px-6 py-4">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                </td>
                <td className="flex justify-center gap-3 px-6 py-4 text-center">
                  <Link
                    to={"/media/image/update"}
                    onClick={() => handleEdit(img.id)}
                    className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 hover:text-blue-800"
                  >
                    <UserPen size={16} /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 hover:text-red-800"
                  >
                    <Trash2 size={16} /> Delete
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

export default ManageImages;
