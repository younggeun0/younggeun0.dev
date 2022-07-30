import React from "react";
import dynamic from "next/dynamic";
import onImagePasted from "./onImagePasted";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

const MarkdownEditor = ({markdown, setMarkdown}: { markdown: string; setMarkdown: any}) => {
    return (
        <div data-color-mode="light">
            <MDEditor
                value={markdown}
                onChange={value => {
                    setMarkdown(value);
                }}
                onPaste={async event => {
                    await onImagePasted(event.clipboardData, setMarkdown);
                }}
                onDrop={async event => {
                    await onImagePasted(event.dataTransfer, setMarkdown);
                }}
                height={800}
                textareaProps={{
                    placeholder: "Fill in your markdown for the coolest of the cool.",
                }}
            />
        </div>
    );
};

export default MarkdownEditor;
