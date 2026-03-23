import {
  Image as ImageIcon,
  Link as LinkIcon,
  Plus,
  Save,
  Trash2,
  Wallpaper,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { addAlert, deleteAlert, getAlert } from "../../services/api";

const EMPTY_FORM = {
  title: "",
  link: "",
  imageFile: null,
  imagePreview: "",
};

const AlertManagement = () => {
  const [alert, setAlert] = useState(null);
  const [mode, setMode] = useState("view");
  const [form, setForm] = useState(EMPTY_FORM);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  /* ───────── LOAD ───────── */
  useEffect(() => {
    fetchAlert();
  }, []);

  const fetchAlert = async () => {
    setLoading(true);
    try {
      const res = await getAlert();
      if (res?.data) {
        const data = res.data;
        setAlert({
          id: data.id,
          title: data.title,
          link: data.link,
          imagePreview: data.image ? `${BASE_URL}${data.image}` : "",
        });
      } else {
        setAlert(null);
      }
    } catch (err) {
      console.error(err);
      setAlert(null);
    } finally {
      setLoading(false);
    }
  };

  /* ───────── IMAGE ───────── */
  const applyImageFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;

    if (form.imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(form.imagePreview);
    }

    setForm((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  const clearImage = () => {
    if (form.imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(form.imagePreview);
    }
    setForm((prev) => ({ ...prev, imageFile: null, imagePreview: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ───────── MODE ───────── */
  const enterAdd = () => {
    setForm(EMPTY_FORM);
    setMode("add");
  };

  const cancelAdd = () => {
    if (form.imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(form.imagePreview);
    }
    setMode("view");
  };

  /* ───────── SAVE ───────── */
  const handleSave = async (e) => {
    e.preventDefault();

    if (!form.imageFile) {
      Swal.fire("Image required", "Please upload an image", "warning");
      return;
    }

    setSaving(true);

    try {
      const payload = new FormData();
      payload.append("title", form.title.trim());
      payload.append("link", form.link.trim());
      payload.append("image", form.imageFile);

      await addAlert(payload);

      if (form.imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(form.imagePreview);
      }

      setMode("view");
      await fetchAlert();

      Swal.fire({
        icon: "success",
        title: "Alert Added!",
        text: "Your alert has been saved successfully.",
        confirmButtonColor: "#17254e",
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed to Save",
        text: "Something went wrong.",
        confirmButtonColor: "#17254e",
      });
    } finally {
      setSaving(false);
    }
  };

  /* ───────── DELETE ───────── */
  const handleDelete = async () => {
    const res = await Swal.fire({
      title: "Delete this alert?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    });

    if (!res.isConfirmed) return;

    try {
      await deleteAlert(alert.id);
      setAlert(null);

      Swal.fire({
        icon: "success",
        title: "Alert Deleted",
        confirmButtonColor: "#17254e",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire("Error", "Failed to delete", "error");
    }
  };

  /* ───────── RENDER ───────── */
  return (
    <div className="bg-[#e8e9ed] p-6 min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#172542]">Alert Management</h2>

        {mode === "view" && !alert && !loading && (
          <button
            onClick={enterAdd}
            className="flex items-center gap-2 rounded-xl cursor-pointer bg-[#17254e] px-5 py-2.5 text-sm font-medium text-white shadow hover:opacity-90 transition"
          >
            <Plus size={16} />
            Add Alert
          </button>
        )}
      </div>

      {/* LOADING */}
      {loading && (
        <div className="max-w-3xl rounded-3xl bg-white shadow-xl overflow-hidden animate-pulse">
          <div className="w-full h-64 bg-gray-200" />
          <div className="p-8 space-y-4">
            <div className="h-4 w-24 bg-gray-200 rounded-full" />
            <div className="h-6 w-64 bg-gray-200 rounded-full" />
          </div>
        </div>
      )}

      {/* FORM */}
      {!loading && mode === "add" && (
        <div className="max-w-3xl rounded-3xl bg-white p-8 shadow-xl mb-10">
          <h3 className="text-lg font-semibold text-[#172542] mb-6">
            New Alert Banner
          </h3>

          <form onSubmit={handleSave} className="space-y-6">
            {/* TITLE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full rounded-xl border border-gray-300 py-2.5 px-4 text-sm focus:border-[#17254e] focus:ring-2 focus:ring-[#17254e]/10"
              />
            </div>

            {/* LINK */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Link <span className="text-xs text-gray-400">(optional)</span>
              </label>
              <input
                type="url"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                className="w-full rounded-xl border border-gray-300 py-2.5 px-4 text-sm"
              />
            </div>

            {/* IMAGE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Image <span className="text-red-400">*</span>
              </label>

              {form.imagePreview ? (
                <div className="relative w-full h-52 rounded-2xl overflow-hidden border border-gray-300">
                  <img
                    src={form.imagePreview}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute top-2 right-2 bg-white p-1.5 rounded-full"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    applyImageFile(e.dataTransfer.files[0]);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex flex-col items-center justify-center h-40 rounded-2xl border-2 border-dashed cursor-pointer ${
                    dragOver
                      ? " bg-blue-50"
                      : "border-gray-300 hover:border-[#17254e]"
                  }`}
                >
                  <ImageIcon className="text-gray-400" />
                  <p className="text-sm text-gray-500">Drag & drop or browse</p>
                </div>
              )}

              <input
                type="file"
                hidden
                ref={fileInputRef}
                onChange={(e) => applyImageFile(e.target.files[0])}
              />
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={cancelAdd}
                className="border px-5 py-2.5 rounded-xl text-gray-600"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-[#17254e] cursor-pointer text-white px-6 py-2.5 rounded-xl"
              >
                <Save size={15} />
                {saving ? "Saving..." : "Save Alert"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* VIEW */}
      {!loading && mode === "view" && (
        <>
          {alert ? (
            <div className="max-w-3xl rounded-3xl bg-white shadow-xl overflow-hidden">
              <img
                src={alert.imagePreview}
                className="w-full h-64 object-cover"
              />

              <div className="p-8">
                <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest text-[#17254e] bg-blue-50 px-3 py-1 rounded-full">
                  Alert Banner
                </span>

                <h3 className="text-2xl font-bold text-[#172542]">
                  {alert.title}
                </h3>

                {alert.link ? (
                  <a
                    href={alert.link}
                    target="_blank"
                    className="flex items-center gap-2 mt-3 text-sm text-[#17254e] hover:underline"
                  >
                    <LinkIcon size={14} />
                    {alert.link}
                  </a>
                ) : (
                  <p className="text-sm text-gray-300 italic mt-2">
                    No link provided
                  </p>
                )}

                <button
                  onClick={handleDelete}
                  className="mt-7 flex items-center gap-2 text-red-500 border border-red-100 px-4 py-2 rounded-xl hover:bg-red-50"
                >
                  <Trash2 size={13} />
                  Delete Alert
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl rounded-3xl bg-white p-14 shadow-xl flex flex-col items-center text-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <Wallpaper size={32} className="text-gray-300" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-700">
                  No alert created
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Click "Add Event" to schedule one.
                </p>
              </div>
              <button
                onClick={enterAdd}
                className="mt-2 cursor-pointer flex items-center gap-2 rounded-xl bg-[#17254e] px-6 py-2.5 text-sm font-medium text-white shadow hover:opacity-90 transition-opacity"
              >
                <Plus size={15} />
                Add Alert
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AlertManagement;
