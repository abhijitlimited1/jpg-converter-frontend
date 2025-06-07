import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import JpgToPdf from "./pages/JpgToPdf";
import PdfToJpg from "./pages/PdfToJpg";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  // Use useLocation hook to get current path
  const location = useLocation();
  const currentPath = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 md:py-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
            >
              FileConverter
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`font-medium text-sm lg:text-base transition-colors duration-200 ${
                  currentPath === "/" || currentPath === ""
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Home
              </Link>
              <Link
                to="/jpg-to-pdf"
                className={`font-medium text-sm lg:text-base transition-colors duration-200 ${
                  currentPath === "/jpg-to-pdf"
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                JPG to PDF
              </Link>
              <Link
                to="/pdf-to-jpg"
                className={`font-medium text-sm lg:text-base transition-colors duration-200 ${
                  currentPath === "/pdf-to-jpg"
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                PDF to JPG
              </Link>
              <Link
                to="/about"
                className={`font-medium text-sm lg:text-base transition-colors duration-200 ${
                  currentPath === "/about"
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`font-medium text-sm lg:text-base transition-colors duration-200 ${
                  currentPath === "/contact"
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pt-4 pb-2 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className={`font-medium px-2 py-2 rounded-md ${
                    currentPath === "/" || currentPath === ""
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/jpg-to-pdf"
                  className={`font-medium px-2 py-2 rounded-md ${
                    currentPath === "/jpg-to-pdf"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  JPG to PDF
                </Link>
                <Link
                  to="/pdf-to-jpg"
                  className={`font-medium px-2 py-2 rounded-md ${
                    currentPath === "/pdf-to-jpg"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  PDF to JPG
                </Link>
                <Link
                  to="/about"
                  className={`font-medium px-2 py-2 rounded-md ${
                    currentPath === "/about"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className={`font-medium px-2 py-2 rounded-md ${
                    currentPath === "/contact"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-4 sm:px-6 py-6 sm:py-8 md:py-10">
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jpg-to-pdf" element={<JpgToPdf />} />
            <Route path="/pdf-to-jpg" element={<PdfToJpg />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 sm:py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center sm:text-left mb-6 sm:mb-0">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                FileConverter
              </h3>
              <p className="text-sm sm:text-base text-gray-300">
                Free online tools for converting between file formats.
              </p>
            </div>
            <div className="text-center sm:text-left mb-6 sm:mb-0">
              <h4 className="text-base sm:text-lg font-medium mb-2 sm:mb-4">
                Tools
              </h4>
              <ul className="space-y-1 sm:space-y-2">
                <li>
                  <Link
                    to="/jpg-to-pdf"
                    className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    JPG to PDF
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pdf-to-jpg"
                    className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    PDF to JPG
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-base sm:text-lg font-medium mb-2 sm:mb-4">
                Legal
              </h4>
              <ul className="space-y-1 sm:space-y-2">
                <li>
                  <Link
                    to="/privacy"
                    className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-4 sm:pt-6 text-center text-xs sm:text-sm text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} FileConverter. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
