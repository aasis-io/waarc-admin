import {
  Calendar,
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  Loader2,
  Save,
  Tag,
  Upload,
  User,
} from "lucide-react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast"; // <-- Import toast
import { addJournal } from "../../services/api";

const AddJournal = () => {
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    category: "",
    publishedDate: "",
    image: null,
    pdf: null,
    link: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Image validation
    if (e.target.name === "image") {
      if (file.size > 6 * 1024 * 1024) {
        setError("Cover image must be smaller than 6MB.");
        toast.error("Cover image must be smaller than 6MB.");
        return;
      }
      setError("");
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }

    // PDF validation
    if (e.target.name === "pdf") {
      if (file.size > 10 * 1024 * 1024) {
        setError("PDF file must be smaller than 10MB.");
        toast.error("PDF file must be smaller than 10MB.");
        return;
      }
      setError("");
    }

    setFormData({ ...formData, [e.target.name]: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.pdf && !formData.link) {
      toast.error("Please provide either a PDF file or a PDF link.");
      return;
    }

    setLoading(true);
    setError("");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("authors", formData.authors);
    data.append("category", formData.category);
    data.append("publishedDate", formData.publishedDate);
    if (formData.image) data.append("image", formData.image);
    if (formData.pdf) data.append("pdf", formData.pdf);
    if (formData.link) data.append("link", formData.link);

    try {
      const response = await addJournal(data);
      console.log("Journal saved:", response.data);

      toast.success("Journal saved successfully!");

      // Reset form after success
      setFormData({
        title: "",
        authors: "",
        category: "",
        publishedDate: "",
        image: null,
        pdf: null,
        link: "",
      });
      setImagePreview(null);
    } catch (err) {
      console.error("Error saving journal:", err);
      const message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#e8e9ed] p-6">
      {/* Toast container */}
      <Toaster position="top-right" />

      <h2 className="mb-6 text-2xl font-bold text-[#172542]">Add Journal</h2>

      <div className="max-w-6xl rounded-3xl bg-white p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Journal Title
            </label>
            <div className="relative">
              <FileText
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Journal title"
                className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-[#17254e] focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Authors */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Authors
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="authors"
                value={formData.authors}
                onChange={handleChange}
                placeholder="Author One, Author Two"
                className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-[#17254e] focus:outline-none"
                required
              />
            </div>
            <span className="mt-1 block text-xs text-gray-500">
              Separate authors with commas
            </span>
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Category
            </label>
            <div className="relative">
              <Tag
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-[#17254e] focus:outline-none"
                required
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="journals">Journals</option>
                <option value="publications">Our Publications</option>
              </select>
            </div>
          </div>

          {/* Published Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Date Published
            </label>
            <div className="relative">
              <Calendar
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="date"
                name="publishedDate"
                value={formData.publishedDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-[#17254e] focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Cover Image
            </label>
            <p className="mb-2 text-xs text-gray-500">
              Recommended: 600 × 450 px, max 6MB
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
              />
            </label>
            {formData.image && (
              <div className="mt-2 flex items-center gap-4">
                <img
                  src={imagePreview}
                  alt="Cover Preview"
                  className="h-24 w-24 rounded-lg object-cover"
                />
                <span className="text-sm text-gray-500">
                  {formData.image.name}
                </span>
              </div>
            )}
          </div>

          {/* PDF Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Journal PDF (Optional if using Link)
            </label>
            <p className="mb-2 text-xs text-gray-500">Max file size: 10MB</p>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-600 hover:border-[#17254e]">
              <Upload size={16} />
              Upload PDF
              <input
                type="file"
                accept="application/pdf"
                name="pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {formData.pdf && (
              <span className="ml-2 text-sm text-gray-500">
                {formData.pdf.name}
              </span>
            )}
          </div>

          {/* PDF Link */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              OR PDF Link (Google Drive / Other)
            </label>
            <div className="relative">
              <LinkIcon
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://drive.google.com/..."
                className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-[#17254e] focus:outline-none"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

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
                  Save Journal
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJournal;
