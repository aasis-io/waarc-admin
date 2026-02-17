import { Save } from "lucide-react";
import React, { useState } from "react";
// import { addUsefulLink } from "../../services/api";

const AddUsefulLink = () => {
  const [formData, setFormData] = useState({ title: "", link: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Useful Link:", formData);

    /*
    🔜 BACKEND INTEGRATION
    try {
      const response = await addUsefulLink(formData);
      console.log("API Response:", response.data);
      setFormData({ title: "", link: "" });
    } catch (error) {
      console.error("Failed to add useful link", error);
    }
    */
  };

  return (
    <div className="bg-[#e8e9ed] p-6">
      <h2 className="text-2xl font-bold text-[#172542] mb-6">
        Add Useful Link
      </h2>
      <div className="max-w-3xl rounded-3xl bg-white p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter link title"
              className="w-full rounded-xl border border-gray-300 py-2.5 px-4 text-sm focus:border-[#17254e] focus:outline-none"
              required
            />
          </div>

          {/* Link */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Link
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full rounded-xl border border-gray-300 py-2.5 px-4 text-sm focus:border-[#17254e] focus:outline-none"
              required
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[#17254e] px-6 py-2.5 text-sm font-medium cursor-pointer text-white shadow-lg hover:opacity-95"
            >
              <Save size={16} />
              Save Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUsefulLink;
