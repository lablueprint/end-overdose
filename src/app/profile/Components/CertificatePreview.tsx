'use client';

import { useRef } from 'react';
import { toPng } from 'html-to-image';

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
  // rename ref to make clear it's only for the overlay
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (overlayRef.current) {
      try {
        const dataUrl = await toPng(overlayRef.current, {
          cacheBust: true,
          pixelRatio: 2,
        });
        const link = document.createElement('a');
        link.download = `certificate_${name}_${title}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Failed to generate image', err);
      }
    }
  };

  return (
    <div className="w-64 h-64 bg-white rounded-lg shadow-md flex flex-col p-3">
      {/* Certificate image wrapper - reduced height */}
      <div ref={overlayRef} className="relative flex-shrink-0 h-32 mb-2 overflow-hidden">
        <img src="/certificate.png" alt="Certificate" className="w-full h-full object-contain rounded" />

        <span className="absolute top-2 left-1/2 -translate-x-1/2 text-black text-[10px] font-medium text-center px-1 py-0.5 rounded whitespace-nowrap translate-y-[36px]">
          {title}
        </span>
        <span className="absolute top-2 left-1/2 -translate-x-1/2 text-black text-[10px] font-medium text-center px-1 py-0.5 rounded whitespace-nowrap translate-y-[58px]">
          {name}
        </span>
      </div>

      <h3 className="text-lg font-bold text-center whitespace-normal break-words line-clamp-2 h-12 overflow-hidden">
        {title}
      </h3>

      <p className="text-xs text-gray-600 mb-3 whitespace-normal break-words text-center">
        Received: <span className="text-[#C01A18] font-medium">{date}</span>
      </p>

      <button
        className="self-center mt-auto mb-1 bg-black text-white py-1.5 px-5 rounded-lg hover:bg-gray-800 transition-colors duration-200 ease-in-out text-sm"
        onClick={handleDownload}
      >
        Download
      </button>
    </div>
  );
}