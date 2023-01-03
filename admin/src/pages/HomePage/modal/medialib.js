import React, { useState } from "react";
import { prefixFileUrlWithBackendUrl, useLibrary } from "@strapi/helper-plugin";
import PropTypes from "prop-types";

export default function MediaLib({ isOpen, closeLibrary, onFileChange }) {
  const { components } = useLibrary();
  const MediaLibraryDialog = components["media-library"];
  const handleSelectAssets = (files) => {
    const formattedFiles = files.map((f) => ({
      alt: f.alternativeText || f.name,
      url: prefixFileUrlWithBackendUrl(f.url),
      mime: f.mime,
    }));
    onFileChange(formattedFiles);
  };
  if (!isOpen) {
    return null;
  }
  return (
    <MediaLibraryDialog
      onClose={closeLibrary}
      onSelectAssets={handleSelectAssets}
    />
  );
}
