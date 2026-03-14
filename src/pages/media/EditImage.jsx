import {
  FileText,
  Image as ImageIcon,
  Loader2,
  Save,
  Type,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getMediaImageById, updateMediaImage } from "../../services/api"; // <-- backend API

const EditImage = () => {
  const { id: imageId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null, // new file
  });
  const [preview, setPreview] = useState(null); // image preview
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch existing image
  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        const data = await getMediaImageById(imageId); // fetch from backend
        setFormData({
          title: data.title || "",
          description: data.description || "",
          image: null,
        });

        if (data.image) {
          const baseUrl = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");
          const fullUrl = data.image.startsWith("http")
            ? data.image
            : `${baseUrl}${data.image.startsWith("/") ? "" : "/"}${data.image}`;
          setPreview(fullUrl);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch image details!");
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [imageId]);

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
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      setError("Title is required.");
      return;
    }

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      if (formData.image) payload.append("image", formData.image);

      const res = await updateMediaImage(imageId, payload);
      toast.success(`Image "${res.title}" updated successfully!`);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#e8e9ed] p-6">
      <h2 className="mb-6 text-2xl font-bold text-[#172542]">Edit Image</h2>

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
              Upload New Image
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {formData.image && (
              <span className="ml-2 text-sm text-gray-500">
                {formData.image.name}
              </span>
            )}
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

            {/* Preview */}
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-32 w-32 rounded-xl object-cover border border-gray-300"
                />
              </div>
            )}
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
                  Update Image
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditImage;
