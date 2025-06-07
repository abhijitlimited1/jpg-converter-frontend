import React, { useState, useEffect } from "react";
import FileUpload from "../components/FileUpload";
import Preview from "../components/Preview";
import FormatSelector from "../components/FormatSelector";
import DownloadButton from "../components/DownloadButton";

const PdfToJpg = () => {
  const [file, setFile] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [format, setFormat] = useState("jpg");
  const [error, setError] = useState("");
  const [conversionProgress, setConversionProgress] = useState(0);
  const [useClientSideFallback, setUseClientSideFallback] = useState(false);
  const [serverUnavailable, setServerUnavailable] = useState(false);

  const [pdfPageCount, setPdfPageCount] = useState(0);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type !== "application/pdf") {
      setError("Please select a valid PDF file.");
      setFile(null);
      setPdfPageCount(0);
    } else if (selectedFile) {
      setFile(selectedFile);
      setError("");

      // Try to get page count
      try {
        // Import the PDF.js library - use a different version that's more stable
        const pdfjs = await import(
          "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/build/pdf.min.js"
        );

        // Get the PDF.js library
        const pdfjsLib = pdfjs;

        // Set worker source before using any PDF.js functionality
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";

        const fileReader = new FileReader();
        const pdfData = await new Promise((resolve, reject) => {
          fileReader.onload = () => resolve(new Uint8Array(fileReader.result));
          fileReader.onerror = reject;
          fileReader.readAsArrayBuffer(selectedFile);
        });

        const loadingTask = pdfjsLib.getDocument({ data: pdfData });
        const pdf = await loadingTask.promise;

        setPdfPageCount(pdf.numPages);
      } catch (error) {
        console.error("Error checking PDF pages:", error);
        setPdfPageCount(0);
      }
    }
    setConvertedFile(null);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setConvertedFile(null);
    setError("");
  };

  // Check server availability on component mount
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        // Use a simple GET request with a timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const response = await fetch(
          "https://jpg-converter-backend.onrender.com/api/health/",
          {
            method: "GET",
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);
        setServerUnavailable(!response.ok);

        if (response.ok) {
          console.log("Server is available");
        } else {
          console.warn(`Server returned status: ${response.status}`);
          setServerUnavailable(true);
        }
      } catch (error) {
        console.warn("Server check failed:", error.message);
        setServerUnavailable(true);

        // If server is unavailable, automatically enable client-side fallback
        setUseClientSideFallback(true);
      }
    };

    checkServerStatus();
  }, []);

  const convertToImages = async () => {
    if (!file) return;

    setIsConverting(true);
    setError("");
    setConversionProgress(10);

    // If user has chosen client-side fallback or server is unavailable, use client-side conversion
    if (useClientSideFallback || serverUnavailable) {
      try {
        setConversionProgress(20);

        // Load PDF.js dynamically
        const pdfjs = await import(
          "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/+esm"
        );

        // Get the PDF.js library from the default export
        const pdfjsLib = pdfjs.default;
        setConversionProgress(30);

        // Set the worker source
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";

        // Load the PDF file
        const fileReader = new FileReader();
        const pdfData = await new Promise((resolve, reject) => {
          fileReader.onload = () => resolve(new Uint8Array(fileReader.result));
          fileReader.onerror = reject;
          fileReader.readAsArrayBuffer(file);
        });

        setConversionProgress(40);

        // Load the PDF document
        const loadingTask = pdfjsLib.getDocument({ data: pdfData });
        const pdf = await loadingTask.promise;

        setConversionProgress(50);

        // Get total number of pages
        const numPages = pdf.numPages;
        setConversionProgress(55);

        let blob;

        if (numPages === 1) {
          // Single page PDF - just convert the first page
          const page = await pdf.getPage(1);

          // Set the scale for rendering
          const viewport = page.getViewport({ scale: 1.5 });

          // Create a canvas for rendering
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const context = canvas.getContext("2d");

          setConversionProgress(70);

          // Render the PDF page to the canvas
          await page.render({
            canvasContext: context,
            viewport: viewport,
          }).promise;

          setConversionProgress(90);

          // Convert canvas to blob with proper format
          blob = await new Promise((resolve) => {
            // For PNG, use higher quality settings
            if (format === "png") {
              canvas.toBlob(resolve, "image/png", 1.0); // PNG with highest quality
            } else {
              canvas.toBlob(resolve, "image/jpeg", 0.95); // JPEG with high quality
            }
          });
        } else {
          // Multi-page PDF - create a ZIP file with all pages
          setConversionProgress(60);

          try {
            // Dynamically import JSZip
            const JSZipModule = await import(
              "https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm"
            );
            const JSZip = JSZipModule.default;
            const zip = new JSZip();

            // Process each page (up to 10 pages for browser performance)
            const pagesToProcess = Math.min(numPages, 10);

            for (let i = 1; i <= pagesToProcess; i++) {
              // Update progress
              setConversionProgress(60 + Math.floor((i / pagesToProcess) * 30));

              // Get the page
              const page = await pdf.getPage(i);

              // Set the scale for rendering
              const viewport = page.getViewport({ scale: 1.5 });

              // Create a canvas for rendering
              const canvas = document.createElement("canvas");
              canvas.width = viewport.width;
              canvas.height = viewport.height;
              const context = canvas.getContext("2d");

              // Render the PDF page to the canvas
              await page.render({
                canvasContext: context,
                viewport: viewport,
              }).promise;

              // Convert canvas to blob with proper format
              const pageBlob = await new Promise((resolve) => {
                // For PNG, use higher quality settings
                if (format === "png") {
                  canvas.toBlob(resolve, "image/png", 1.0); // PNG with highest quality
                } else {
                  canvas.toBlob(resolve, "image/jpeg", 0.95); // JPEG with high quality
                }
              });

              // Add the blob to the ZIP file
              zip.file(`page_${i}.${format}`, pageBlob);
            }

            setConversionProgress(90);

            // Generate the ZIP file
            blob = await zip.generateAsync({ type: "blob" });
          } catch (error) {
            console.error("Error creating ZIP file:", error);

            // Fallback to just the first page if ZIP creation fails
            const page = await pdf.getPage(1);
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement("canvas");
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const context = canvas.getContext("2d");

            await page.render({
              canvasContext: context,
              viewport: viewport,
            }).promise;

            blob = await new Promise((resolve) => {
              // For PNG, use higher quality settings
              if (format === "png") {
                canvas.toBlob(resolve, "image/png", 1.0); // PNG with highest quality
              } else {
                canvas.toBlob(resolve, "image/jpeg", 0.95); // JPEG with high quality
              }
            });
          }
        }

        // Create URL for the blob
        setConvertedFile(URL.createObjectURL(blob));
        setConversionProgress(100);
      } catch (error) {
        console.error("Client-side conversion error:", error);
        setError(
          "Client-side conversion failed. Please try a different PDF file or use server-side conversion."
        );
      } finally {
        setIsConverting(false);
      }
      return;
    }

    // Server-side conversion
    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("format", format);

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setConversionProgress((prev) => {
          const newProgress = prev + 5;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 300);

      const response = await fetch(
        "https://jpg-converter-backend.onrender.com/api/pdf-to-jpg/",
        {
          method: "POST",
          body: formData,
        }
      );

      clearInterval(progressInterval);
      setConversionProgress(100);

      if (!response.ok) {
        // Try to get error message from backend
        let errorMessage;
        try {
          const errorText = await response.text();
          errorMessage = errorText || "Conversion failed";
        } catch {
          errorMessage = `Server error: ${response.status}`;
        }

        // Check for specific error messages and provide helpful guidance
        if (
          errorMessage.includes("Poppler") ||
          errorMessage.includes("POPPLER_PATH")
        ) {
          setServerUnavailable(true);
          throw new Error(
            "PDF conversion requires additional software on the server. Try the client-side conversion option."
          );
        } else if (response.status === 500) {
          throw new Error(
            "Server error: The PDF could not be processed. It might be corrupted, password-protected, or too large."
          );
        } else {
          throw new Error(errorMessage);
        }
      }

      const blob = await response.blob();
      setConvertedFile(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Conversion error:", error);
      setError(error.message);
    } finally {
      setIsConverting(false);
      // Reset progress after a delay
      setTimeout(() => setConversionProgress(0), 1000);
    }
  };

  // Determine if the converted file is a ZIP (multiple pages)
  const [isZipFile, setIsZipFile] = useState(false);
  const downloadFileName = isZipFile ? "converted.zip" : `converted.${format}`;
  const fileTypeLabel = isZipFile ? "ZIP archive" : format.toUpperCase();

  // Check if the converted file is a ZIP when it changes
  useEffect(() => {
    if (convertedFile) {
      // For server-side conversion
      if (convertedFile.includes("zip")) {
        setIsZipFile(true);
      }
      // For client-side conversion, check if we have multiple pages
      else if (file && useClientSideFallback) {
        const checkIfMultiPage = async () => {
          try {
            // Import the PDF.js library
            const pdfjs = await import(
              "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/+esm"
            );

            // Get the PDF.js library from the default export
            const pdfjsLib = pdfjs.default;

            // Set worker source before using any PDF.js functionality
            pdfjsLib.GlobalWorkerOptions.workerSrc =
              "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";

            const fileReader = new FileReader();
            const pdfData = await new Promise((resolve, reject) => {
              fileReader.onload = () =>
                resolve(new Uint8Array(fileReader.result));
              fileReader.onerror = reject;
              fileReader.readAsArrayBuffer(file);
            });

            const loadingTask = pdfjsLib.getDocument({ data: pdfData });
            const pdf = await loadingTask.promise;

            setIsZipFile(pdf.numPages > 1);
          } catch (error) {
            console.error("Error checking PDF pages:", error);
            setIsZipFile(false);
          }
        };

        checkIfMultiPage();
      } else {
        setIsZipFile(false);
      }
    }
  }, [convertedFile, file, useClientSideFallback]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="mb-6 sm:mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
          Convert PDF to JPG/PNG
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
          Transform your PDF documents into high-quality images with just a few
          clicks. Free, secure, and no registration required.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mb-8 border border-gray-100 transition-all hover:shadow-xl">
        <FileUpload
          onFileChange={handleFileChange}
          accept="application/pdf"
          multiple={false}
        />

        {error && (
          <div className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-start">
              <div className="flex-shrink-0 mb-2 sm:mb-0 flex justify-center">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-0 sm:ml-3 text-center sm:text-left">
                <h3 className="text-sm font-medium text-red-800">
                  Conversion Error
                </h3>
                <div className="mt-2 text-xs sm:text-sm text-red-700">
                  <p>{error}</p>

                  {error.includes("Poppler") && (
                    <div className="mt-2 text-xs text-gray-600">
                      <p className="font-semibold">Troubleshooting:</p>
                      <p>
                        This error occurs when the server is missing required
                        software for PDF conversion.
                      </p>
                      <button
                        onClick={() => {
                          setUseClientSideFallback(true);
                          setError("");
                        }}
                        className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-xs font-medium"
                      >
                        Try Client-Side Conversion Instead
                      </button>
                    </div>
                  )}

                  {error.includes("Server error") && (
                    <div className="mt-2 text-xs text-gray-600">
                      <p className="font-semibold">Try these solutions:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Make sure your PDF is not password-protected</li>
                        <li>Try a different PDF file</li>
                        <li>If the PDF is large, try a smaller file</li>
                        <li>
                          <button
                            onClick={() => {
                              setUseClientSideFallback(true);
                              setError("");
                            }}
                            className="mt-1 text-blue-600 hover:text-blue-800 transition-colors font-medium"
                          >
                            Switch to client-side conversion
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}

                  {!error.includes("Poppler") &&
                    !error.includes("Server error") && (
                      <div className="mt-2 text-xs text-gray-600">
                        <p className="font-semibold">Try these solutions:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Try a different PDF file</li>
                          <li>Check your internet connection</li>
                          <li>
                            <button
                              onClick={() => {
                                setUseClientSideFallback(true);
                                setError("");
                              }}
                              className="mt-1 text-blue-600 hover:text-blue-800 transition-colors font-medium"
                            >
                              Try client-side conversion
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        )}

        <FormatSelector format={format} setFormat={setFormat} />

        {/* Server status warning */}
        {serverUnavailable && !error && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-100 text-yellow-800 rounded-lg">
            <div className="flex flex-col sm:flex-row items-center sm:items-start">
              <div className="flex-shrink-0 mb-2 sm:mb-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-0 sm:ml-3 text-center sm:text-left">
                <h3 className="text-sm font-medium">
                  Server-side conversion may be unavailable
                </h3>
                <div className="mt-1 text-xs sm:text-sm">
                  <p>
                    Using client-side conversion as a fallback. Quality may be
                    reduced.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Conversion mode toggle */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
          <span className="text-sm font-medium text-gray-700 mb-2 sm:mb-0">
            Conversion Mode:
          </span>
          <div className="flex items-center space-x-2">
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                type="checkbox"
                name="toggle"
                id="conversion-toggle"
                checked={useClientSideFallback}
                onChange={() =>
                  setUseClientSideFallback(!useClientSideFallback)
                }
                className="sr-only"
              />
              <label
                htmlFor="conversion-toggle"
                className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                  useClientSideFallback ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                    useClientSideFallback ? "translate-x-4" : "translate-x-0"
                  }`}
                ></span>
              </label>
            </div>
            <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
              {useClientSideFallback
                ? "Client-side (Browser)"
                : "Server-side (Better quality)"}
            </span>
          </div>
        </div>

        {file && (
          <div>
            <Preview
              files={[file]}
              conversionType="pdfToJpg"
              onRemove={handleRemoveFile}
            />
            {pdfPageCount > 0 && (
              <div className="mt-2 text-sm text-gray-600 text-center">
                <span className="inline-flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {pdfPageCount} {pdfPageCount === 1 ? "page" : "pages"}{" "}
                  detected
                </span>
                {pdfPageCount > 1 && (
                  <p className="text-xs mt-1">
                    Multi-page PDF will be converted to a ZIP file containing
                    all pages
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {isConverting && (
          <div className="mb-6 sm:mb-8 mt-4">
            <div className="flex flex-col sm:flex-row justify-between mb-2 gap-2">
              <div className="flex items-center justify-center sm:justify-start">
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-blue-600"
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
                <span className="text-xs sm:text-sm font-medium text-blue-700">
                  {conversionProgress < 30
                    ? "Preparing PDF..."
                    : conversionProgress < 60
                    ? "Converting pages..."
                    : conversionProgress < 90
                    ? "Processing images..."
                    : "Finalizing..."}
                </span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md self-center">
                {conversionProgress}%
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 sm:h-3 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 sm:h-3 rounded-full transition-all duration-300"
                style={{ width: `${conversionProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span className="text-[10px] sm:text-xs">Preparing</span>
              <span className="text-[10px] sm:text-xs">Converting</span>
              <span className="text-[10px] sm:text-xs">Finalizing</span>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center mt-6 sm:mt-8">
          <button
            onClick={convertToImages}
            disabled={!file || isConverting}
            className={`w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-4 rounded-xl text-white font-bold text-base sm:text-lg transition-all duration-300 transform ${
              !file || isConverting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:-translate-y-1"
            }`}
          >
            {isConverting ? (
              <span className="flex items-center justify-center">
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
                <span className="text-sm sm:text-base">Converting...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <span className="text-sm sm:text-base">
                  {pdfPageCount > 1
                    ? `Convert to ${format.toUpperCase()} (${pdfPageCount} pages)`
                    : `Convert to ${format.toUpperCase()}`}
                </span>
              </span>
            )}
          </button>

          {file && !isConverting && !convertedFile && (
            <p className="text-xs sm:text-sm text-gray-500 mt-3 text-center px-2">
              Your file will be processed{" "}
              {useClientSideFallback
                ? "in your browser"
                : "on our secure server"}{" "}
              and won't be stored
            </p>
          )}
        </div>

        {convertedFile && (
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-br from-green-50 to-blue-50 border border-green-100 rounded-xl shadow-sm">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="bg-green-100 rounded-full p-2 sm:p-3">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-1 sm:mb-2 text-green-800">
              Conversion Complete!
            </h3>
            <p className="text-center text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Your PDF has been successfully converted to {fileTypeLabel}
            </p>
            <p className="text-center mb-4 text-xs sm:text-sm text-gray-600 px-2">
              {isZipFile
                ? "Your PDF has been converted to multiple image files and packaged as a ZIP archive."
                : `Your PDF has been converted to ${format.toUpperCase()} format.`}
            </p>
            <DownloadButton
              fileUrl={convertedFile}
              fileName={downloadFileName}
            />
            <p className="text-center mt-3 text-[10px] sm:text-xs text-gray-500 px-2">
              Your file is ready to download. It was not stored on our servers
              and will be available only during this session.
            </p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-md p-5 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Convert PDF to Images Online
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-blue-50 rounded-lg p-5 mb-6">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">
                Why Use Our PDF to JPG Converter?
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
                    Choose between JPG or PNG formats
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
                    Maintain original image quality
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
                    Process multi-page PDF documents
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
                    No registration required
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
                    Files processed securely in memory
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
                    Fast conversion with progress tracking
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="border border-blue-100 rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">
                How to Convert PDF to Images
              </h3>
              <ol className="space-y-3">
                <li className="flex">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <span className="text-gray-700">
                    Upload your PDF file using the file selector or
                    drag-and-drop
                  </span>
                </li>
                <li className="flex">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <span className="text-gray-700">
                    Choose your preferred output format (JPG or PNG)
                  </span>
                </li>
                <li className="flex">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <span className="text-gray-700">
                    Click the "Convert" button
                  </span>
                </li>
                <li className="flex">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <span className="text-gray-700">
                    Download your converted images (single image or ZIP archive
                    for multi-page PDFs)
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-800">
              About Our Formats
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="mb-3">
                <span className="font-bold text-gray-800">JPG</span> - Best for
                photographs and complex images, smaller file size but lossy
                compression.
              </div>
              <div>
                <span className="font-bold text-gray-800">PNG</span> - Best for
                graphics, screenshots, and images with transparency, lossless
                quality but larger file size.
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-800">
              Conversion Modes
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="mb-2 text-gray-700">
                Our tool offers two conversion methods:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 inline-flex items-center justify-center mr-2 flex-shrink-0 mt-0.5 text-xs">
                    S
                  </div>
                  <span className="text-gray-700">
                    <span className="font-semibold">
                      Server-side conversion
                    </span>{" "}
                    - Higher quality results with better PDF parsing
                    capabilities
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 inline-flex items-center justify-center mr-2 flex-shrink-0 mt-0.5 text-xs">
                    C
                  </div>
                  <span className="text-gray-700">
                    <span className="font-semibold">
                      Client-side conversion
                    </span>{" "}
                    - Processes PDFs directly in your browser when server
                    conversion is unavailable
                  </span>
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">
                Note: Client-side conversion works best with simple PDFs and may
                not support all PDF features.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Easily convert PDF documents to JPG or PNG images with our free
            online tool. Extract all pages from your PDF and download them as
            individual images or a ZIP file.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PdfToJpg;
