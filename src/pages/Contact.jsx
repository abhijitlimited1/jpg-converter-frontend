import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);

    try {
      const response = await fetch("https://formspree.io/f/xpwrqbgn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: "",
          email: "",
          subject: "General Inquiry",
          message: "",
        });
      } else {
        setSubmitError(true);
      }
    } catch (error) {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-blue-700">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5 sm:p-8 border border-gray-100">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Get in Touch</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            Having trouble with our JPG to PDF or PDF to JPG converters? Need a
            new file conversion tool? We're here to help! Fill out the form
            below and we'll get back to you as soon as possible.
          </p>

          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-50 p-3 rounded-full">
              <svg
                className="h-10 w-10 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-base font-semibold mb-2 text-blue-700">
              What We Can Help With
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base text-gray-600">
              <li>Troubleshooting conversion issues</li>
              <li>Feature requests for new conversion tools</li>
              <li>Reporting bugs or technical problems</li>
              <li>Partnership opportunities</li>
              <li>General questions about our services</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 sm:p-8 border border-gray-100">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Send Us a Message
          </h2>

          {submitSuccess ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">
                    Thank you for your message! We'll get back to you soon.
                  </p>
                </div>
              </div>
            </div>
          ) : submitError ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">
                    Something went wrong. Please try again later.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Conversion Issue">Conversion Issue</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Partnership">Partnership</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Please describe your issue or question in detail..."
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5 sm:p-8 border border-gray-100">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-semibold text-gray-800">
              How quickly will you respond to my inquiry?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              We typically respond to all inquiries within 24-48 hours during
              business days.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-800">
              I'm having trouble converting my files. What should I do?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Please provide details about the specific error you're
              encountering, the file type, size, and your browser information.
              This will help us troubleshoot the issue more effectively.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-800">
              Can you add support for other file formats?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              We're constantly working to expand our conversion capabilities.
              Let us know what formats you'd like to see, and we'll consider
              adding them in future updates.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-800">
              Is there a limit to how many files I can convert?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Our free service allows for unlimited conversions, but there is a
              file size limit of 100MB per conversion. If you need to convert
              larger files, please contact us for potential solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
