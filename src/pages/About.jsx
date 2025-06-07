import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">About Us</h1>

      <div className="prose prose-sm sm:prose max-w-none">
        <p className="text-sm sm:text-base">
          We're a team of developers passionate about creating simple, useful
          tools that solve everyday problems. Our JPG-PDF converter was created
          to provide a hassle-free solution for converting between these popular
          file formats.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">
          Our Mission
        </h2>
        <p className="text-sm sm:text-base">
          To provide free, high-quality file conversion tools that respect user
          privacy and work seamlessly across all devices.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">
          How We Work
        </h2>
        <p className="text-sm sm:text-base">
          Unlike many other conversion tools, we don't store your files. All
          processing happens in memory and files are immediately discarded after
          conversion. This ensures your privacy and security.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">
          Support Us
        </h2>
        <p className="text-sm sm:text-base">
          This service is supported by ads. Please consider disabling your ad
          blocker to help us cover server costs and continue providing this free
          service.
        </p>
      </div>
    </div>
  );
};

export default About;
