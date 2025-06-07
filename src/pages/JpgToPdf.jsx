import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import Preview from "../components/Preview";
import DownloadButton from "../components/DownloadButton";

const JpgToPdf = () => {
  const [files, setFiles] = useState([]);
  const [convertedFile, setConvertedFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState("");
  const [conversionProgress, setConversionProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    // Filter out non-JPG files
    const jpgFiles = selectedFiles.filter(
      (file) => file.type === "image/jpeg" || file.type === "image/jpg"
    );

    if (jpgFiles.length < selectedFiles.length) {
      setError("Some files were skipped because they are not JPG/JPEG images.");
    } else {
      setError("");
    }

    setFiles(jpgFiles);
    setConvertedFile(null);
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    if (newFiles.length === 0) {
      setError("");
    }
  };

  const convertToPdf = async () => {
    if (files.length === 0) return;

    setIsConverting(true);
    setConversionProgress(10);
    setError("");

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setConversionProgress((prev) => {
          const newProgress = prev + 10;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 500);

      const response = await fetch("http://127.0.0.1:8000/api/jpg-to-pdf/", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setConversionProgress(100);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Conversion failed");
      }

      const blob = await response.blob();
      setConvertedFile(URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
      setError(error.message || "Conversion failed. Please try again.");
    } finally {
      setIsConverting(false);
      // Reset progress after a delay
      setTimeout(() => setConversionProgress(0), 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Convert JPG to PDF
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <FileUpload
          onFileChange={handleFileChange}
          accept="image/jpeg,image/jpg"
          multiple={true}
        />

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}

        <Preview
          files={files}
          conversionType="jpgToPdf"
          onRemove={handleRemoveFile}
        />

        {isConverting && (
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-blue-700">
                Converting...
              </span>
              <span className="text-sm font-medium text-blue-700">
                {conversionProgress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${conversionProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button
            onClick={convertToPdf}
            disabled={files.length === 0 || isConverting}
            className={`px-6 py-3 rounded-lg text-white font-medium transition-colors ${
              files.length === 0 || isConverting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isConverting ? "Converting..." : "Convert to PDF"}
          </button>
        </div>

        {convertedFile && (
          <div className="mt-8 p-4 bg-green-50 border border-green-100 rounded-lg">
            <h3 className="text-xl font-medium text-center mb-4 text-green-800">
              Conversion Complete!
            </h3>
            <DownloadButton fileUrl={convertedFile} fileName="converted.pdf" />
            <p className="text-center mt-3 text-sm text-gray-600">
              Your file is ready to download. It was not stored on our servers
              and will be available only during this session.
            </p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-md p-5 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Convert JPG to PDF Online
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-blue-50 rounded-lg p-5 mb-6">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">
                Why Use Our JPG to PDF Converter?
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-blue-600 mr-2 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    100% free with no watermarks
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-blue-600 mr-2 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    No file size restrictions
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-blue-600 mr-2 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Preserves original image quality
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-blue-600 mr-2 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Secure processing - files never stored
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-blue-600 mr-2 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Works on any device - desktop or mobile
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="border border-blue-100 rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">
                How to Convert JPG to PDF
              </h3>
              <ol className="space-y-3">
                <li className="flex">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <span className="text-gray-700">
                    Upload one or more JPG images using the file selector or
                    drag-and-drop
                  </span>
                </li>
                <li className="flex">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <span className="text-gray-700">
                    Arrange your images in the desired order (first to last)
                  </span>
                </li>
                <li className="flex">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <span className="text-gray-700">
                    Click the "Convert to PDF" button
                  </span>
                </li>
                <li className="flex">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <span className="text-gray-700">
                    Download your converted PDF file when ready
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Our free online tool allows you to convert multiple JPG images to
            PDF documents quickly and easily. Simply upload your JPG files,
            preview them, and click convert to get your PDF file ready for
            download.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JpgToPdf;
