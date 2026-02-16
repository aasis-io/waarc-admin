import {
  Calendar,
  FileText,
  Image as ImageIcon,
  Save,
  Tag,
  Upload,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
// import { getJournalById, updateJournal } from "../../services/api"; // Uncomment when backend is ready

const EditJournal = ({ journalId }) => {
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    category: "Journals",
    publishedDate: "",
    image: null,
    pdf: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  // Fetch existing journal data
  useEffect(() => {
    const fetchJournal = async () => {
      // Uncomment for real API call
      // const data = await getJournalById(journalId);
      // setFormData({
      //   title: data.title,
      //   authors: data.authors,
      //   category: data.category,
      //   publishedDate: data.publishedDate,
      //   image: null, // keep null until user uploads new
      //   pdf: null,   // same for PDF
      // });
      // if (data.imageUrl) setImagePreview(data.imageUrl);

      // Temporary mock
      setFormData({
        title: "Sample Journal Title",
        authors: "Author One, Author Two",
        category: "Journals",
        publishedDate: "2026-02-16",
        image: null,
        pdf: null,
      });
      setImagePreview("https://via.placeholder.com/150"); // mock preview
    };

    fetchJournal();
  }, [journalId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [e.target.name]: file });

    // Show image preview for cover image
    if (e.target.name === "image" && file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("authors", formData.authors);
    data.append("category", formData.category);
    data.append("publishedDate", formData.publishedDate);
    if (formData.image) data.append("image", formData.image);
    if (formData.pdf) data.append("pdf", formData.pdf);

    console.log("Journal Data (backend-ready):");
    for (let pair of data.entries()) {
      console.log(pair[0], ":", pair[1]);
    }

    // Uncomment when backend is ready
    // try {
    //   const response = await updateJournal(journalId, data);
    //   console.log("Journal updated:", response);
    // } catch (error) {
    //   console.error("Error updating journal:", error);
    // }
  };

  return (
    <div className="bg-[#e8e9ed] p-6">
      <h2 className="mb-6 text-2xl font-bold text-[#172542]">Edit Journal</h2>

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
                placeholder="Author One, Author Two, Author Three"
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
              >
                <option value="Journals">Journals</option>
                <option value="Our Publications">Our Publications</option>
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
            {imagePreview && (
              <div className="mt-2 flex items-center gap-4">
                <img
                  src={imagePreview}
                  alt="Cover Preview"
                  className="h-24 w-24 rounded-lg object-cover"
                />
                {formData.image && (
                  <span className="text-sm text-gray-500">
                    {formData.image.name}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* PDF Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Journal PDF
            </label>
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

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[#17254e] cursor-pointer px-6 py-2.5 text-sm font-medium text-white shadow-lg hover:opacity-95"
            >
              <Save size={16} />
              Update Journal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJournal;
