import { Briefcase, MapPin, Save, Upload, User } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { addTeamMember } from "../../services/api";

const AddTeam = () => {
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    position: "",
    location: "",
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({ ...formData, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.position) {
      toast.error("Name and position are required");
      return;
    }

    const payload = new FormData();
    payload.append("image", formData.image);
    payload.append("name", formData.name);
    payload.append("position", formData.position);
    payload.append("location", formData.location);

    setLoading(true);
    const toastId = toast.loading("Saving team member...");

    try {
      await addTeamMember(payload);

      toast.success("Team member added successfully!", {
        id: toastId,
      });

      // Reset form
      setFormData({
        image: null,
        name: "",
        position: "",
        location: "",
      });
      setPreview(null);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to add team member",
        { id: toastId }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#e8e9ed] p-6">
      <h2 className="mb-6 text-2xl font-bold text-[#172542]">
        Add Team Member
      </h2>

      <div className="max-w-6xl rounded-3xl bg-white p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Profile Image
            </label>

            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-600 hover:border-[#17254e]">
              <Upload size={16} />
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

            <span className="mt-2 block text-sm text-gray-500">
              400 × 400 px recommended
            </span>

            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-32 w-32 rounded-xl border border-gray-300 object-cover"
                />
              </div>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name"
                required
                className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-[#17254e] focus:outline-none"
              />
            </div>
          </div>

          {/* Position */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Position
            </label>
            <div className="relative">
              <Briefcase
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="e.g. Research Director"
                required
                className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-[#17254e] focus:outline-none"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Location
            </label>
            <div className="relative">
              <MapPin
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Kathmandu, Nepal"
                className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-[#17254e] focus:outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-[#17254e] px-6 py-2.5 text-sm font-medium text-white shadow-lg hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={16} />
              {loading ? "Saving..." : "Save Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeam;
