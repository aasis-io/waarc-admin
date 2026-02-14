import {
  Facebook,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  User,
  Youtube,
} from "lucide-react";

const fields = [
  { label: "Site Name", name: "siteName", icon: Globe, type: "text" },
  { label: "Contact Email", name: "email", icon: Mail, type: "email" },
  { label: "Address", name: "address", icon: MapPin, type: "text" },
  {
    label: "Main Contact Person",
    name: "contactPerson",
    icon: User,
    type: "text",
  },
  {
    label: "Phone Number (Nepal)",
    name: "phone",
    icon: Phone,
    type: "tel",
    placeholder: "+977 98XXXXXXXX",
  },
];

const socialFields = [
  { label: "Facebook", name: "facebook", icon: Facebook },
  { label: "YouTube", name: "youtube", icon: Youtube },
  { label: "LinkedIn", name: "linkedin", icon: Linkedin },
  { label: "X (Twitter)", name: "twitter", icon: Twitter },
];

const Settings = () => {
  return (
    <div className="bg-[#e8e9ed] p-6">
      <h2 className="text-2xl font-bold text-[#172542] mb-6">Site Settings</h2>

      <div className="bg-white rounded-2xl shadow-md p-6 max-w-6xl">
        {/* Basic Info */}
        <h3 className="text-lg font-semibold text-[#172542] mb-4">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {fields.map((field, index) => {
            const Icon = field.icon;
            return (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {field.label}
                </label>

                <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 focus-within:border-[#172542] transition-colors">
                  <Icon size={18} className="text-gray-400" />
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder || field.label}
                    className="w-full outline-none text-gray-700 placeholder-gray-400"
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

                <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 focus-within:border-[#172542] transition-colors">
                  <Icon size={18} className="text-gray-400" />
                  <input
                    type="url"
                    name={field.name}
                    placeholder={`Enter ${field.label} URL`}
                    className="w-full outline-none text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button className="bg-[#172542] text-white px-6 py-2 rounded-xl font-medium hover:opacity-90 transition-opacity">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
