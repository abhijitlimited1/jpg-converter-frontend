import React, { useState, useRef } from "react";

const FileUpload = ({ onFileChange, accept, multiple }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files.length > 0) {
      onFileChange({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const fileTypeText = accept.includes("pdf") ? "PDF" : "JPG";
  const instructionText = multiple
    ? `Drag and drop multiple ${fileTypeText} files here, or click to select files`
    : `Drag and drop a ${fileTypeText} file here, or click to select`;

  return (
    <div className="mb-6 sm:mb-8">
      <label className="block mb-2 sm:mb-3 text-base sm:text-lg font-semibold text-gray-800">
        Upload File{multiple ? "s" : ""}
      </label>
      <div
        className={`w-full p-3 sm:p-6 md:p-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
          isDragging
            ? "border-blue-500 bg-blue-50 scale-102"
            : "border-gray-300 bg-gray-50 hover:bg-blue-50 hover:border-blue-300"
        }`}
        style={{ minHeight: "clamp(120px, 25vw, 150px)" }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="mb-3 sm:mb-4 p-2 sm:p-3 rounded-full bg-blue-100">
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
        </div>
        <p className="mb-2 text-sm sm:text-base font-medium text-gray-700 text-center">
          {instructionText}
        </p>
        <p className="text-xs sm:text-sm text-gray-500 mb-2 text-center">
          {accept.includes("pdf") ? "PDF files only" : "JPG/JPEG files only"}
        </p>
        <span className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 text-blue-700 rounded-full text-[10px] sm:text-xs font-medium">
          {accept.includes("pdf") ? "Max 20MB" : "Max 10 files"}
        </span>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={onFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default FileUpload;
