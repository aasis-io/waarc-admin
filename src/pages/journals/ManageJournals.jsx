import { FileText, Trash2, UserPen } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

// Dummy journal data
const journalData = [
  {
    id: 1,
    title: "Climate Change Impact on Himalayas",
    authors: "Ashish Thapa, Sita Sharma",
    category: "Journals",
    publishedDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Sustainable Trekking Practices",
    authors: "Ramesh Koirala",
    category: "Our Publications",
    publishedDate: "2023-11-02",
  },
  {
    id: 3,
    title: "Biodiversity of Nepal",
    authors: "Sita Sharma, Ramesh Koirala",
    category: "Journals",
    publishedDate: "2023-08-21",
  },
];

const ManageJournals = () => {
  const handleEdit = (id) => {
    // TODO: Replace with backend API call
    console.log("Edit journal:", id);
  };

  const handleDelete = (id) => {
    // TODO: Replace with backend API call
    console.log("Delete journal:", id);
  };

  return (
    <div className="bg-[#e8e9ed] p-6">
      <h2 className="mb-6 text-2xl font-bold text-[#172542]">
        Manage Journals
      </h2>

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
                Authors
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-600">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-600">
                Published
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium uppercase tracking-wider text-gray-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {journalData.map((journal, index) => (
              <tr
                key={journal.id}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-gray-400" />
                    <span className="font-medium text-gray-800">
                      {journal.title}
                    </span>
                  </div>
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

                <td className="flex justify-center gap-3 px-6 py-4 text-center">
                  <Link
                    to={"/journals/edit"}
                    onClick={() => handleEdit(journal.id)}
                    className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-800"
                  >
                    <UserPen size={16} />
                    <span>Edit</span>
                  </Link>

                  <button
                    onClick={() => handleDelete(journal.id)}
                    className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 hover:text-red-800"
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

export default ManageJournals;
