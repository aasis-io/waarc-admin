import { Save } from "lucide-react";
import React, { useEffect, useState } from "react";
// import { getUsefulLinkById, updateUsefulLink } from "../../services/api";
import { useParams } from "react-router-dom";

const EditUsefulLink = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ title: "", link: "" });

  useEffect(() => {
    const fetchLink = async () => {
      try {
        // const data = await getUsefulLinkById(id);
        // setFormData(data);

        // Mock
        setFormData({
          title: "Nepal Tourism",
          link: "https://www.welcomenepal.com",
        });
      } catch (error) {
        console.error("Failed to fetch link:", error);
      }
    };
    fetchLink();
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updated Useful Link:", formData);

    /*
    🔜 BACKEND
    try {
      const response = await updateUsefulLink(id, formData);
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Failed to update link", error);
    }
    */
  };

  return (
    <div className="bg-[#e8e9ed] p-6">
      <h2 className="text-2xl font-bold text-[#172542] mb-6">
        Edit Useful Link
      </h2>
      <div className="max-w-3xl rounded-3xl bg-white p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 py-2.5 px-4 text-sm focus:border-[#17254e] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Link
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 py-2.5 px-4 text-sm focus:border-[#17254e] focus:outline-none"
              required
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[#17254e] px-6 py-2.5 text-sm font-medium cursor-pointer text-white shadow-lg hover:opacity-95"
            >
              <Save size={16} /> Update Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUsefulLink;
