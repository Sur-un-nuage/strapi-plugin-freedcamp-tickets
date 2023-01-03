import "../styles.css";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
// import Placeholder from "@tiptap/extension-placeholder";
import Wrapper from "./styles";

import MenuBar from "./menu_bar";

const Tiptap = ({ handleEditorChange, description }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      // Placeholder.configure({
      //   placeholder: "Ajouter une description …",
      // }),
    ],
    content: description,
    onUpdate: ({ editor }) => {
      handleEditorChange(editor.getHTML());
    },
  });

  return (
    <Wrapper where="main">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </Wrapper>
  );
};

export default Tiptap;
