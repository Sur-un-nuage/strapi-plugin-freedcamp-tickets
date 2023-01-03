import React from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Wrapper from "./styles";

export default function BareEditor({ comment, handleCommentChange }) {
  const editor = useEditor({
    autofocus: true,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Ajouter un commentaire …",
      }),
    ],
    content: comment,
    onUpdate: ({ editor }) => {
      handleCommentChange(editor.getHTML());
    },
  });
  return (
    <div style={{ border: "1px solid #eee" }}>
      <Wrapper where="comment">
        <EditorContent editor={editor} />
      </Wrapper>
    </div>
  );
}
