import React, { useState } from "react";

const DownloadButton = ({ fileUrl, fileName }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadClick = () => {
    setIsDownloading(true);

    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
    }, 1500);
  };

  // Determine file type icon
  const getFileIcon = () => {
    if (fileName.endsWith(".pdf")) {
      return (
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          />
        </svg>
      );
    } else if (fileName.endsWith(".zip")) {
      return (
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 3h8v1H6V7zm0 2h8v1H6V9zm0 2h8v1H6v-1z"
            clipRule="evenodd"
          />
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
  };

  return (
    <div className="flex flex-col items-center">
      <a
        href={fileUrl}
        download={fileName}
        onClick={handleDownloadClick}
        className={`w-full sm:w-auto flex items-center justify-center px-3 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 transform ${
          isDownloading
            ? "bg-gray-500 text-white cursor-wait"
            : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:-translate-y-1"
        }`}
      >
        {isDownloading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="text-sm sm:text-base">Downloading...</span>
          </>
        ) : (
          <>
            {getFileIcon()}
            <span>Download {fileName}</span>
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </>
        )}
      </a>

      <div className="mt-4 flex items-center justify-center sm:justify-start">
        <button
          onClick={() => window.location.reload()}
          className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors"
        >
          <svg
            className="w-4 h-4 mr-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            ></path>
          </svg>
          Convert another file
        </button>
      </div>
    </div>
  );
};

export default DownloadButton;
