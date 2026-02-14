import CodeBlock from "@tiptap/extension-code-block";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Code,
  ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const RichTextEditor = ({ value, onChange }) => {
  const [showHTML, setShowHTML] = useState(false);
  const [currentHeading, setCurrentHeading] = useState("");
  const [htmlContent, setHtmlContent] = useState(value || "");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link,
      Heading.configure({ levels: [1, 2, 3] }),
      CodeBlock,
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setHtmlContent(html); // update textarea
      onChange(html); // sync back to parent
      updateCurrentHeading();
    },
    onSelectionUpdate: () => updateCurrentHeading(),
  });

  const updateCurrentHeading = () => {
    if (!editor) return;

    if (editor.isActive("heading", { level: 1 })) setCurrentHeading("H1");
    else if (editor.isActive("heading", { level: 2 })) setCurrentHeading("H2");
    else if (editor.isActive("heading", { level: 3 })) setCurrentHeading("H3");
    else setCurrentHeading("Normal");
  };

  useEffect(() => {
    updateCurrentHeading();
  }, [editor]);

  const addImageByUrl = () => {
    const url = prompt("Enter image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addLink = () => {
    const url = prompt("Enter link URL");
    if (url)
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
  };

  if (!editor) return null;

  const toggleHTMLMode = () => {
    if (showHTML && editor) {
      // When switching from HTML -> Rich Text, set the HTML content in editor
      editor.commands.setContent(htmlContent, false); // false = don't emit update immediately
    }
    setShowHTML(!showHTML);
  };

  return (
    <div className="rounded-xl border border-gray-300">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b p-2 bg-gray-50 items-center">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("bold") ? "bg-gray-200" : ""
          }`}
        >
          <Bold size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("italic") ? "bg-gray-200" : ""
          }`}
        >
          <Italic size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("bulletList") ? "bg-gray-200" : ""
          }`}
        >
          <List size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("orderedList") ? "bg-gray-200" : ""
          }`}
        >
          <ListOrdered size={16} />
        </button>

        <select
          onChange={(e) =>
            editor
              .chain()
              .focus()
              .toggleHeading({
                level: e.target.value === "" ? null : Number(e.target.value),
              })
              .run()
          }
          value={
            currentHeading === "Normal"
              ? ""
              : currentHeading === "H1"
              ? "1"
              : currentHeading === "H2"
              ? "2"
              : currentHeading === "H3"
              ? "3"
              : ""
          }
          className="p-2 border rounded"
        >
          <option value="">Normal</option>
          <option value="1">H1</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
        </select>

        <button
          type="button"
          onClick={addLink}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("link") ? "bg-gray-200" : ""
          }`}
        >
          <LinkIcon size={16} />
        </button>

        <button
          type="button"
          onClick={addImageByUrl}
          className="p-2 rounded hover:bg-gray-200"
        >
          <ImageIcon size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("codeBlock") ? "bg-gray-200" : ""
          }`}
        >
          <Code size={16} />
        </button>

        {/* HTML Toggle */}
        <button
          type="button"
          onClick={toggleHTMLMode}
          className="ml-auto p-2 rounded hover:bg-gray-200"
        >
          HTML
        </button>

        {/* Mode Indicator */}
        <span className="ml-2 text-sm text-gray-500">
          {showHTML ? "HTML Mode" : "Rich Text Mode"}
        </span>
      </div>

      {/* Editor / HTML */}
      {showHTML ? (
        <textarea
          className="w-full min-h-62.5 p-4 focus:outline-none font-mono"
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
        />
      ) : (
        <EditorContent
          editor={editor}
          className="min-h-62.5 p-4 focus:outline-none cursor-text"
          onClick={() => editor.chain().focus().run()}
        />
      )}
    </div>
  );
};

export default RichTextEditor;
