import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Hero Section */}
      <div className="text-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6">
          Free JPG to PDF & PDF to JPG Converter
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8">
          Easily convert JPG to PDF or convert PDF to JPG format instantly. No
          registration required, no watermarks, 100% free online converter!
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
          <Link
            to="/jpg-to-pdf"
            className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Convert JPG to PDF
          </Link>
          <Link
            to="/pdf-to-jpg"
            className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md shadow-sm text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            Convert PDF to JPG
          </Link>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 mt-4 max-w-2xl mx-auto">
          Turn JPG into PDF documents or convert PDF documents to JPG images
          with our easy-to-use tools. Perfect for converting PDF files to JPG
          format or combining multiple JPG images into a single PDF.
        </p>
      </div>

      {/* Conversion Tools */}
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
        Our File Conversion Tools
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
        <Link to="/jpg-to-pdf" className="block">
          <div className="bg-white rounded-xl shadow-lg p-5 sm:p-8 hover:shadow-xl transition-all hover:translate-y-[-5px] border border-gray-100">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-center">
              JPG to PDF Converter
            </h2>
            <p className="text-sm sm:text-base text-gray-600 text-center mb-3 sm:mb-4">
              Convert JPG to PDF easily. Turn multiple JPG images into a single
              PDF document. Perfect for combining photos into a professional PDF
              file.
            </p>
            <div className="text-center">
              <span className="inline-flex items-center text-blue-600 font-medium text-sm sm:text-base">
                Convert JPG to PDF Now
                <svg
                  className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </div>
          </div>
        </Link>
        <Link to="/pdf-to-jpg" className="block">
          <div className="bg-white rounded-xl shadow-lg p-5 sm:p-8 hover:shadow-xl transition-all hover:translate-y-[-5px] border border-gray-100">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-center">
              PDF to JPG Converter
            </h2>
            <p className="text-sm sm:text-base text-gray-600 text-center mb-3 sm:mb-4">
              Convert PDF to JPG with high quality. Extract pages from PDF
              documents as JPG images. Easily transform PDF files into JPG
              format for sharing and editing.
            </p>
            <div className="text-center">
              <span className="inline-flex items-center text-blue-600 font-medium text-sm sm:text-base">
                Convert PDF to JPG Now
                <svg
                  className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-xl shadow-md p-5 sm:p-8 mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl font-bold text-blue-600">
                1
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
              Upload Your Files
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Select your files or drag and drop them into the upload area
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl font-bold text-blue-600">
                2
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
              Convert
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Click the convert button and wait for the process to complete
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl font-bold text-blue-600">
                3
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
              Download
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Download your converted files instantly
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
          Why Choose Our Converter?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-blue-600 mb-3 sm:mb-4">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
              100% Free
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              No hidden fees, no watermarks, no limits on file conversions
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-blue-600 mb-3 sm:mb-4">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
              Privacy First
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Your files are processed locally and never stored on our servers
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-blue-600 mb-3 sm:mb-4">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
              Fast Conversion
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Our optimized algorithms ensure quick processing of your files
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-blue-600 mb-3 sm:mb-4">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
              High Quality
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Maintain the original quality of your images and documents
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-blue-600 mb-3 sm:mb-4">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
              Easy to Use
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Simple interface with drag-and-drop functionality for all users
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-blue-600 mb-3 sm:mb-4">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
              No Registration
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              No need to create an account or provide personal information
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl shadow-md p-5 sm:p-8 mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
              Is this service really free?
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Yes, our file conversion service is completely free to use with no
              hidden charges or limitations.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
              Are my files secure?
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Absolutely. Your files are processed in your browser and are never
              stored on our servers. They are automatically deleted after
              conversion.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
              What's the maximum file size I can convert?
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Our service can handle files up to 100MB, which is sufficient for
              most conversion needs.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
              Can I convert multiple files at once?
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Yes, you can convert multiple JPG files to a single PDF. For PDF
              to JPG conversion, you can convert multi-page PDFs and receive all
              pages as separate images.
            </p>
          </div>
        </div>
      </div>

      {/* SEO Content - Hidden from normal view but visible to search engines */}
      <div className="prose max-w-none text-xs text-gray-400 mt-16">
        <h3>Popular Conversion Keywords</h3>
        <p>
          Our tool helps with: jpg to pdf, pdf to jpg, jpg and pdf, jpg in to
          pdf, format pdf to jpg, pdf and jpg, pdf document to jpg, pdf in to
          jpg, convert a pdf to a jpg, convert pdf file to jpg, converting a pdf
          to a jpg, convert pdf document to jpg, convert pdf to jpg format,
          convert pdf to a jpg, convert pdf in to jpg.
        </p>
      </div>
    </div>
  );
};

export default Home;
