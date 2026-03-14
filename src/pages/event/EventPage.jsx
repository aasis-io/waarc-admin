import {
  CalendarDays,
  ExternalLink,
  Image as ImageIcon,
  Link,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { addEvent, deleteEvent, getEvent } from "../../services/api";

const EMPTY_FORM = {
  title: "",
  eventDate: "",
  registrationLink: "",
  imageFile: null,
  imagePreview: "",
};

const parseLocalDate = (dateStr) => {
  if (!dateStr) return null;
  const isoStr = dateStr.replace(" ", "T");

  const d = new Date(isoStr);
  return isNaN(d) ? null : d;
};

const formatDate = (dateStr) => {
  const d = parseLocalDate(dateStr);
  if (!d) return "Date not set";
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const EventPage = () => {
  const [event, setEvent] = useState(null);
  const [mode, setMode] = useState("view"); // "view" | "add"
  const [form, setForm] = useState(EMPTY_FORM);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  /* ─────────────────────────────
     LOAD EVENT
  ───────────────────────────── */
  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    setLoading(true);
    try {
      const res = await getEvent();
      if (res?.data) {
        const data = res.data;
        setEvent({
          id: data.id,
          title: data.title,
          eventDate: data.date,
          registrationLink: data.link,
          imagePreview: data.image ? `${BASE_URL}${data.image}` : "",
        });
      } else {
        setEvent(null);
      }
    } catch (err) {
      console.error("Failed to load event", err);
      setEvent(null);
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────
     IMAGE HELPERS
  ───────────────────────────── */
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

  /* ─────────────────────────────
     ADD / CANCEL
  ───────────────────────────── */
  const enterAdd = () => {
    setForm(EMPTY_FORM);
    setMode("add");
  };

  const cancelAdd = () => {
    if (form.imageFile && form.imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(form.imagePreview);
    }
    setMode("view");
  };

  /* ─────────────────────────────
     SAVE EVENT
  ───────────────────────────── */
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = new FormData();
      payload.append("title", form.title.trim());
      payload.append("date", form.eventDate);
      payload.append("link", form.registrationLink.trim());
      if (form.imageFile) {
        payload.append("image", form.imageFile);
      }

      await addEvent(payload);

      if (form.imageFile && form.imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(form.imagePreview);
      }

      setMode("view");
      await fetchEvent();

      Swal.fire({
        icon: "success",
        title: "Event Added!",
        text: "Your event has been saved successfully.",
        confirmButtonColor: "#17254e",
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Failed to save event", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Save",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#17254e",
      });
    } finally {
      setSaving(false);
    }
  };

  /* ─────────────────────────────
     DELETE EVENT
  ───────────────────────────── */
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete this event?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteEvent(event);
      setEvent(null);
      setMode("view");

      Swal.fire({
        icon: "success",
        title: "Event Deleted",
        text: "The event has been removed.",
        confirmButtonColor: "#17254e",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Failed to delete event", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Clear",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#17254e",
      });
    }
  };

  /* ─────────────────────────────
     DRAG DROP
  ───────────────────────────── */
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    applyImageFile(e.dataTransfer.files[0]);
  };

  /* ─────────────────────────────
     RENDER
  ───────────────────────────── */
  return (
    <div className="bg-[#e8e9ed] p-6 min-h-screen">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#172542]">Event Management</h2>

        {mode === "view" && !event && !loading && (
          <button
            onClick={enterAdd}
            className="flex items-center gap-2 rounded-xl bg-[#17254e] px-5 py-2.5 text-sm font-medium text-white shadow hover:opacity-90 transition-opacity"
          >
            <Plus size={16} />
            Add Event
          </button>
        )}
      </div>

      {/* ── Loading skeleton ── */}
      {loading && (
        <div className="max-w-3xl rounded-3xl bg-white shadow-xl overflow-hidden animate-pulse">
          <div className="w-full h-64 bg-gray-200" />
          <div className="p-8 space-y-4">
            <div className="h-4 w-24 bg-gray-200 rounded-full" />
            <div className="h-6 w-64 bg-gray-200 rounded-full" />
            <div className="h-4 w-48 bg-gray-200 rounded-full" />
          </div>
        </div>
      )}

      {/* ── Add Form ── */}
      {!loading && mode === "add" && (
        <div className="max-w-3xl rounded-3xl bg-white p-8 shadow-xl mb-10">
          <h3 className="text-lg font-semibold text-[#172542] mb-6">
            New Upcoming Event
          </h3>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Event Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Annual Tech Summit 2025"
                required
                className="w-full rounded-xl border border-gray-300 py-2.5 px-4 text-sm placeholder-gray-400 focus:border-[#17254e] focus:outline-none focus:ring-2 focus:ring-[#17254e]/10 transition"
              />
            </div>

            {/* Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Event Date <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                value={form.eventDate}
                onChange={(e) =>
                  setForm({ ...form, eventDate: e.target.value })
                }
                required
                className="w-full rounded-xl border border-gray-300 py-2.5 px-4 text-sm text-gray-700 focus:border-[#17254e] focus:outline-none focus:ring-2 focus:ring-[#17254e]/10 transition"
              />
            </div>

            {/* Registration Link */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Registration Link{" "}
                <span className="ml-1 text-xs text-gray-400 font-normal">
                  (optional)
                </span>
              </label>
              <input
                type="url"
                value={form.registrationLink}
                onChange={(e) =>
                  setForm({ ...form, registrationLink: e.target.value })
                }
                placeholder="https://example.com/register"
                className="w-full rounded-xl border border-gray-300 py-2.5 px-4 text-sm placeholder-gray-400 focus:border-[#17254e] focus:outline-none focus:ring-2 focus:ring-[#17254e]/10 transition"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Event Image{" "}
                <span className="ml-1 text-xs text-gray-400 font-normal">
                  (optional)
                </span>
              </label>
              <p className="mb-2 text-xs text-gray-500">
                Recommended size: 600 × 450 px
              </p>

              {form.imagePreview ? (
                <div className="relative w-full h-52 rounded-2xl overflow-hidden border border-gray-200">
                  <img
                    src={form.imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/40 to-transparent px-4 py-2">
                    <p className="text-white text-xs opacity-80">
                      Click the trash icon to remove
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex flex-col items-center justify-center gap-2 w-full h-40 rounded-2xl border-2 border-dashed cursor-pointer transition-colors
        ${
          dragOver
            ? "border-[#17254e] bg-blue-50"
            : "border-gray-300 hover:border-[#17254e] hover:bg-gray-50"
        }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <ImageIcon size={18} className="text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">
                    Drag & drop or{" "}
                    <span className="text-[#17254e] font-medium underline underline-offset-2">
                      browse
                    </span>
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG, JPG, WEBP supported
                  </p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => applyImageFile(e.target.files[0])}
                className="hidden"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={cancelAdd}
                disabled={saving}
                className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-xl bg-[#17254e] px-6 py-2.5 text-sm font-medium text-white shadow hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                <Save size={15} />
                {saving ? "Saving…" : "Save Event"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── View Mode ── */}
      {!loading && mode === "view" && (
        <>
          {event ? (
            <div className="max-w-3xl rounded-3xl bg-white shadow-xl overflow-hidden">
              {/* Image or placeholder */}
              {event.imagePreview ? (
                <img
                  src={event.imagePreview}
                  alt={event.title}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-linear-to-br from-[#17254e]/10 to-[#17254e]/5 flex items-center justify-center border-b border-gray-100">
                  <div className="flex flex-col items-center gap-2 text-gray-300">
                    <ImageIcon size={36} />
                    <span className="text-xs">No image uploaded</span>
                  </div>
                </div>
              )}

              <div className="p-8">
                <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest text-[#17254e] bg-blue-50 px-3 py-1 rounded-full">
                  Upcoming Event
                </span>

                <h3 className="text-2xl font-bold text-[#172542] leading-snug">
                  {event.title || (
                    <span className="text-gray-300 italic">Untitled Event</span>
                  )}
                </h3>

                <p className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                  <CalendarDays size={15} className="text-[#17254e] shrink-0" />
                  {event.eventDate ? (
                    formatDate(event.eventDate)
                  ) : (
                    <span className="text-gray-300 italic">No date set</span>
                  )}
                </p>

                {event.registrationLink ? (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 mt-2 text-sm text-[#17254e] hover:underline truncate max-w-sm"
                  >
                    <Link size={13} className="shrink-0" />
                    <span className="truncate">{event.registrationLink}</span>
                    <ExternalLink size={11} className="shrink-0 opacity-60" />
                  </a>
                ) : (
                  <p className="flex items-center gap-1.5 mt-2 text-sm text-gray-300 italic">
                    <Link size={13} className="shrink-0" />
                    No registration link
                  </p>
                )}

                <button
                  onClick={handleDelete}
                  className="mt-7 flex items-center gap-1.5 rounded-xl border border-red-100 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={13} />
                  Delete Event
                </button>
              </div>
            </div>
          ) : (
            /* Empty state */
            <div className="max-w-3xl rounded-3xl bg-white p-14 shadow-xl flex flex-col items-center justify-center text-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <CalendarDays size={32} className="text-gray-300" />
              </div>
              <div>
                <p className="text-gray-700 font-semibold text-lg">
                  No upcoming event
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Click "Add Event" to schedule one.
                </p>
              </div>
              <button
                onClick={enterAdd}
                className="mt-2 flex items-center gap-2 rounded-xl bg-[#17254e] px-6 py-2.5 text-sm font-medium text-white shadow hover:opacity-90 transition-opacity"
              >
                <Plus size={15} />
                Add Event
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventPage;
