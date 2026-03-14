import {
  FileText,
  Image as ImageIcon,
  Loader2,
  Save,
  Type,
} from "lucide-react";
import React, { useState } from "react";

const AddImage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 6 * 1024 * 1024) {
      setError("Image must be smaller than 6MB.");
      return;
    }

    setError("");
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Image Data:", formData);

      // reset form
      setFormData({
        title: "",
        description: "",
        image: null,
      });
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="bg-[#e8e9ed] p-6">
      <h2 className="mb-6 text-2xl font-bold text-[#172542]">Add Image</h2>

      <div className="max-w-6xl rounded-3xl bg-white p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Title
            </label>

            <div className="relative">
              <Type size={16} className="absolute left-3 top-3 text-gray-400" />

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Image title"
                className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-[#17254e] focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>

            <div className="relative">
              <FileText
                size={16}
                className="absolute left-3 top-3 text-gray-400"
              />

              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a short description about the image..."
                className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-[#17254e] focus:outline-none"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Upload Image
            </label>

            <p className="mb-3 text-xs text-gray-500">
              Recommended size: <strong>1200 × 900 px</strong> • Max file size:{" "}
              <strong>6MB</strong>
            </p>

            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-600 hover:border-[#17254e]">
              <ImageIcon size={16} />
              Upload Image
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleFileChange}
                className="hidden"
                required
              />
            </label>

            {formData.image && (
              <span className="ml-2 text-sm text-gray-500">
                {formData.image.name}
              </span>
            )}

            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#17254e] px-6 py-2.5 text-sm font-medium text-white shadow-lg hover:opacity-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Image
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddImage;
