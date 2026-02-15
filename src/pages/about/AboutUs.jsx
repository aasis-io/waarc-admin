import {
  AlignLeft,
  FileText,
  Image as ImageIcon,
  Save,
  Tag,
} from "lucide-react";
import React, { useState } from "react";
import RichTextEditor from "../../components/RichTextEditor";

const AboutUs = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,

    // SEO
    metaTitle: "",
    metaKeywords: "",
    metaDescription: "",

    // Why Us (fixed 4)
    whyUs: [
      { title: "", description: "" },
      { title: "", description: "" },
      { title: "", description: "" },
      { title: "", description: "" },
    ],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const toggleStatus = (key) => {
    setFormData({ ...formData, [key]: !formData[key] });
  };

  const updateWhyUs = (index, key, value) => {
    const updated = [...formData.whyUs];
    updated[index][key] = value;
    setFormData({ ...formData, whyUs: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: API integration (Create or Update singleton About Us)
    console.log("About Us Data:", formData);
  };

  return (
    <div className="bg-[#e8e9ed] p-6">
      <h2 className="text-2xl font-bold text-[#172542] mb-6">About Us</h2>

      <div className="max-w-6xl rounded-3xl bg-white p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* ===== Page Content ===== */}
          <section>
            <h3 className="text-lg font-semibold text-[#172542] mb-4">
              Page Content
            </h3>

            {/* Title */}
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Page title (H1)"
              className="w-full mb-4 rounded-xl border px-4 py-2.5 text-sm"
              required
            />

            {/* Description */}
            <RichTextEditor
              value={formData.description}
              onChange={(html) =>
                setFormData({ ...formData, description: html })
              }
            />

            {/* Image */}
            <div className="mt-4">
              <label className="inline-flex items-center gap-2 cursor-pointer rounded-xl border border-dashed px-4 py-3 text-sm text-gray-600">
                <ImageIcon size={16} />
                Upload Banner Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {formData.image && (
                <span className="ml-3 text-sm text-gray-500">
                  {formData.image.name}
                </span>
              )}
            </div>
          </section>

          {/* ===== Why Us ===== */}
          <section>
            <h3 className="text-lg font-semibold text-[#172542] mb-6">
              Why Us
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {formData.whyUs.map((item, index) => (
                <div key={index} className="rounded-2xl border p-5 space-y-3">
                  <input
                    type="text"
                    placeholder={`Why Us Title ${index + 1}`}
                    value={item.title}
                    onChange={(e) =>
                      updateWhyUs(index, "title", e.target.value)
                    }
                    className="w-full rounded-xl border px-4 py-2 text-sm"
                  />

                  <textarea
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) =>
                      updateWhyUs(index, "description", e.target.value)
                    }
                    rows={3}
                    className="w-full rounded-xl border px-4 py-2 text-sm"
                  />

                  {/* <button
                    type="button"
                    onClick={() => toggleWhyUsStatus(index)}
                    className="flex items-center gap-2 text-sm text-[#17254e]"
                  >
                    {item.status ? (
                      <ToggleRight size={22} />
                    ) : (
                      <ToggleLeft size={22} />
                    )}
                    {item.status ? "Visible" : "Hidden"}
                  </button> */}
                </div>
              ))}
            </div>
          </section>

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

          {/* ===== Submit ===== */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[#17254e] px-6 py-2.5 text-sm font-medium text-white shadow-lg"
            >
              <Save size={16} />
              Save About Us
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutUs;
