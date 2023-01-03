import React from "react";

export default function Thumbnails({ files }) {
  return (
    <div style={{ display: "flex" }}>
      {files.map((file) => {
        return (
          <a
            key={file.url}
            style={{ border: "2px solid blue", marginRight: 12 }}
            href={file.url}
            target="_blank"
          >
            <img
              src={file.url}
              alt={file.alt}
              style={{
                width: 30,
                height: 30,
              }}
            />
          </a>
        );
      })}
    </div>
  );
}
