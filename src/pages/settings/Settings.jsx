import {
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  User,
  Youtube,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getSettings, updateSettings } from "../../services/api";

const basicFields = [
  { label: "Site Name", name: "siteName", icon: Globe, type: "text" },
  { label: "Contact Person", name: "contactPerson", icon: User, type: "text" },
  { label: "Email", name: "email", icon: Mail, type: "email" },
  { label: "Phone", name: "phone", icon: Phone, type: "text" },
  { label: "Location", name: "location", icon: MapPin, type: "text" },
];

const socialFields = [
  { label: "Facebook", name: "facebook", icon: Facebook },
  { label: "Instagram", name: "instagram", icon: Instagram },
  { label: "Twitter (X)", name: "twitter", icon: Twitter },
  { label: "LinkedIn", name: "linkedin", icon: Linkedin },
  { label: "YouTube", name: "youtube", icon: Youtube },
];

const Settings = () => {
  const [formData, setFormData] = useState({
    siteName: "",
    contactPerson: "",
    phone: "",
    email: "",
    location: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    youtube: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getSettings();

        if (res.data) {
          const cleaned = Object.fromEntries(
            Object.entries(res.data).map(([key, value]) => [key, value ?? ""])
          );

          setFormData((prev) => ({
            ...prev,
            ...cleaned,
          }));
        }
      } catch (error) {
        toast.error("Failed to fetch site settings");
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setIsSaving(true);

    try {
      await updateSettings(formData);
      toast.success("Site settings updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-[#e8e9ed] p-6">
      <h2 className="text-2xl font-bold text-[#172542] mb-6">Site Settings</h2>

      <div className="bg-white rounded-2xl shadow-md p-6 max-w-6xl">
        {/* Basic Info */}
        <h3 className="text-lg font-semibold text-[#172542] mb-4">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {basicFields.map((field, index) => {
            const Icon = field.icon;

            return (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {field.label}
                </label>

                <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 focus-within:border-[#172542] transition-colors text-sm">
                  <Icon size={18} className="text-gray-400" />

                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    placeholder={field.label}
                    className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Social Links */}
        <h3 className="text-lg font-semibold text-[#172542] mt-8 mb-4">
          Social Media Links
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {socialFields.map((field, index) => {
            const Icon = field.icon;

            return (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {field.label}
                </label>

                <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 focus-within:border-[#172542] transition-colors text-sm">
                  <Icon size={18} className="text-gray-400" />

                  <input
                    type="url"
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    placeholder={`Enter ${field.label} URL`}
                    className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Save */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className={`flex items-center cursor-pointer gap-2 rounded-xl px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all ${
              isSaving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#172542] hover:opacity-95"
            }`}
          >
            {isSaving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
