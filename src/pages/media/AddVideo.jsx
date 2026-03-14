import { FileText, Link as LinkIcon, Loader2, Save, Type } from "lucide-react";
import React, { useState } from "react";

const AddVideo = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoLink: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Video Data:", formData);

      // reset form
      setFormData({
        title: "",
        description: "",
        videoLink: "",
      });
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
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
              <Type size={16} className="absolute left-3 top-3 text-gray-400" />

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
                placeholder="Write a short description about the video..."
                className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-[#17254e] focus:outline-none"
              />
            </div>
          </div>

          {/* Video Link */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Video Link (Embed)
            </label>

            <div className="relative">
              <LinkIcon
                size={16}
                className="absolute left-3 top-3 text-gray-400"
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
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-[#17254e] px-6 py-2.5 text-sm font-medium text-white shadow-lg hover:opacity-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Video
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVideo;
