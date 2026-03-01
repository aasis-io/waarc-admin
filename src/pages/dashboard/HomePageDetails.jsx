import {
  AlignLeft,
  FileText,
  Image as ImageIcon,
  Save,
  Tag,
  TextInitial
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { getHomePageDetails, updateHomePageDetails } from "../../services/api";

const HomePageDetails = () => {
  const [formData, setFormData] = useState({
    bannerImage: null,
    pageTitle: "",
    pageSubtitle: "",
    metaTitle: "",
    metaKeywords: "",
    metaDescription: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, bannerImage: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      if (formData.bannerImage) {
        payload.append("bannerImage", formData.bannerImage);
      }

      payload.append("description", formData.pageSubtitle);
      payload.append("metaTitle", formData.metaTitle);
      payload.append("metaKeywords", formData.metaKeywords);
      payload.append("metaDescription", formData.metaDescription);

      const response = await updateHomePageDetails(payload);
      console.log("API Response:", response.data);

      alert("Home page updated successfully!");
    } catch (error) {
      console.error("Failed to update home page", error);
      alert("Failed to update, check console for errors.");
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getHomePageDetails();
        const data = response.data;

        setFormData({
          bannerImage: null,
          pageTitle: "", // backend does not provide title
          pageSubtitle: data.description || "",
          metaTitle: data.metaTitle || "",
          metaKeywords: data.metaKeywords || "",
          metaDescription: data.metaDescription || "",
        });

        if (data.bannerImage) {
          const fullUrl = data.bannerImage.startsWith("http")
            ? data.bannerImage
            : `${process.env.REACT_APP_API_BASE_URL}${data.bannerImage}`;
          setImagePreview(fullUrl);
        }
      } catch (error) {
        console.error("Failed to fetch home page details", error);
      }
    };

    fetchDetails();
  }, []);

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
              Upload New Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                name="bannerImage"
              />
            </label>

            {imagePreview && (
              <div className="mt-3">
                <img
                  src={imagePreview}
                  alt="Banner Preview"
                  className="h-40 w-full max-w-md object-cover rounded-xl border border-gray-200"
                />
              </div>
            )}
          </div>

          {/* Page Subtitle */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Page Subtitle
            </label>
            <div className="relative">
              <TextInitial
                size={16}
                className="absolute left-3 top-3 text-gray-400"
              />
              <textarea
                name="pageSubtitle"
                value={formData.pageSubtitle}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 pl-10 text-sm"
                rows={4}
              />
            </div>
          </div>

          {/* SEO Section */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h3 className="mb-4 text-sm font-semibold text-gray-700">
              SEO Meta Information
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
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
                  className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
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
                  className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
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
                  className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[#17254e] px-6 py-2.5 text-sm text-white"
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
