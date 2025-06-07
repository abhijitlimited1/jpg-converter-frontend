import React from "react";

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-blue-700">
        Privacy Policy
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-5 sm:p-8 mb-8 border border-gray-100">
        <p className="text-sm sm:text-base mb-6">
          <strong>Last Updated:</strong> June 1, 2024
        </p>

        <div className="space-y-6 sm:space-y-8">
          <div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 text-blue-700">
              Your Privacy at a Glance
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
              <li>
                <strong>No File Storage:</strong> Your JPG and PDF files are
                never stored on our servers
              </li>
              <li>
                <strong>No Personal Data Collection:</strong> We don't collect
                or share your personal information
              </li>
              <li>
                <strong>Secure Processing:</strong> All file conversions happen
                in your browser
              </li>
              <li>
                <strong>No Registration Required:</strong> Use our JPG to PDF
                and PDF to JPG converters without creating an account
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3 text-gray-800 flex items-center">
              <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
                1
              </span>
              Information We Collect
            </h2>
            <p className="text-sm sm:text-base text-gray-700 ml-10">
              We do not collect any personal information when you use our JPG to
              PDF or PDF to JPG conversion tools. Files you upload for
              conversion are processed temporarily in memory and are not stored
              on our servers. We do not retain any copies of your files after
              conversion.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3 text-gray-800 flex items-center">
              <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
                2
              </span>
              File Processing
            </h2>
            <p className="text-sm sm:text-base text-gray-700 ml-10">
              Your files are processed entirely in your browser or in server
              memory and are never written to disk. Once the conversion between
              JPG and PDF is complete and the file is sent to your browser, all
              data is immediately purged from our system.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3 text-gray-800 flex items-center">
              <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
                3
              </span>
              Cookies
            </h2>
            <p className="text-sm sm:text-base text-gray-700 ml-10">
              We use only essential cookies for site functionality. We do not
              use tracking cookies or any form of user profiling when you use
              our JPG to PDF or PDF to JPG conversion services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3 text-gray-800 flex items-center">
              <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
                4
              </span>
              Third-Party Services
            </h2>
            <p className="text-sm sm:text-base text-gray-700 ml-10">
              We use Google AdSense to display ads. Google may use cookies to
              serve personalized ads based on your browsing history. You can opt
              out of personalized advertising by visiting Google's Ads Settings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3 text-gray-800 flex items-center">
              <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
                5
              </span>
              Changes to This Policy
            </h2>
            <p className="text-sm sm:text-base text-gray-700 ml-10">
              We may update this privacy policy from time to time. The updated
              version will be indicated by an updated "Last Updated" date at the
              top of this page.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            If you have any questions about our privacy practices or how we
            handle your JPG to PDF or PDF to JPG conversions, please contact us
            at privacy@yourdomain.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
