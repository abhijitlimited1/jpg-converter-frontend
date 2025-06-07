import React from "react";

const Preview = ({ files, conversionType, onRemove }) => {
  if (!files || files.length === 0) return null;

  const handleRemove = (index) => {
    if (onRemove) {
      onRemove(index);
    }
  };

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex justify-between items-center mb-2 sm:mb-3">
        <h3 className="text-base sm:text-lg font-medium text-gray-700">
          Preview
        </h3>
        <span className="text-xs sm:text-sm text-gray-500">
          {files.length} file{files.length !== 1 ? "s" : ""} selected
        </span>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-start">
        {files.map((file, index) => (
          <div key={index} className="relative group">
            <div className="relative overflow-hidden border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              {conversionType === "jpgToPdf" ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 object-cover"
                />
              ) : (
                <div className="bg-gray-100 w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 flex flex-col items-center justify-center p-2">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-gray-400 mb-1 sm:mb-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                  </svg>
                  <span className="text-gray-600 font-medium text-center text-xs sm:text-sm">
                    PDF Document
                  </span>
                </div>
              )}

              {onRemove && (
                <button
                  onClick={() => handleRemove(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                  title="Remove file"
                >
                  ×
                </button>
              )}
            </div>
            <p className="mt-1 text-[10px] sm:text-xs text-gray-600 truncate w-24 sm:w-28 md:w-36">
              {file.name.length > 20
                ? file.name.substring(0, 18) + "..."
                : file.name}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-500">
              {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preview;
