import { Trash2, UserPen } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const videosData = [
  {
    id: 1,
    title: "Nepal Trekking Overview",
    link: "https://www.youtube.com/embed/abc123",
  },
  {
    id: 2,
    title: "Wildlife Safari Bardiya",
    link: "https://www.youtube.com/embed/def456",
  },
  {
    id: 3,
    title: "Pokhara Drone Footage",
    link: "https://www.youtube.com/embed/ghi789",
  },
];

const ManageVideos = () => {
  const handleEdit = (id) => console.log("Edit video", id);
  const handleDelete = (id) => console.log("Delete video", id);

  return (
    <div className="bg-[#e8e9ed] p-6">
      <h2 className="mb-6 text-2xl font-bold text-[#172542]">Manage Videos</h2>

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
            {videosData.map((vid, index) => (
              <tr key={vid.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{vid.title}</td>
                <td className="px-6 py-4">
                  <iframe
                    width="180"
                    height="100"
                    src={vid.link}
                    title={vid.title}
                    className="rounded-lg"
                    frameBorder="0"
                    allowFullScreen
                  />
                </td>
                <td className="flex justify-center gap-3 px-6 py-4 text-center">
                  <Link
                    to={"/media/video/update"}
                    onClick={() => handleEdit(vid.id)}
                    className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 hover:text-blue-800"
                  >
                    <UserPen size={16} /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(vid.id)}
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

export default ManageVideos;
