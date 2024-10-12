"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ExternalLink, X } from "lucide-react";
import { createPortal } from "react-dom";

export const EnhancedImage = ({ src, alt, href, width, height, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const toggleModal = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleKeyDown, handleClickOutside]);

  const imageComponent = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`rounded-lg object-contain cursor-pointer mx-auto ${className}`}
      onClick={toggleModal}
    />
  );

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-4 rounded-lg max-w-4xl max-h-[90vh] overflow-auto relative"
      >
        <button
          onClick={toggleModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        <Image
          src={src}
          alt={alt ?? src}
          width={width}
          height={height}
          className="object-contain mx-auto"
        />
        {alt && <p className="mt-2 text-center text-sm">{alt}</p>}
      </div>
    </div>
  );

  return (
    <figure className="my-4">
      {imageComponent}
      {isOpen && createPortal(modalContent, document.body)}
      <div className="flex flex-row gap-2 items-center justify-center">
        {alt && (
          <figcaption className="my-0 text-center text-xs">{alt}</figcaption>
        )}
        {href && (
          <a
            href={href}
            className="h-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={16} />
          </a>
        )}
      </div>
    </figure>
  );
};
