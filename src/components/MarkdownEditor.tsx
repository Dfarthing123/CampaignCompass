"use client";

import React, { useRef } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export type MarkdownEditorHandle = {
  getValue: () => string;
};

type Props = {
  value: string;
};

const MarkdownEditor = React.forwardRef<MarkdownEditorHandle, Props>(
  ({ value }, ref) => {
    const editorRef = useRef<any>(null);

    // Expose getValue to parent via ref
    React.useImperativeHandle(ref, () => ({
      getValue: () => editorRef.current?.value() ?? "",
    }));

    return (
      <SimpleMDE
        value={value}
        options={{
          spellChecker: false,
          toolbar: [
            "bold",
            "heading",
            "italic",
            "link",
            "ordered-list",
            "unordered-list",
            "preview",
          ],
        }}
        getMdeInstance={(instance) => {
          editorRef.current = instance;
        }}
      />
    );
  }
);

MarkdownEditor.displayName = "MarkdownEditor";
export default MarkdownEditor;
