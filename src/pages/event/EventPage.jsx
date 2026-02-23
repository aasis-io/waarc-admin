import {
  CalendarDays,
  Image as ImageIcon,
  Link,
  Pencil,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import React, { useRef, useState } from "react";
// import { addEvent, updateEvent, deleteEvent } from "../../services/api"; 


const EMPTY_FORM = {
  title: "",
  eventDate: "",
  registrationLink: "",
  imageFile: null, 
  imagePreview: "", 
};

const EventPage = () => {
  const [event, setEvent] = useState(null); 
  const [mode, setMode] = useState("view"); 
  const [form, setForm] = useState(EMPTY_FORM);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // ── Helpers ──────────────────────────────────────────────────────────────

  const applyImageFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;

    // Revoke any previous blob URL to avoid memory leaks
    if (form.imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(form.imagePreview);
    }

    setForm((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: URL.createObjectURL(file), // temporary preview URL
    }));
  };

  const clearImage = () => {
    if (form.imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(form.imagePreview);
    }
    setForm((prev) => ({ ...prev, imageFile: null, imagePreview: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const enterEdit = () => {
    if (event) {
      // Pre-fill form with existing event data
      // imageFile stays null because we only need a new File if they re-upload
      setForm({
        title: event.title,
        eventDate: event.eventDate,
        registrationLink: event.registrationLink,
        imageFile: null,
        imagePreview: event.imagePreview, // could be blob URL or remote URL
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setMode("edit");
  };

  const cancelEdit = () => {
    // Clean up blob URL if user picked a new image but then cancelled
    if (form.imagePreview?.startsWith("blob:") && form.imageFile) {
      URL.revokeObjectURL(form.imagePreview);
    }
    setMode("view");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const savedEvent = {
      title: form.title,
      eventDate: form.eventDate,
      registrationLink: form.registrationLink,
      imagePreview: form.imagePreview, // display URL (blob or remote)
    };

    /*
    🔜 BACKEND INTEGRATION

    try {
      const payload = new FormData();
      payload.append("title", form.title);
      payload.append("eventDate", form.eventDate);
      payload.append("registrationLink", form.registrationLink);

      // Only attach imageFile if user picked a NEW image
      if (form.imageFile) {
        payload.append("image", form.imageFile);
      }

      let response;
      if (event?.id) {
        response = await updateEvent(event.id, payload);
      } else {
        response = await addEvent(payload);
      }

      // Backend returns the real image URL — use that for display
      savedEvent.imagePreview = response.data.imageUrl;
      savedEvent.id = response.data.id;

    } catch (error) {
      console.error("Failed to save event", error);
      return;
    }
    */

    setEvent(savedEvent);
    setMode("view");
  };

  const handleDelete = async () => {
    /*
    🔜 BACKEND INTEGRATION
    try {
      await deleteEvent(event.id);
    } catch (error) {
      console.error("Failed to delete event", error);
      return;
    }
    */

    // Clean up blob URL if it was a locally picked image
    if (event?.imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(event.imagePreview);
    }

    setEvent(null);
    setMode("view");
  };

  // ── Drag-and-drop ────────────────────────────────────────────────────────

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    applyImageFile(file);
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="bg-[#e8e9ed] p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#172542]">Event Management</h2>

        {/* Show "Add Event" button only when no event exists and not already editing */}
        {!event && mode === "view" && (
          <button
            onClick={enterEdit}
            className="flex items-center gap-2 rounded-xl bg-[#17254e] px-5 py-2.5 text-sm font-medium text-white shadow hover:opacity-90"
          >
            <Plus size={16} />
            Add Event
          </button>
        )}
      </div>

      {/* ── EDIT / ADD FORM ─────────────────────────────────────────────── */}
      {mode === "edit" && (
        <div className="max-w-3xl rounded-3xl bg-white p-8 shadow-xl mb-10">
          <h3 className="text-lg font-semibold text-[#172542] mb-6">
            {event ? "Edit Event" : "New Upcoming Event"}
          </h3>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Event Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Enter event title"
                required
                className="w-full rounded-xl border border-gray-300 py-2.5 px-4 text-sm focus:border-[#17254e] focus:outline-none"
              />
            </div>

            {/* Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Event Date
              </label>
              <input
                type="date"
                value={form.eventDate}
                onChange={(e) =>
                  setForm({ ...form, eventDate: e.target.value })
                }
                required
                className="w-full rounded-xl border border-gray-300 py-2.5 px-4 text-sm focus:border-[#17254e] focus:outline-none"
              />
            </div>

            {/* Registration Link */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Registration Link
              </label>
              <input
                type="url"
                value={form.registrationLink}
                onChange={(e) =>
                  setForm({ ...form, registrationLink: e.target.value })
                }
                placeholder="https://example.com/register"
                className="w-full rounded-xl border border-gray-300 py-2.5 px-4 text-sm focus:border-[#17254e] focus:outline-none"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Event Image
              </label>

              {/* Show preview if an image is selected */}
              {form.imagePreview ? (
                <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-gray-200">
                  <img
                    src={form.imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow text-red-500 hover:bg-red-50"
                    title="Remove image"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ) : (
                /* Drop zone shown only when no image is selected */
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex flex-col items-center justify-center gap-2 w-full h-36 rounded-2xl border-2 border-dashed cursor-pointer transition-colors
                    ${
                      dragOver
                        ? "border-[#17254e] bg-blue-50"
                        : "border-gray-300 hover:border-[#17254e]"
                    }`}
                >
                  <ImageIcon size={24} className="text-gray-400" />
                  <p className="text-sm text-gray-500">
                    Drag & drop or{" "}
                    <span className="text-[#17254e] font-medium">browse</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG, JPG, WEBP supported
                  </p>
                </div>
              )}

              {/* Hidden file input — triggered by the drop zone click */}
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
                onClick={cancelEdit}
                className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-[#17254e] px-6 py-2.5 text-sm font-medium text-white shadow hover:opacity-90"
              >
                <Save size={15} />
                Save Event
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── VIEW MODE ───────────────────────────────────────────────────── */}
      {mode === "view" && (
        <>
          {event ? (
            <div className="max-w-3xl rounded-3xl bg-white shadow-xl overflow-hidden">
              {/* Event image */}
              {event.imagePreview && (
                <img
                  src={event.imagePreview}
                  alt={event.title}
                  className="w-full h-64 object-cover"
                />
              )}

              <div className="p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block mb-2 text-xs font-semibold uppercase tracking-widest text-[#17254e] bg-blue-50 px-3 py-1 rounded-full">
                      Upcoming Event
                    </span>
                    <h3 className="text-xl font-bold text-[#172542]">
                      {event.title}
                    </h3>

                    {event.eventDate && (
                      <p className="flex items-center gap-1.5 mt-2 text-sm text-gray-500">
                        <CalendarDays size={14} />
                        {new Date(event.eventDate).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    )}

                    {event.registrationLink && (
                      <p className="flex items-center gap-1.5 mt-1 text-sm text-gray-400 truncate max-w-xs">
                        <Link size={13} />
                        {event.registrationLink}
                      </p>
                    )}
                  </div>

                  {/* Edit / Delete controls */}
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={enterEdit}
                      className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex items-center gap-1.5 rounded-xl border border-red-100 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                      Clear
                    </button>
                  </div>
                </div>

                {event.registrationLink && (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 rounded-xl bg-[#17254e] px-6 py-2.5 text-sm font-medium text-white hover:opacity-90"
                  >
                    Register Now →
                  </a>
                )}
              </div>
            </div>
          ) : (
            /* Empty state */
            <div className="max-w-3xl rounded-3xl bg-white p-12 shadow-xl flex flex-col items-center justify-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <CalendarDays size={28} className="text-gray-400" />
              </div>
              <div>
                <p className="text-gray-700 font-medium">No upcoming event</p>
                <p className="text-sm text-gray-400 mt-1">
                  Click "Add Event" above to schedule one.
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventPage;
