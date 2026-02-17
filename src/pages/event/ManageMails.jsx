import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import swal from "sweetalert2";
// import { getRegisteredMails, deleteRegisteredMail } from "../../services/api"; // Uncomment for backend

const ManageMails = () => {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMails = async () => {
      setLoading(true);
      try {
        // const data = await getRegisteredMails();
        // setMails(data);

        // Temporary mock
        setMails([
          {
            id: 1,
            fullName: "Ashish Thapa",
            email: "ashish@example.com",
            phone: "+977-9812345678",
          },
          {
            id: 2,
            fullName: "Sita Sharma",
            email: "sita@example.com",
            phone: "+977-9823456789",
          },
        ]);
      } catch (error) {
        console.error("Error fetching mails:", error);
        swal.fire("Error", "Failed to fetch registered mails", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchMails();
  }, []);

  const handleDelete = async (id) => {
    const result = await swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this entry!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      // await deleteRegisteredMail(id); // Backend call
      setMails(mails.filter((m) => m.id !== id)); // Temporary frontend delete
      swal.fire("Deleted!", "Entry has been deleted.", "success");
    } catch (error) {
      console.error("Error deleting mail:", error);
      swal.fire("Error", "Failed to delete entry", "error");
    }
  };

  if (loading) return <div className="p-6 text-gray-600">Loading mails...</div>;

  return (
    <div className="bg-[#e8e9ed] p-6">
      <h2 className="mb-6 text-2xl font-bold text-[#172542]">
        Manage Registered Mails
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full overflow-hidden rounded-2xl bg-white shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-600">
                SN
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-600">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-600">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-600">
                Phone
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium uppercase tracking-wider text-gray-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {mails.map((mail, index) => (
              <tr key={mail.id} className="transition-colors hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {mail.fullName}
                </td>
                <td className="px-6 py-4 text-gray-600">{mail.email}</td>
                <td className="px-6 py-4 text-gray-600">{mail.phone}</td>
                <td className="flex justify-center px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(mail.id)}
                    className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 cursor-pointer transition-colors hover:bg-red-100 hover:text-red-800"
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

export default ManageMails;
