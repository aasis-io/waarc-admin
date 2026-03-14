import { Trash2, UserPen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import { deleteUsefulLink, getUsefulLinks } from "../../services/api"; // make sure these exist

const ManageUsefulLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      try {
        const data = await getUsefulLinks();
        setLinks(data);
      } catch (error) {
        console.error("Error fetching links:", error);
        swal.fire("Error", "Failed to fetch links", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, []);

  const handleDelete = async (id) => {
    const result = await swal.fire({
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
      await deleteUsefulLink(id);
      setLinks((prev) => prev.filter((l) => l.id !== id));
      swal.fire("Deleted!", "Link has been deleted.", "success");
    } catch (error) {
      console.error("Error deleting link:", error);
      swal.fire("Error!", "Failed to delete link.", "error");
    }
  };
  if (loading) return <div className="p-6 text-gray-600">Loading links...</div>;

  return (
    <div className="bg-[#e8e9ed] p-6">
      <h2 className="mb-6 text-2xl font-bold text-[#172542]">
        Manage Useful Links
      </h2>

      {links.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl bg-white p-10 shadow">
          <p className="text-lg font-medium text-gray-600">
            No useful links added yet.
          </p>
          <Link
            to="/useful-links/add"
            className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Add Useful Link
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full overflow-hidden rounded-2xl bg-white shadow-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-600">
                  SN
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-600">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-600">
                  Link
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium uppercase tracking-wider text-gray-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {links.map((link, index) => (
                <tr
                  key={link.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {link.title}
                  </td>
                  <td className="px-6 py-4 text-blue-600 hover:underline">
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.link}
                    </a>
                  </td>
                  <td className="flex justify-center gap-3 px-6 py-4 text-center">
                    <Link
                      to={`/useful-links/update/${link.id}`}
                      className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 hover:text-blue-800"
                    >
                      <UserPen size={16} /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(link.id)}
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
      )}
    </div>
  );
};

export default ManageUsefulLinks;
