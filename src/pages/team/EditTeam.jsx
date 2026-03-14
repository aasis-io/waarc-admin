import { Briefcase, MapPin, Save, Upload, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getTeamMember, updateTeamMember } from "../../services/api";

const EditTeam = () => {
  const { id: memberId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    image: null,
    name: "",
    position: "",
    location: "",
  });
  const [preview, setPreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false); // <-- new state

  // Fetch existing member
  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await getTeamMember(memberId);
        const member = response.data;

        setFormData({
          image: null,
          name: member.name || "",
          position: member.position || "",
          location: member.location || "",
        });

        if (member.image) {
          const baseUrl = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");
          const fullUrl = member.image.startsWith("http")
            ? member.image
            : `${baseUrl}${member.image.startsWith("/") ? "" : "/"}${
                member.image
              }`;
          setPreview(fullUrl);
        }
      } catch (error) {
        console.error("Failed to fetch team member", error);
        toast.error("Failed to load team member details!");
      }
    };

    fetchMember();
  }, [memberId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true); // <-- start saving

    try {
      const payload = new FormData();
      if (formData.image) payload.append("image", formData.image);
      payload.append("name", formData.name);
      payload.append("position", formData.position);
      payload.append("location", formData.location);

      // Call API
      await updateTeamMember(memberId, payload);

      toast.success("Team member details updated successfully");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update team member!");
    } finally {
      setIsSaving(false); // <-- stop saving
    }
  };

  return (
    <div className="bg-[#e8e9ed] p-6">
      <h2 className="text-2xl font-bold text-[#172542] mb-6">
        Edit Team Detail
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
              Upload New Image
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
            <span className="block mt-2 text-sm text-gray-500">
              Recommended: 400 x 400 px
            </span>

            {/* Preview */}
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="h-32 w-32 rounded-xl object-cover border border-gray-300"
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
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name"
                className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-[#17254e] focus:outline-none"
                required
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
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="e.g. Research Director"
                className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-[#17254e] focus:outline-none"
                required
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
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
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
              disabled={isSaving} // disable while saving
              className={`flex items-center gap-2 rounded-xl bg-[#17254e] px-6 py-2.5 text-sm font-medium text-white shadow-lg hover:opacity-95 transition-all duration-200 ${
                isSaving ? "cursor-wait opacity-70" : "cursor-pointer"
              }`}
            >
              <Save size={16} />
              {isSaving ? "Saving..." : "Update Details"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTeam;
