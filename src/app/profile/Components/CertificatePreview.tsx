'use client';

import React from 'react';

interface CertificatePreviewProps {
  title: string;
  date: string;
  name: string;
}

export default function CertificatePreview({
  title,
  date,
  name, 
}: CertificatePreviewProps) {
  return (
    <div className="w-64 h-80 bg-white rounded-lg shadow-md flex flex-col p-4">
      {/* Image + name overlay */}
      <div className="relative flex-shrink-0 mb-4 overflow-hidden">
        <img
          src="/certificate.png"
          alt="Certificate"
          className="w-full h-auto object-contain rounded"
        />
        <span className="
      absolute top-2 left-1/2 -translate-x-1/2 text-black text-xs font-medium text-center px-2 py-1 rounded whitespace-nowrap translate-y-[37px]">
          {title}
        </span>
        <span className="
      absolute top-2 left-1/2 -translate-x-1/2 text-black text-xs font-medium text-center px-2 py-1 rounded whitespace-nowrap translate-y-[63px]">
          {name}
        </span>
      </div>
      {/* Title (stays below image) */}
      <h3 className="text-2xl font-bold text-center whitespace-normal break-words">
        {title}
      </h3>

      {/* Date */}
      <p className="text-sm text-gray-600 mt-1 whitespace-normal break-words text-center">
        Received:{' '}
        <span className="text-red-500 font-medium">{date}</span>
      </p>

      <div className="mt-1" />

      {/* Download button */}
      <button
        className="
          self-center mt-2
          bg-black text-white py-2 px-6 rounded-lg
          hover:bg-gray-800 transition-colors duration-200 ease-in-out
        "
        onClick={() => {}}
      >
        Download
      </button>
    </div>
  );
}