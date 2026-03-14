import { Trash2, UserPen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteMediaVideo, getMediaVideos } from "../../services/api"; // <-- your backend API

const ManageVideos = () => {
  const [videosData, setVideosData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch videos from backend
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const res = await getMediaVideos(); // assume it returns array of videos
        setVideosData(res);
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to fetch videos.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Handle delete with Swal confirmation
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

    if (!result.isConfirmed) return;

    try {
      await deleteMediaVideo(id); // call API to delete video
      setVideosData((prev) => prev.filter((vid) => vid.id !== id));
      Swal.fire("Deleted!", "Video has been deleted.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to delete video.", "error");
    }
  };

  const handleEdit = (id) => console.log("Edit video", id); // can be replaced with routing

  if (loading) return <p className="p-6 text-gray-500">Loading videos...</p>;

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
                    to={`/videos/update/${vid.id}`}
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
            {videosData.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No videos found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageVideos;
