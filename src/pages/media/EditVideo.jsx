import { FileText, Link as LinkIcon, Loader2, Save, Type } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getMediaVideoById, updateMediaVideo } from "../../services/api"; // <-- backend API

const EditVideo = () => {
  const { id: videoId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // for initial fetch

  // Fetch existing video data
  useEffect(() => {
    const fetchVideo = async () => {
      setFetching(true);
      try {
        const data = await getMediaVideoById(videoId); // API returns {id, title, description, link}
        setFormData({
          title: data.title || "",
          description: data.description || "",
          link: data.link || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch video details!");
      } finally {
        setFetching(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.link) {
      toast.error("Title and video link are required.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        link: formData.link,
      };

      const res = await updateMediaVideo(videoId, payload);
      toast.success(`Video "${res.title}" updated successfully!`);
      navigate("/media/manage-videos");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update video.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching)
    return <p className="p-6 text-gray-500">Loading video details...</p>;

  return (
    <div className="bg-[#e8e9ed] p-6">
      <h2 className="mb-6 text-2xl font-bold text-[#172542]">Edit Video</h2>

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
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://www.youtube.com/embed/VIDEO_ID"
                className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-[#17254e] focus:outline-none"
                required
              />
            </div>

            {/* Live Preview */}
            {formData.link && (
              <div className="mt-4 rounded-lg border border-gray-300 overflow-hidden">
                <iframe
                  width="100%"
                  height="315"
                  src={formData.link}
                  title="Video Preview"
                  frameBorder="0"
                  allowFullScreen
                  className="rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center cursor-pointer gap-2 rounded-xl bg-[#17254e] px-6 py-2.5 text-sm font-medium text-white shadow-lg hover:opacity-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Update Video
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVideo;