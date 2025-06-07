import React from "react";

const FormatSelector = ({ format, setFormat }) => {
  const formats = [
    {
      id: "jpg",
      name: "JPG",
      description: "Smaller file size, good for photos",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.5 12c0 3.59-2.91 6.5-6.5 6.5S6.5 15.59 6.5 12 9.41 5.5 13 5.5s6.5 2.91 6.5 6.5zm-7-5.5c-3.03 0-5.5 2.47-5.5 5.5s2.47 5.5 5.5 5.5 5.5-2.47 5.5-5.5-2.47-5.5-5.5-5.5zm3 5.5c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z" />
        </svg>
      ),
      benefits: [
        "Smaller file size",
        "Good for photos",
        "Universal compatibility",
      ],
    },
    {
      id: "png",
      name: "PNG",
      description: "Better quality, supports transparency",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 5v6.59l-3-3.01-4 4.01-4-4-4 4-3-3.01V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-3 6.42l3 3.01V19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-6.58l3 2.99 4-4 4 4 4-3.99z" />
        </svg>
      ),
      benefits: [
        "Lossless quality",
        "Supports transparency",
        "Better for text & graphics",
      ],
    },
  ];

  return (
    <div className="mb-6 sm:mb-8">
      <label className="block mb-2 sm:mb-3 text-base sm:text-lg font-semibold text-gray-800">
        Output Format
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
        {formats.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setFormat(option.id)}
            className={`p-3 sm:p-5 rounded-xl border-2 transition-all duration-200 ${
              format === option.id
                ? "bg-blue-50 border-blue-500 shadow-md transform hover:scale-102"
                : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
            }`}
          >
            <div className="flex items-start">
              <div
                className={`mr-3 sm:mr-4 p-1 sm:p-2 rounded-lg ${
                  format === option.id
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6">{option.icon}</div>
              </div>
              <div className="text-left">
                <div
                  className={`text-base sm:text-lg font-bold ${
                    format === option.id ? "text-blue-700" : "text-gray-700"
                  }`}
                >
                  {option.name}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                  {option.description}
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {option.benefits.map((benefit, index) => (
                    <span
                      key={index}
                      className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${
                        format === option.id
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormatSelector;
