import {
    Image as ImageIcon,
    Link as LinkIcon,
    Save,
    Type
} from "lucide-react";
import React, { useState } from "react";

const AddVideo = () => {
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: null,
    videoLink: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Video Data:", formData);
  };

  return (
    <div className="bg-[#e8e9ed] p-6">
      <h2 className="mb-6 text-2xl font-bold text-[#172542]">Add Video</h2>

      <div className="max-w-6xl rounded-3xl bg-white p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Video Title
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
                placeholder="Video title"
                className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-[#17254e] focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Video Thumbnail
            </label>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-600 hover:border-[#17254e]">
              <ImageIcon size={16} />
              Upload Thumbnail
              <input
                type="file"
                accept="image/*"
                name="thumbnail"
                onChange={handleFileChange}
                className="hidden"
                required
              />
            </label>
            {formData.thumbnail && (
              <span className="ml-2 text-sm text-gray-500">
                {formData.thumbnail.name}
              </span>
            )}
          </div>

          {/* Video Link */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Video Link (Embed)
            </label>
            <div className="relative">
              <LinkIcon
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="url"
                name="videoLink"
                value={formData.videoLink}
                onChange={handleChange}
                placeholder="https://www.youtube.com/embed/VIDEO_ID"
                className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-[#17254e] focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[#17254e] px-6 py-2.5 text-sm font-medium text-white shadow-lg hover:opacity-95"
            >
              <Save size={16} />
              Save Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVideo;
