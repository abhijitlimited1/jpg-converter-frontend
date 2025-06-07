import React from "react";

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-blue-700">
        Terms of Service
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-5 sm:p-8 mb-8 border border-gray-100">
        <p className="text-sm sm:text-base mb-6">
          <strong>Last Updated:</strong> June 1, 2024
        </p>

        <div className="bg-blue-50 p-4 sm:p-6 rounded-lg mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-blue-700">
            Summary of Terms
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
            <li>
              <strong>Free Service:</strong> Our JPG to PDF and PDF to JPG
              converters are free to use
            </li>
            <li>
              <strong>Your Files:</strong> You retain all rights to your files
            </li>
            <li>
              <strong>No Guarantees:</strong> The service is provided "as is"
              without warranties
            </li>
            <li>
              <strong>Legal Use Only:</strong> You agree not to use our
              converters for illegal purposes
            </li>
          </ul>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-3 text-gray-800 flex items-center">
              <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
                1
              </span>
              Acceptance of Terms
            </h2>
            <p className="text-sm sm:text-base text-gray-700 ml-10">
              By accessing or using our JPG to PDF and PDF to JPG conversion
              services, you agree to be bound by these Terms of Service. If you
              do not agree with any part of these terms, please do not use our
              services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3 text-gray-800 flex items-center">
              <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
                2
              </span>
              Service Description
            </h2>
            <p className="text-sm sm:text-base text-gray-700 ml-10">
              We provide free online file conversion services for converting
              between JPG and PDF formats. Our tools allow you to convert JPG to
              PDF and PDF to JPG quickly and easily. The service is provided "as
              is" without any warranties.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3 text-gray-800 flex items-center">
              <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
                3
              </span>
              User Responsibilities
            </h2>
            <p className="text-sm sm:text-base text-gray-700 ml-10">
              You agree not to use our JPG to PDF or PDF to JPG conversion
              services for any illegal purposes. You are solely responsible for
              the files you upload and convert. We do not monitor the content of
              files processed through our service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3 text-gray-800 flex items-center">
              <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
                4
              </span>
              Intellectual Property
            </h2>
            <p className="text-sm sm:text-base text-gray-700 ml-10">
              You retain all rights to the JPG and PDF files you upload. We
              claim no ownership over your content. Our conversion process does
              not alter your ownership rights in any way.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3 text-gray-800 flex items-center">
              <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
                5
              </span>
              Limitation of Liability
            </h2>
            <p className="text-sm sm:text-base text-gray-700 ml-10">
              We shall not be liable for any damages resulting from the use of
              our JPG to PDF or PDF to JPG conversion services. We do not
              guarantee the quality or accuracy of conversions. Use of the
              service is at your own risk.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3 text-gray-800 flex items-center">
              <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
                6
              </span>
              Service Modifications
            </h2>
            <p className="text-sm sm:text-base text-gray-700 ml-10">
              We reserve the right to modify or discontinue our JPG to PDF and
              PDF to JPG conversion services at any time without notice. We are
              not liable to you or any third party for any modification,
              suspension, or discontinuation of the service.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            If you have any questions about these Terms of Service or our JPG to
            PDF and PDF to JPG conversion tools, please contact us at
            terms@yourdomain.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
