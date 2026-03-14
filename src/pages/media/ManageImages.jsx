import { Trash2, UserPen } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteMediaImage, getMediaImages } from "../../services/api"; // import your media APIs

const ManageImages = () => {
  const [imagesData, setImagesData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all images from backend
  const fetchImages = async () => {
    setLoading(true);
    try {
      const data = await getMediaImages();
      console.log("Fetched images:", data); // log fetched data
      setImagesData(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch images.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Delete image with Swal confirmation
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
      await deleteMediaImage(id);
      setImagesData((prev) => prev.filter((img) => img.id !== id));
      Swal.fire("Deleted!", "Image has been deleted.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to delete image.", "error");
    }
  };

  if (loading)
    return <div className="p-6 text-gray-600">Loading images...</div>;

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
            {imagesData.map((img, index) => {
              const baseUrl = import.meta.env.VITE_API_BASE_URL.replace(
                /\/$/,
                ""
              );
              const previewUrl = img.image.startsWith("http")
                ? img.image
                : `${baseUrl}${img.image.startsWith("/") ? "" : "/"}${
                    img.image
                  }`;

              return (
                <tr key={img.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{img.title}</td>
                  <td className="px-6 py-4">
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt={img.title}
                        className="h-20 w-20 rounded-xl object-cover border border-gray-200"
                      />
                    )}
                  </td>
                  <td className="flex justify-center gap-3 px-6 py-4 text-center">
                    <Link
                      to={`/images/update/${img.id}`}
                      className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 hover:text-blue-800"
                    >
                      <UserPen size={16} /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(img.id)}
                      className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 hover:text-red-800 transition-colors"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              );
            })}

            {imagesData.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No images found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageImages;
