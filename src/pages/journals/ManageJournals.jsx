import { Trash2, UserPen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteJournal, getJournals } from "../../services/api";

const ManageJournals = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJournals = async () => {
      setLoading(true);
      try {
        const response = await getJournals();
        const data = response.data || [];

        data.sort(
          (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
        );

        setJournals(data);
      } catch (error) {
        console.error("Error fetching journals:", error);
        Swal.fire("Error", "Failed to fetch journals", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchJournals();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this journal!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteJournal(id);
      setJournals((prev) => prev.filter((j) => j.id !== id));
      Swal.fire("Deleted!", "Journal has been deleted.", "success");
    } catch (error) {
      console.error("Error deleting journal:", error);
      Swal.fire("Error!", "Failed to delete journal.", "error");
    }
  };

  if (loading)
    return (
      <div className="p-6 text-gray-600 font-medium">Loading journals...</div>
    );

  return (
    <div className="bg-[#e8e9ed] p-6">
      <h2 className="mb-6 text-2xl font-bold text-[#172542]">
        Manage Journals
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-2xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                SN
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                Authors
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                Published
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-600 uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {journals.map((journal, index) => (
              <tr
                key={journal.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-700">
                  {index + 1}
                </td>

                <td className="px-6 py-4 flex items-center gap-3">
                  <span className="font-medium text-gray-800">
                    {journal.title}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-600">{journal.authors}</td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    {journal.category}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {journal.publishedDate}
                </td>

                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/journals/update/${journal.id}`}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium text-sm"
                    >
                      <UserPen size={16} /> Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(journal.id)}
                      className="flex cursor-pointer items-center gap-1 px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium text-sm"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {journals.length === 0 && !loading && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No journals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageJournals;
