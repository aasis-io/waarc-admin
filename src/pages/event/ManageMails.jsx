import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { deleteRegisteredMail, getRegisteredMails } from "../../services/api";

const ManageMails = () => {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMails = async () => {
      setLoading(true);
      try {
        const response = await getRegisteredMails();
        console.log("Fetched mails:", response);
        setMails(response);
      } catch (error) {
        console.error("Error fetching mails:", error);
        Swal.fire("Error", "Failed to fetch registered mails", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchMails();
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

    if (!result.isConfirmed) return;

    try {
      await deleteRegisteredMail(id); // Call backend delete
      setMails((prev) => prev.filter((m) => m.id !== id));
      Swal.fire("Deleted!", "Entry has been deleted.", "success");
    } catch (error) {
      console.error("Error deleting mail:", error);
      Swal.fire("Error!", "Failed to delete entry.", "error");
    }
  };

  if (loading) return <div className="p-6 text-gray-600">Loading mails...</div>;

  return (
    <div className="bg-[#e8e9ed] p-6">
      <h2 className="text-2xl font-bold text-[#172542] mb-6">
        Manage Registered Mails
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-2xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                SN
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                Phone
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-600 uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {mails.map((mail, index) => (
              <tr key={mail.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-700">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {mail.fullName}
                </td>
                <td className="px-6 py-4 text-gray-600">{mail.email}</td>
                <td className="px-6 py-4 text-gray-600">{mail.phone}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleDelete(mail.id)}
                      className="flex items-center cursor-pointer gap-1 px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium text-sm transition-colors"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {mails.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No registered mails found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMails;
