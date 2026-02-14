import {
    AlignLeft,
    FileText,
    Image as ImageIcon,
    Save,
    Tag,
    Type,
} from "lucide-react";
import React, { useState } from "react";
import RichTextEditor from "../../components/RichTextEditor";

const HomePageDetails = () => {
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    description: "",
    metaTitle: "",
    metaKeywords: "",
    metaDescription: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Home Page Data:", formData);
  };

  return (
    <div className="bg-[#e8e9ed] p-6">
      <h2 className="mb-6 text-2xl font-bold text-[#172542]">
        Home Page Details
      </h2>

      <div className="max-w-6xl rounded-3xl bg-white p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Banner Image */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Banner Image
            </label>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-600 hover:border-[#17254e]">
              <ImageIcon size={16} />
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {formData.image && (
              <span className="ml-2 text-sm text-gray-500">
                {formData.image.name}
              </span>
            )}
          </div>

          {/* Title (H1) */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Page Title (H1)
            </label>
            <div className="relative">
              <Type
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Main headline of the home page"
                className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-[#17254e] focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Page Description
            </label>
            <RichTextEditor
              value={formData.description}
              onChange={(html) =>
                setFormData({ ...formData, description: html })
              }
            />
          </div>

          {/* SEO Section */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h3 className="mb-4 text-sm font-semibold text-gray-700">
              SEO Meta Information
            </h3>

            {/* Meta Title */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Meta Title
              </label>
              <div className="relative">
                <FileText
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  placeholder="SEO title (50–60 characters)"
                  className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-[#17254e] focus:outline-none"
                />
              </div>
            </div>

            {/* Meta Keywords */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Meta Keywords
              </label>
              <div className="relative">
                <Tag
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  name="metaKeywords"
                  value={formData.metaKeywords}
                  onChange={handleChange}
                  placeholder="8-12 keywords (comma separated)"
                  className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-[#17254e] focus:outline-none"
                />
              </div>
            </div>

            {/* Meta Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Meta Description
              </label>
              <div className="relative">
                <AlignLeft
                  size={16}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  rows={4}
                  placeholder="SEO description (150–160 characters)"
                  className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-[#17254e] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[#17254e] px-6 py-2.5 text-sm font-medium text-white shadow-lg hover:opacity-95"
            >
              <Save size={16} />
              Save Page Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePageDetails;
