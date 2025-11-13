"use client";

import { Button } from "@/components/ui/button";
import Link from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading2,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Undo2,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Écrivez votre savoir ici...",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleBulletList = () =>
    editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () =>
    editor.chain().focus().toggleOrderedList().run();
  const toggleHeading2 = () =>
    editor.chain().focus().toggleHeading({ level: 2 }).run();
  const toggleBlockquote = () =>
    editor.chain().focus().toggleBlockquote().run();
  const addLink = () => {
    const url = window.prompt("Entrez l'URL:");
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };
  const undo = () => editor.chain().focus().undo().run();
  const redo = () => editor.chain().focus().redo().run();

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-muted dark:bg-white/5 border border-border dark:border-white/10 rounded-md">
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("bold") ? "default" : "outline"}
          onClick={toggleBold}
          className="h-8 w-8 p-0"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("italic") ? "default" : "outline"}
          onClick={toggleItalic}
          className="h-8 w-8 p-0"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <div className="w-px bg-border dark:bg-white/10" />
        <Button
          type="button"
          size="sm"
          variant={
            editor.isActive("heading", { level: 2 }) ? "default" : "outline"
          }
          onClick={toggleHeading2}
          className="h-8 w-8 p-0"
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        <div className="w-px bg-border dark:bg-white/10" />
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("bulletList") ? "default" : "outline"}
          onClick={toggleBulletList}
          className="h-8 w-8 p-0"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("orderedList") ? "default" : "outline"}
          onClick={toggleOrderedList}
          className="h-8 w-8 p-0"
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <div className="w-px bg-border dark:bg-white/10" />
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("blockquote") ? "default" : "outline"}
          onClick={toggleBlockquote}
          className="h-8 w-8 p-0"
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={addLink}
          className="h-8 w-8 p-0"
          title="Add Link"
        >
          <LinkIcon className="w-4 h-4" />
        </Button>
        <div className="w-px bg-border dark:bg-white/10" />
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={undo}
          disabled={!editor.can().undo()}
          className="h-8 w-8 p-0"
          title="Undo"
        >
          <Undo2 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={redo}
          disabled={!editor.can().redo()}
          className="h-8 w-8 p-0"
          title="Redo"
        >
          <Redo2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Editor */}
      <div className="border border-border dark:border-white/10 rounded-md overflow-hidden bg-background dark:bg-white/5">
        <EditorContent
          editor={editor}
          className="prose dark:prose-invert prose-sm max-w-none p-4 focus:outline-none [&_p]:mb-0 [&_ul]:mb-0 [&_ol]:mb-0 [&_h2]:mb-2 [&_h3]:mb-2 [&_blockquote]:mb-2"
          style={{
            minHeight: "300px",
          }}
        />
      </div>

      {/* Helper text */}
      <p className="text-xs text-muted-foreground dark:text-white/50">
        {placeholder}
      </p>
    </div>
  );
}
